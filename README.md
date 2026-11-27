# NexusRec —  AI Recommendation Platform

<p align="center">
  <strong>An Intelligent, Conversational & Explainable Recommendation System Powered by Large Language Models</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI%20%2F%20REST-Python-green" />
  <img src="https://img.shields.io/badge/LLM-Google%20Gemini-8E75B2" />
  <img src="https://img.shields.io/badge/AI-Recommender%20Systems-orange" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## Overview

**NexusRec** is an end-to-end AI-powered recommendation platform that integrates Large Language Models (LLMs), conversational AI agents, dense vector retrieval, generative recommendation, and Explainable AI (XAI) into a unified recommendation ecosystem.

The platform explores the intersection of modern LLM4Rec research and practical recommendation engineering, transforming traditional recommendation systems into intelligent, interactive, and personalized applications.

Unlike conventional recommendation engines that primarily depend on historical interactions and structured user-item data, NexusRec enables users to express their preferences through natural language, receive context-aware recommendations, discover similar items, and understand why particular recommendations are generated.

The platform combines seven research-oriented AI modules with a modern enterprise SaaS interface built using React 19, TypeScript, and Tailwind CSS, supported by a Python REST backend and Google Gemini integration.

### Key Capabilities

- **Conversational Recommendations:** Natural-language interactions through an LLM-powered recommendation agent.
- **Domain Knowledge Integration:** Enhances recommendation quality using domain-specific knowledge and contextual information.
- **Semantic Retrieval:** Embedding-based similarity search for discovering relevant items.
- **Generative Recommendation:** Language-model-based recommendation generation using fine-tuning and reinforcement learning approaches.
- **Unified Recommendation:** Constrained generative decoding to improve item validity.
- **Explainable AI:** Generates natural-language explanations and model attribution insights.
- **Recommendation Evaluation:** Measures recommendation quality using established ranking and diversity metrics.
- **Enterprise Dashboard:** Monitors recommendation activity, service health, and model performance.

---

## System Architecture

NexusRec follows a modular architecture that separates the user interface, backend orchestration, AI services, recommendation models, and data management.

```text
                         NEXUSREC PLATFORM
                                |
             +------------------+------------------+
             |                                     |
       FRONTEND LAYER                        BACKEND LAYER
       React 19 + TypeScript                  Python REST API
       Vite + Tailwind CSS                    Port 8000
             |                                     |
     +-------+--------+                  +---------+---------+
     |                |                  |                   |
  SaaS UI         User Profile       API Controller      Authentication
     |                |                  |
     +-------+--------+                  |
             |                     LLM Orchestration
             |                           |
             |                     Google Gemini
             |                           |
             |                  Conversational Agent
             |                           |
             |             +-------------+-------------+
             |             |             |             |
             |         Retrieval      Ranking       Explanation
             |          Engine        Engine          Engine
             |             |             |             |
             |             +-------------+-------------+
             |                           |
             |                    AI/ML MODULES
             |                           |
             |       +-------------------+------------------+
             |       |                   |                  |
             |   Knowledge            Dense             Generative
             |   Plugin              Retrieval          Recommender
             |       |                   |                  |
             |       +-------------------+------------------+
             |                           |
             |                    Unified Recommender
             |                           |
             |                     Model Explainer
             |                           |
             |                    Evaluation Suite
             |                           |
             +---------------------------+
                                         |
                                  DATA MANAGEMENT
                                         |
                              Catalogs / User Data
                              Interaction History
                              Model Artifacts
                              Evaluation Results
```

### Architecture Layers

| Layer | Responsibility |
|---|---|
| Presentation Layer | User interface, dashboard, chatbot, and personalization |
| API Layer | REST endpoints, authentication, request handling |
| LLM Orchestration | Prompt processing, agent reasoning, and tool execution |
| Recommendation Layer | Retrieval, candidate generation, filtering, and ranking |
| Research Modules | Knowledge augmentation, generative recommendation, and explainability |
| Evaluation Layer | Ranking benchmarks and recommendation quality assessment |
| Data Layer | User profiles, item catalogs, interactions, and model artifacts |

---

## Repository Structure

