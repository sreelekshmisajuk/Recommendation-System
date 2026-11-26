"""
RecAI: Gemini Recommender System Runner
Connects Google Gemini API to the RecAI framework using the OpenAI-compatible endpoint.
"""

import os
import sys
import argparse
import yaml
from openai import OpenAI

def load_gemini_config(config_path="07_Evaluation_Suite/openai_api_config.yaml"):
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")
    api_base = os.environ.get("GEMINI_API_BASE") or "https://generativelanguage.googleapis.com/v1beta/openai/"
    
    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                cfg = yaml.safe_load(f) or {}
                if not api_key and cfg.get("API_KEY") and cfg.get("API_KEY") != "YOUR_GEMINI_API_KEY":
                    api_key = cfg.get("API_KEY")
                if cfg.get("API_BASE"):
                    api_base = cfg.get("API_BASE")
        except Exception as e:
            print(f"[Warning] Could not parse config file: {e}")
            
    return api_key, api_base

def test_gemini_connection(client, model_name):
    print(f"\n[*] Testing connection to Google Gemini API using model '{model_name}'...")
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "You are an AI assistant for recommender systems."},
                {"role": "user", "content": "Respond with: 'Gemini API is successfully connected to RecAI!'"}
            ],
            max_tokens=50
        )
        msg = response.choices[0].message.content.strip()
        print(f"[+] Success: {msg}\n")
        return True
    except Exception as e:
        print(f"[-] Connection Error: {e}")
        return False

def run_recommendation_demo(client, model_name):
    print("=" * 65)
    print("DEMO 1: Conversational Recommender (InteRecAgent Style)")
    print("=" * 65)
    user_query = "I loved playing The Witcher 3 and Skyrim. What open-world RPG should I play next with rich story and exploration?"
    print(f"User: {user_query}\n")
    
    system_prompt = (
        "You are an expert AI Recommender System. Analyze the user's preference history, "
        "retrieve the most relevant top 3 items, provide a ranked list with concise reasons for each recommendation, "
        "and suggest follow-up questions to refine their taste."
    )
    
    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_query}
        ],
        temperature=0.3,
        max_tokens=600
    )
    print(f"RecAI (Gemini):\n{response.choices[0].message.content}\n")

    print("=" * 65)
    print("DEMO 2: Model Explainer (RecExplainer Style)")
    print("=" * 65)
    explain_query = (
        "Candidate Item: 'Elden Ring'\n"
        "User History: ['The Witcher 3: Wild Hunt', 'The Elder Scrolls V: Skyrim', 'Dark Souls III']\n"
        "Explain why this user was recommended 'Elden Ring' based on collaborative filtering and latent interest patterns."
    )
    print(f"Input:\n{explain_query}\n")
    
    explain_sys_prompt = (
        "You are RecExplainer, a surrogate LLM aligned to explain black-box recommendation models. "
        "Formulate a clear, interpretable explanation justifying the recommendation in terms of behavioral affinity and gameplay mechanics."
    )
    
    response2 = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": explain_sys_prompt},
            {"role": "user", "content": explain_query}
        ],
        temperature=0.2,
        max_tokens=400
    )
    print(f"RecExplainer:\n{response2.choices[0].message.content}\n")

def main():
    parser = argparse.ArgumentParser(description="Run RecAI with Google Gemini API")
    parser.add_argument("--api_key", type=str, default="", help="Your Google Gemini API key")
    parser.add_argument("--model", type=str, default="gemini-1.5-flash", help="Gemini model name (e.g. gemini-1.5-flash, gemini-2.0-flash, gemini-1.5-pro)")
    parser.add_argument("--base_url", type=str, default="https://generativelanguage.googleapis.com/v1beta/openai/", help="Gemini OpenAI-compatible endpoint")
    args = parser.parse_args()

    api_key = args.api_key
    if not api_key:
        api_key, api_base = load_gemini_config()
    else:
        api_base = args.base_url

    if not api_key or api_key == "YOUR_GEMINI_API_KEY":
        print("\n" + "=" * 65)
        print("[!] GEMINI API KEY REQUIRED")
        print("=" * 65)
        print("Please provide your Google Gemini API key using one of the following methods:")
        print("  1. Pass via CLI argument:")
        print(f"     python run_gemini_recommender.py --api_key AIzaSy...")
        print("\n  2. Set as an environment variable in PowerShell:")
        print("     $env:GEMINI_API_KEY=\"AIzaSy...\"")
        print("     python run_gemini_recommender.py")
        print("\n  3. Put it in '07_Evaluation_Suite/openai_api_config.yaml':")
        print("     API_KEY: \"AIzaSy...\"")
        print("=" * 65 + "\n")
        sys.exit(1)

    client = OpenAI(api_key=api_key, base_url=api_base)
    if test_gemini_connection(client, args.model):
        run_recommendation_demo(client, args.model)
        print("=" * 65)
        print("[+] RecAI is operational with Google Gemini API!")
        print("=" * 65)

if __name__ == "__main__":
    main()
