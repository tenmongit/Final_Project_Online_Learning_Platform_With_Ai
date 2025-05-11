import os
from huggingface_hub import InferenceClient

def explain(prompt):
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    if not api_key:
        return "[AI error: HuggingFace API key not set]"
    client = InferenceClient(token=api_key, provider="novita")
    try:
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-V3-0324",
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"[AI error: {e}]"

def chat(message):
    """Stub for future AI chat logic."""
    return "Chat is not yet implemented."
