"""
Model loader for sentence-transformers.
Loads and caches the embedding model to avoid reloading on every request.
"""
from sentence_transformers import SentenceTransformer
from typing import Optional

# Global model cache
_model: Optional[SentenceTransformer] = None
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def get_model() -> SentenceTransformer:
    """
    Get the cached sentence-transformer model.
    Loads the model on first call and reuses it for subsequent calls.
    
    Returns:
        SentenceTransformer: The loaded embedding model
    """
    global _model
    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)
    return _model


def get_model_name() -> str:
    """
    Get the name of the model being used.
    
    Returns:
        str: Model name
    """
    return MODEL_NAME