```text
NexusRec/
│
├── 01_Interactive_Agent/
│   └── InteRecAgent/
│       ├── app.py
│       ├── llm4crs/
│       │   ├── agent.py
│       │   └── tools/
│       └── README.md
│
├── 02_Knowledge_Plugin/
│   ├── DOKE/
│   ├── Knowledge_Extraction/
│   └── evaluate/
│
├── 03_Retrieval_Embedding/
│   ├── src/
│   │   └── model.py
│   ├── preprocess/
│   └── shell/
│
├── 04_Generative_Recommender/
│   ├── sft/
│   ├── rl/
│   └── unirec/
│
├── 05_Unified_Recommender/
│   ├── index/
│   ├── GRPO/
│   └── TitleRewrite/
│
├── 06_Model_Explainer/
│   ├── discriminator/
│   └── src/
│       └── explainer.py
│
├── 07_Evaluation_Suite/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── public/
│   │   │
│   │   ├── pages/
│   │   │   ├── Overview.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── RecommendationChat.tsx
│   │   │   ├── ExploreItems.tsx
│   │   │   ├── SimilarItems.tsx
│   │   │   ├── EvaluationCenter.tsx
│   │   │   ├── Explainability.tsx
│   │   │   └── public/
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── profileService.ts
│   │   │   └── dashboardService.ts
│   │   │
│   │   └── types/
│   │
│   └── package.json
│
├── backend_server.py
├── run_gemini_recommender.py
├── requirements.txt
├── .env.example
└── README.md
```

---

# Research Modules

NexusRec integrates seven research-oriented modules that explore different approaches to combining LLMs with recommendation systems.

## 1. Interactive Agent — InteRecAgent

**Purpose:** Conversational Recommendation System (CRS).

InteRecAgent combines LLM reasoning with traditional recommendation tools to enable interactive and context-aware recommendations.

### How it works

1. Receives a natural-language request.
2. Understands user intent and conversational context.
3. Decomposes the request into recommendation tasks.
4. Selects appropriate retrieval and recommendation tools.
5. Retrieves and filters candidate items.
6. Ranks relevant candidates.
7. Generates a natural-language response with explanations.

### Key capabilities

- Multi-turn conversational recommendations.
- Context-aware dialogue management.
- Tool-based recommendation execution.
- Candidate retrieval and filtering.
- Personalized recommendation responses.

**Core files:** `app.py`, `llm4crs/agent.py`, `llm4crs/tools/`

## 2. Knowledge Plugin — DOKE

**Purpose:** Domain Knowledge Extraction and Augmentation.

The Knowledge Plugin explores how domain-specific knowledge can improve LLM-based recommendation systems without requiring complete model retraining.

### How it works

- Extracts domain-specific information.
- Organizes item attributes and relationships.
- Integrates domain knowledge into LLM prompts.
- Provides contextual information during recommendation generation.
- Helps reduce unsupported recommendations.

### Key capabilities

- Domain knowledge extraction.
- Knowledge graph augmentation.
- Context-aware prompting.
- Item taxonomy and attribute understanding.
- Domain-specific recommendation support.

**Core directories:** `DOKE/`, `Knowledge_Extraction/`, `evaluate/`

## 3. Retrieval Embedding — RecLM-emb

**Purpose:** Dense vector retrieval and semantic search.

RecLM-emb focuses on learning embedding representations for recommendation-oriented retrieval.

Instead of depending exclusively on exact keyword matching, the retrieval system represents queries and items as dense vectors in an embedding space.

### How it works

1. Converts item descriptions and user queries into embeddings.
2. Stores item representations in a retrieval index.
3. Generates an embedding for the user's request.
4. Calculates semantic similarity.
5. Retrieves relevant candidate items.

### Key capabilities

- Semantic item retrieval.
- Dense vector representations.
- Similarity-based candidate generation.
- Embedding-based search.
- Retrieval-oriented model training.

**Core files:** `src/model.py`, `preprocess/`, `shell/`

## 4. Generative Recommender — RecLM-gen

**Purpose:** Generative recommendation using language models.

RecLM-gen explores adapting language models to recommendation tasks through supervised fine-tuning and reinforcement learning.

### How it works

- Prepares recommendation-oriented training data.
- Applies Supervised Fine-Tuning (SFT).
- Explores reinforcement learning approaches.
- Adapts language models to recommendation patterns.
- Generates recommendation outputs based on learned item and user patterns.

### Key capabilities

- Recommendation-specific language model adaptation.
- Supervised Fine-Tuning.
- Reinforcement learning.
- Generative recommendation.
- Sequential recommendation generation.

**Core directories:** `sft/`, `rl/`, `unirec/`

## 5. Unified Recommender — RecLM-uni

**Purpose:** Unified generative recommendation using constrained decoding.

RecLM-uni explores how recommendation generation can be constrained to valid catalog items using prefix-tree and Trie-based decoding.

### How it works

1. Constructs a Trie from valid catalog item identifiers or titles.
2. Uses the Trie to constrain the generation space.
3. Applies constrained decoding during generation.
4. Prevents generation of identifiers outside the indexed catalog.
5. Returns valid recommendation candidates.

