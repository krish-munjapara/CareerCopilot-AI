"""
ML-based analysis API endpoint.
Uses sentence-transformers for semantic similarity and skill extraction.
"""
from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.ai import AnalysisRequest, AnalysisResponse
from app.ml.embedding_service import generate_resume_embedding, generate_job_embedding
from app.ml.similarity_service import calculate_semantic_match
from app.ml.skill_extractor import extract_skills, match_skills, calculate_skill_coverage
from app.ml.ats_engine import generate_ats_analysis
from app.ml.recommendation_engine import generate_recommendations
from app.ml.model_loader import get_model_name
from app.db.mongodb import mongodb
from bson import ObjectId
from datetime import datetime

router = APIRouter()


@router.post("/analyze", response_model=AnalysisResponse, status_code=status.HTTP_200_OK)
async def analyze_resume_job(request: AnalysisRequest):
    """
    Perform ML-based analysis of resume against job description.
    
    Args:
        request: Analysis request with resume text, job description, and parsed resume data
    
    Returns:
        Complete analysis with ATS score, semantic similarity, skill coverage, and recommendations
    
    Raises:
        HTTPException: If analysis fails
    """
    try:
        # Validate inputs
        if not request.resume_text or not request.resume_text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Resume text is required"
            )
        
        if not request.job_description or not request.job_description.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Job description is required"
            )
        
        # Load model (will cache after first call)
        try:
            _ = get_model_name()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to load ML model: {str(e)}"
            )
        
        # Generate embeddings
        try:
            resume_embedding = generate_resume_embedding(request.resume_text)
            job_embedding = generate_job_embedding(request.job_description)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate embeddings: {str(e)}"
            )
        
        # Extract skills
        try:
            resume_skills = extract_skills(request.resume_text)
            job_skills = extract_skills(request.job_description)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to extract skills: {str(e)}"
            )
        
        # Generate ATS analysis
        try:
            ats_result = generate_ats_analysis(
                resume_text=request.resume_text,
                job_text=request.job_description,
                resume_data=request.resume_data,
                resume_embedding=resume_embedding,
                job_embedding=job_embedding,
                resume_skills=resume_skills,
                job_skills=job_skills
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate ATS analysis: {str(e)}"
            )
        
        # Generate recommendations
        try:
            analysis_with_resume_data = {
                **ats_result,
                "resume_data": request.resume_data
            }
            recommendations = generate_recommendations(analysis_with_resume_data)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate recommendations: {str(e)}"
            )
        
        # Build response
        response = AnalysisResponse(
            ats_score=ats_result["ats_score"],
            semantic_score=ats_result["semantic_score"],
            skill_coverage=ats_result["skill_coverage"],
            completeness_score=ats_result["completeness_score"],
            resume_skills=resume_skills,
            job_skills=job_skills,
            matched_skills=ats_result["matched_skills"],
            missing_skills=ats_result["missing_skills"],
            extra_skills=ats_result["extra_skills"],
            recommendations=recommendations,
            model=get_model_name()
        )
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )


@router.post("/save", status_code=status.HTTP_201_CREATED)
async def save_analysis(request: AnalysisRequest, user_id: str = None):
    """
    Save analysis results to MongoDB.
    
    Args:
        request: Analysis request with resume text, job description, and parsed resume data
        user_id: Optional user ID (will be extracted from JWT in production)
    
    Returns:
        Saved analysis document ID
    
    Raises:
        HTTPException: If save fails
    """
    try:
        # Perform analysis
        analysis_response = await analyze_resume_job(request)
        
        # Prepare document for MongoDB
        analysis_doc = {
            "user_id": user_id,
            "resume_text": request.resume_text,
            "job_description": request.job_description,
            "ats_score": analysis_response.ats_score,
            "semantic_score": analysis_response.semantic_score,
            "skill_coverage": analysis_response.skill_coverage,
            "completeness_score": analysis_response.completeness_score,
            "resume_skills": analysis_response.resume_skills,
            "job_skills": analysis_response.job_skills,
            "matched_skills": analysis_response.matched_skills,
            "missing_skills": analysis_response.missing_skills,
            "extra_skills": analysis_response.extra_skills,
            "recommendations": analysis_response.recommendations,
            "model_name": analysis_response.model,
            "created_at": datetime.utcnow()
        }
        
        # Insert into MongoDB
        result = await mongodb.database.analyses.insert_one(analysis_doc)
        
        return {
            "analysis_id": str(result.inserted_id),
            "message": "Analysis saved successfully"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save analysis: {str(e)}"
        )


@router.get("/history/{user_id}", status_code=status.HTTP_200_OK)
async def get_analysis_history(user_id: str):
    """
    Get analysis history for a user.
    
    Args:
        user_id: User ID
    
    Returns:
        List of past analyses
    
    Raises:
        HTTPException: If retrieval fails
    """
    try:
        cursor = mongodb.database.analyses.find(
            {"user_id": user_id}
        ).sort("created_at", -1).limit(10)
        
        analyses = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            analyses.append(doc)
        
        return {"analyses": analyses}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve analysis history: {str(e)}"
        )
