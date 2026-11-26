"""
RecAI Enterprise Backend Server
Connects the React frontend directly with Google Gemini LLM and RecAI algorithms.
Uses Python's standard library http.server (no external web framework installation needed).
"""

import os
import sys
import json
import time
import yaml
from http.server import HTTPServer, BaseHTTPRequestHandler
from openai import OpenAI

# 1. Configuration & Credentials
def load_config():
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")
    api_base = os.environ.get("GEMINI_API_BASE") or "https://generativelanguage.googleapis.com/v1beta/openai/"
    config_path = os.path.join(os.path.dirname(__file__), "07_Evaluation_Suite", "openai_api_config.yaml")

    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                cfg = yaml.safe_load(f) or {}
                if not api_key and cfg.get("API_KEY") and cfg.get("API_KEY") != "YOUR_GEMINI_API_KEY":
                    api_key = cfg.get("API_KEY")
                if cfg.get("API_BASE"):
                    api_base = cfg.get("API_BASE")
        except Exception as e:
            print(f"[Warning] Error reading config: {e}")

    return api_key, api_base

API_KEY, API_BASE = load_config()
client = None
if API_KEY:
    try:
        client = OpenAI(api_key=API_KEY, base_url=API_BASE)
        print(f"[*] OpenAI client initialized with Gemini endpoint: {API_BASE}")
    except Exception as e:
        print(f"[!] Error initializing OpenAI client: {e}")
else:
    print("[!] Warning: GEMINI_API_KEY not found. LLM calls will use local fallback.")

def call_gemini(prompt: str, system_prompt: str, preferred_model="gemini-3.1-flash-lite", temperature=0.3, max_tokens=600):
    if not client:
        raise ValueError("Gemini API client is not configured with an API key.")
    
    fallback_models = [preferred_model, "gemini-3.1-flash-lite", "gemini-3.5-flash-lite", "gemini-3.8-flash"]
    seen = set()
    models = [m for m in fallback_models if not (m in seen or seen.add(m))]

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]

    last_err = None
    for m in models:
        try:
            res = client.chat.completions.create(
                model=m,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens
            )
            return res.choices[0].message.content, m
        except Exception as e:
            last_err = e
            continue
    raise last_err

# 2. HTTP Request Handler with CORS
class RecAIRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == "/health" or self.path == "/api/health":
            self._set_headers(200)
            status_data = {
                "status": "online",
                "backend": "RecAI Python Engine",
                "llmConnected": bool(client),
                "model": "gemini-3.1-flash-lite",
                "version": "2.4.0"
            }
            self.wfile.write(json.dumps(status_data).encode("utf-8"))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            payload = json.loads(post_data.decode("utf-8")) if post_data else {}
        except Exception:
            payload = {}

        if self.path in ["/chat", "/api/chat"]:
            self.handle_chat(payload)
        elif self.path in ["/explain", "/api/explain"]:
            self.handle_explain(payload)
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

    def handle_chat(self, payload):
        start_time = time.time()
        user_message = payload.get("message", "")
        mode = payload.get("mode", "accuracy") # 'accuracy' or 'diversity'
        style = payload.get("style", "detailed") # 'concise' or 'detailed'

        system_prompt = (
            f"You are RecAI, an intelligent conversational recommendation assistant. "
            f"Mode: {mode.upper()} (balance precision and domain variety accordingly). "
            f"Style: {style.upper()} ({'be succinct and focused' if style == 'concise' else 'give rich, informative insights'}). "
            f"Recommend top items, provide concrete reasoning for each, and provide 2-3 follow-up prompt suggestions."
        )

        try:
            if client:
                llm_text, model_used = call_gemini(user_message, system_prompt, preferred_model="gemini-3.1-flash-lite")
            else:
                llm_text = f"Simulated RecAI Engine: Recommended choices for '{user_message}' with {mode} mode active."
                model_used = "local-heuristic"

            latency_ms = int((time.time() - start_time) * 1000)

            response = {
                "success": True,
                "data": {
                    "text": llm_text,
                    "modelUsed": model_used,
                    "followUpQuestions": [
                        "Would you like recommendations within a specific budget?",
                        "Show me more items from this specific genre",
                        "Find alternatives with different mechanics"
                    ]
                },
                "latencyMs": latency_ms
            }
            self._set_headers(200)
            self.wfile.write(json.dumps(response).encode("utf-8"))
        except Exception as e:
            print(f"[!] Error handling chat: {e}")
            self._set_headers(500)
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))

    def handle_explain(self, payload):
        start_time = time.time()
        item_title = payload.get("itemTitle", "Unknown Item")
        user_history = payload.get("history", ["The Witcher 3", "Skyrim", "Dark Souls III"])

        system_prompt = (
            "You are RecExplainer, a surrogate explainability engine for recommender systems. "
            "Explain clearly why the given item was recommended based on user history and latent attributes."
        )
        prompt = f"Candidate Item: '{item_title}'\nUser History: {user_history}\nProvide explanation."

        try:
            if client:
                explanation, model_used = call_gemini(prompt, system_prompt, preferred_model="gemini-3.1-flash-lite")
            else:
                explanation = f"Recommended based on strong behavioral overlap with your history."
                model_used = "local-surrogate"

            latency_ms = int((time.time() - start_time) * 1000)
            self._set_headers(200)
            self.wfile.write(json.dumps({
                "success": True,
                "data": {
                    "explanation": explanation,
                    "modelUsed": model_used
                },
                "latencyMs": latency_ms
            }).encode("utf-8"))
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))

def run_server(port=8000):
    server_address = ("127.0.0.1", port)
    httpd = HTTPServer(server_address, RecAIRequestHandler)
    print(f"\n=======================================================")
    print(f"🚀 RecAI Backend Server Running on http://127.0.0.1:{port}")
    print(f"[*] Health Check: http://127.0.0.1:{port}/health")
    print(f"[*] Gemini LLM Status: {'ONLINE' if client else 'OFFLINE (No key)'}")
    print(f"=======================================================\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping RecAI Backend Server...")
        httpd.server_close()

if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run_server(port)