The module also explores Generative Relative Policy Optimization (GRPO).

### Key capabilities

- Trie-based constrained decoding.
- Valid item generation.
- Prefix-tree indexing.
- Generative recommendation.
- GRPO-based optimization research.

**Core directories:** `index/`, `GRPO/`, `TitleRewrite/`

## 6. Model Explainer — RecExplainer

**Purpose:** Explainable AI for recommendation systems.

RecExplainer explores the use of LLMs as surrogate explainers to interpret recommendation models and generate understandable explanations.

### How it works

- Uses representations from recommendation models.
- Aligns model information with language-model representations.
- Generates natural-language recommendation explanations.
- Explores feature attribution and model interpretation.

### Key capabilities

- Natural-language explanations.
- Recommendation attribution.
- Surrogate model interpretation.
- Model transparency.
- Explainable recommendation outputs.

**Core directories:** `discriminator/`, `src/explainer.py`

## 7. Evaluation Suite

**Purpose:** Comprehensive evaluation of recommendation quality.

The evaluation suite assesses recommendation models using established information retrieval and ranking metrics.

### Evaluation metrics

| Metric | Description |
|---|---|
| Hit Rate@K | Measures whether relevant items appear in the top K results |
| NDCG@K | Measures ranking quality while considering item relevance and position |
| MRR | Measures the reciprocal rank of the first relevant result |
| Precision@K | Measures the proportion of relevant items among the top K |
| Recall@K | Measures the proportion of relevant items successfully retrieved |
| Catalog Coverage | Measures the proportion of the catalog recommended |
| Diversity | Measures variety among recommended items |

The evaluation suite provides a foundation for comparing recommendation approaches and identifying model limitations.

---

# Enterprise Web Application

NexusRec includes a modern web workspace designed to make advanced recommendation capabilities accessible through an intuitive interface.

### Frontend Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| TypeScript | Static typing |
| Vite | Development and build tooling |
| Tailwind CSS | Responsive styling |
| Lucide React | Icon system |
| Recharts | Data visualization |

### Application Features

## 1. Overview Dashboard

A centralized dashboard for monitoring the recommendation platform.

Features:
- Real-time backend telemetry.
- AI service health monitoring.
- Recommendation request statistics.
- Active user statistics, where available.
- Item retrieval statistics.
- Average response latency.
- Recommendation success rate.
- Recommendation activity charts.
- Recent system events.

Dashboard metrics are obtained from backend telemetry. Missing data is represented through appropriate empty or unavailable states rather than fabricated values.

## 2. Unified Profile & Personalization Hub

A centralized profile management interface with four sections.

**Personal Information**
- Profile photo.
- Full name.
- Username.
- Email address.
- Account information.

**Recommendation Preferences**
- Accuracy or Diversity recommendation mode.
- Concise or Detailed response style.
- Preferred domains and categories.
- Favourite genres.
- Custom interests.

**Saved Items**
- View bookmarked recommendations.
- Search saved items.
- Remove saved items.

**Interaction History**
- Previously viewed items.
- Saved recommendations.
- User interaction records.
- History management.

Profile information and preferences are retrieved from authenticated backend endpoints.

## 3. AI Recommendation Chat

An interactive conversational recommendation interface powered by Google Gemini and the recommendation agent.

Features:
- Natural-language recommendation requests.
- Multi-turn conversations.
- Context-aware responses.
- Accuracy and Diversity recommendation modes.
- Concise and Detailed response styles.
- Recommendation explanations.
- Follow-up questions.

## 4. Explore Items

A unified item discovery interface supporting available recommendation domains.

Features:
- Catalog browsing.
- Keyword search.
- Category filtering.
- Price filtering where applicable.
- Item details.
- Sorting.
- Saved recommendations.

## 5. Similar Items

An interface for discovering semantically similar items.

Features:
- Item selection.
- Similarity-based retrieval.
- Related item discovery.
- Similarity ranking.
- Item comparison.

## 6. Evaluation Center

A dedicated interface for recommendation model evaluation.

Features:
- Evaluation dataset selection.
- Recommendation model selection.
- Benchmark execution.
- Ranking metrics.
- Model comparison.
- Evaluation results.

## 7. Explainability

An interface for understanding recommendation outputs.

Features:
- Recommendation explanations.
- Feature attribution.
- Relevant user preferences.
- Model interpretation.
- Explainability visualizations.

---

# Backend Architecture

The backend is implemented in Python and provides REST APIs for frontend communication, authentication, recommendation orchestration, and system telemetry.

**Main entry point:** `backend_server.py`

