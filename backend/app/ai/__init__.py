"""
AI Engine Module for CareerCopilot AI.

This module contains the complete AI pipeline for resume analysis,
job description processing, ATS scoring, and career recommendations.

Pipeline Flow:
    Resume PDF → Resume Parser → Skill Extraction → JD Analysis
    → ATS Score → Resume ↔ JD Matching → Missing Skills → Career Recommendation
"""

from app.ai.engine import AIEngine

__all__ = ["AIEngine"]
