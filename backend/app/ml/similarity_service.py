"""
Semantic similarity service using cosine similarity.
"""
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import Tuple


def calculate_cosine_similarity(embedding1: np.ndarray, embedding2: np.ndarray) -> float:
    """
    Calculate cosine similarity between two embeddings.
    
    Args:
        embedding1: First embedding vector
        embedding2: Second embedding vector
    
    Returns:
        float: Cosine similarity score between 0 and 1
    """
    # Reshape to 2D arrays for sklearn
    emb1 = embedding1.reshape(1, -1)
    emb2 = embedding2.reshape(1, -1)
    
    similarity = cosine_similarity(emb1, emb2)[0][0]
    return float(similarity)


def calculate_semantic_match(resume_embedding: np.ndarray, job_embedding: np.ndarray) -> Tuple[float, float]:
    """
    Calculate semantic similarity between resume and job description.
    
    Args:
        resume_embedding: Resume text embedding
        job_embedding: Job description embedding
    
    Returns:
        Tuple[float, float]: (similarity_score_0_to_1, similarity_percentage_0_to_100)
    """
    similarity = calculate_cosine_similarity(resume_embedding, job_embedding)
    percentage = similarity * 100
    return similarity, percentage