**Default port:** `8000`

### Backend Responsibilities

- User authentication and profile management.
- Google Gemini API integration.
- Conversational recommendation processing.
- Agent orchestration.
- Recommendation tool execution.
- Item retrieval and filtering.
- Recommendation explanations.
- Saved item management.
- Dashboard telemetry.
- Service health monitoring.

## API Documentation

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | Checks backend and AI service health |
| `/api/dashboard/summary` | GET | Retrieves dashboard telemetry |
| `/api/auth/register` | POST | Registers a new user |
| `/api/auth/login` | POST | Authenticates a user |
| `/api/users/me` | GET | Retrieves authenticated profile |
| `/api/users/me` | PUT | Updates authenticated profile |
| `/api/users/me/preferences` | GET | Retrieves user preferences |
| `/api/users/me/preferences` | PUT | Updates user preferences |
| `/api/chat` | POST | Processes conversational recommendation requests |
| `/api/explain` | POST | Generates recommendation explanations |
| `/api/items` | GET | Retrieves catalog items |
| `/api/items/save` | POST | Saves or removes bookmarked items |

Authenticated endpoints use Bearer token authentication where configured.

> These endpoints describe the intended backend interface. Their availability and exact request/response schemas should match the implemented backend.

---

# Technology Stack

### Artificial Intelligence & Machine Learning

- Python
- PyTorch
- Large Language Models
- Google Gemini API
- Natural Language Processing
- Conversational AI Agents
- Dense Vector Retrieval
- Embedding Models
- Collaborative Filtering
- Generative Recommendation
- Supervised Fine-Tuning
- Reinforcement Learning
- Explainable AI

### Backend

- Python
- REST API
- Asynchronous model serving
- Authentication and session management
- Database integration
- Recommendation orchestration

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React

### Research & Evaluation

- Hit Rate@K
- NDCG@K
- Precision@K
- Recall@K
- Mean Reciprocal Rank
- Catalog Coverage
- Recommendation Diversity

---

# Installation & Setup

## Prerequisites

Ensure the following are installed:

- Python 3.10+
- Node.js 18+
- npm
- Git
- Google Gemini API key

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd NexusRec
```

## 2. Backend Setup

Create and activate a virtual environment.

**Windows PowerShell**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit API keys, passwords, authentication tokens, or other secrets to GitHub.

## 4. Start the Backend Server

```bash
python backend_server.py
```

The backend should be available at:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

Dashboard telemetry:

```text
http://127.0.0.1:8000/api/dashboard/summary
```

## 5. Frontend Setup

Open a separate terminal.

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should be available at:

```text
http://127.0.0.1:5173
```

---

# Supported Recommendation Domains

NexusRec is designed to support multiple item domains through its recommendation architecture.

| Domain | Example recommendation use cases |
|---|---|
| Video Games | Genre preferences, game discovery, similar games |
| Consumer Electronics | Smartphones, headphones, monitors, peripherals |
| SaaS & Productivity | Developer tools, cloud services, productivity platforms |
| Movies & Media | Movie discovery, genre preferences, similar content |

Actual catalog availability depends on the datasets and domain integrations configured in the repository.

---

# Security & Data Integrity

NexusRec follows a backend-driven approach to user data and dashboard information.

- Authenticated profile access.
- Password hashing.
- Bearer token authentication.
- Environment-based secret management.
- Backend-authoritative telemetry.
- User-specific preference storage.
- Separation of user data and application data.
- Clear loading, error, and empty states.
- No fabricated production analytics.

---

# Project Goals

The primary objective of NexusRec is to explore how modern language models can enhance traditional recommendation systems through:

1. Conversational interaction.
2. Domain-specific knowledge integration.
3. Semantic item retrieval.
4. Generative recommendation.
5. Constrained recommendation generation.
6. Explainable recommendation outputs.
7. Comprehensive model evaluation.

By bringing these approaches together, NexusRec aims to provide a more intelligent, transparent, flexible, and user-centric recommendation experience.

---

# Future Enhancements

Potential future development directions include:

- Multimodal recommendation using text and image embeddings.
- Advanced user preference modeling.
- Improved long-term conversational memory.
- Real-time recommendation personalization.
- Distributed recommendation model serving.
- Online recommendation evaluation.
- Reinforcement learning from user feedback.
- Production deployment with scalable infrastructure.

---

# License

This project is distributed under the MIT License, subject to the licenses and attribution requirements of its individual research components, dependencies, datasets, and third-party implementations.

---

<p align="center">
  <strong>NexusRec</strong>
  <br/>
  Intelligent Recommendations. Conversational Experiences. Explainable AI.
</p>
