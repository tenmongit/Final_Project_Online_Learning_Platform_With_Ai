import os
from huggingface_hub import InferenceClient

def generate_ai_response(message):
    """
    Uses huggingface_hub's InferenceClient to call DeepSeek-V3-0324 via the Novita provider.
    Requires the environment variable HUGGINGFACE_API_KEY to be set.
    """
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    if not api_key:
        return "Error: HuggingFace API key not set in environment variable HUGGINGFACE_API_KEY."
    try:
        client = InferenceClient(provider="novita", api_key=api_key)
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-V3-0324",
            messages=[{"role": "user", "content": message}]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"
