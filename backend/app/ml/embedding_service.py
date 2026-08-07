"""
Embedding service for generating semantic embeddings using sentence-transformers.
"""
import numpy as np
from typing import List, Union
from .model_loader import get_model


def generate_embedding(text: Union[str, List[str]]) -> np.ndarray:
    """
    Generate semantic embedding for text or list of texts.
    
    Args:
        text: Single text string or list of text strings
    
    Returns:
        np.ndarray: Embedding vector(s) with shape (n_texts, embedding_dim)
    """
    model = get_model()
    return model.encode(text, convert_to_numpy=True)


def generate_resume_embedding(resume_text: str) -> np.ndarray:
    """
    Generate embedding for resume text.
    
    Args:
        resume_text: Full resume text
    
    Returns:
        np.ndarray: Embedding vector
    """
    return generate_embedding(resume_text)


def generate_job_embedding(job_description: str) -> np.ndarray:
    """
    Generate embedding for job description.
    
    Args:
        job_description: Full job description text
    
    Returns:
        np.ndarray: Embedding vector
    """
    return generate_embedding(job_description)
