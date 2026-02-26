from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str

@app.post("/detect")
def detect_fake_news(data: Query):
    query = data.query

    # Step 1: Tavily web search
    tavily_url = "https://api.tavily.com/search"
    tavily_payload = {
        "api_key": TAVILY_API_KEY,
        "query": query,
        "search_depth": "advanced",
        "include_answer": True,
        "max_results": 5
    }

    tavily_res = requests.post(tavily_url, json=tavily_payload)
    tavily_data = tavily_res.json()

    # Step 2: Extract context
    context = "\n\n".join([r["content"] for r in tavily_data.get("results", [])])

    # Step 3: Ask Groq to determine truth
    prompt = f"""
Determine whether the following claim is true or fake based on the provided evidence.No explanation.

Claim: "{query}"

Evidence:
{context}

Respond with exactly one word: either "True" or "Fake News".
"""


    client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

    response = client.chat.completions.create(
        # model="deepseek-r1-distill-llama-70b",
        model="compound-beta",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    result = response.choices[0].message.content.strip()

    return {
        "claim": query,
        "result": result,
        "sources": [{"title": r["title"], "url": r["url"]} for r in tavily_data.get("results", [])]
    }
