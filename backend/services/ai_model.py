from transformers import pipeline

_summarizer = None

def explain(text):
    global _summarizer
    if _summarizer is None:
        _summarizer = pipeline("summarization", model="t5-small")
    # HuggingFace pipeline expects a string, returns a list of dicts
    result = _summarizer(text, max_length=60, min_length=10, do_sample=False)
    return result[0]['summary_text']

def chat(message):
    """Stub for future AI chat logic."""
    return "Chat is not yet implemented."
