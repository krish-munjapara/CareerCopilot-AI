from fastapi import APIRouter, HTTPException, status, UploadFile, Depends
from app.schemas.ai import (
    ATSResponse,
    ResumeAnalysisResponse,
    JobAnalysisResponse,
    MatchResponse,
    DashboardResponse
)
from app.ai.engine import ai_engine
from app.services.resume_service import resume_service
from app.services.job_service import job_service
from app.core.jwt import get_current_active_user
from app.models.user import UserInDB

router = APIRouter()


@router.post("/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Upload and analyze a resume PDF.
    
    Args:
        file: Resume PDF file to analyze
        current_user: Authenticated user
    
    Returns:
        Complete resume analysis with extracted information
    
    Raises:
        HTTPException: If file processing fails (400/500)
    """
    try:
        # Save uploaded file
        file_result = await resume_service.save_file(file)
        file_path = file_result["file_path"]
        
        # Analyze resume using AI engine
        resume_data = ai_engine.analyze_resume(file_path)
        
        response = ResumeAnalysisResponse(
            full_text=resume_data["full_text"],
            pages=resume_data["pages"],
            email=resume_data.get("email"),
            phone=resume_data.get("phone"),
            skills=resume_data.get("skills", []),
            education=resume_data.get("education", []),
            experience=resume_data.get("experience", []),
            projects=resume_data.get("projects", [])
        )
        
        # Add file_path to response for subsequent calls
        response_dict = response.model_dump()
        response_dict["file_path"] = file_path
        
        return response_dict
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze resume: {str(e)}"
        )


@router.post("/analyze-job", response_model=JobAnalysisResponse)
async def analyze_job(job_description: dict, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Analyze a job description.
    
    Args:
        job_description: Dictionary with job description text
        current_user: Authenticated user
    
    Returns:
        Complete job analysis with extracted information
    
    Raises:
        HTTPException: If analysis fails (400/500)
    """
    try:
        description = job_description.get("description", "")
        if not description:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Job description is required"
            )
        
        # Analyze job using AI engine
        job_data = ai_engine.analyze_job(description)
        
        return JobAnalysisResponse(
            job_title=job_data["job_title"],
            required_skills=job_data["required_skills"],
            preferred_skills=job_data["preferred_skills"],
            experience_required=job_data["experience_required"],
            education_required=job_data["education_required"],
            keywords=job_data["keywords"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze job description: {str(e)}"
        )


@router.post("/calculate-ats", response_model=ATSResponse)
async def calculate_ats(request: dict, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Calculate ATS compatibility score between resume and job.
    
    Args:
        request: Dictionary with resume_file_path and job_description
        current_user: Authenticated user
    
    Returns:
        ATS scoring results with matched/missing skills and recommendations
    
    Raises:
        HTTPException: If calculation fails (400/500)
    """
    try:
        resume_file_path = request.get("resume_file_path")
        job_description = request.get("job_description")
        
        if not resume_file_path or not job_description:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="resume_file_path and job_description are required"
            )
        
        # Analyze resume
        resume_data = ai_engine.analyze_resume(resume_file_path)
        
        # Calculate ATS score
        ats_result = ai_engine.calculate_ats(resume_data, job_description)
        
        return ATSResponse(
            overall_score=ats_result["overall_score"],
            matched_skills=ats_result["matched_skills"],
            missing_skills=ats_result["missing_skills"],
            matched_keywords=ats_result["matched_keywords"],
            missing_keywords=ats_result["missing_keywords"],
            recommendations=ats_result["recommendations"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to calculate ATS score: {str(e)}"
        )


@router.post("/match", response_model=MatchResponse)
async def match_resume_job(request: dict, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Match resume to job description with detailed analysis.
    
    Args:
        request: Dictionary with resume_file_path and job_data
        current_user: Authenticated user
    
    Returns:
        Match analysis with gaps, strengths, and coverage
    
    Raises:
        HTTPException: If matching fails (400/500)
    """
    try:
        resume_file_path = request.get("resume_file_path")
        job_data = request.get("job_data")
        
        if not resume_file_path or not job_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="resume_file_path and job_data are required"
            )
        
        # Analyze resume
        resume_data = ai_engine.analyze_resume(resume_file_path)
        
        # Match resume to job
        match_result = ai_engine.match_resume_job(resume_data, job_data)
        
        return MatchResponse(
            match_percentage=match_result["match_percentage"],
            skill_gaps=match_result["skill_gaps"],
            strengths=match_result["strengths"],
            coverage=match_result["coverage"],
            recommendations=match_result["recommendations"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to match resume to job: {str(e)}"
        )


@router.post("/dashboard", response_model=DashboardResponse)
async def get_dashboard(request: dict, current_user: UserInDB = Depends(get_current_active_user)):
    """
    Get complete dashboard analysis for resume and job.
    
    Args:
        request: Dictionary with resume_file_path and job_description
        current_user: Authenticated user
    
    Returns:
        Complete dashboard with ATS score, resume analysis, job analysis, and match results
    
    Raises:
        HTTPException: If dashboard generation fails (400/500)
    """
    try:
        resume_file_path = request.get("resume_file_path")
        job_description = request.get("job_description")
        
        if not resume_file_path or not job_description:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="resume_file_path and job_description are required"
            )
        
        # Analyze resume
        resume_data = ai_engine.analyze_resume(resume_file_path)
        
        # Analyze job
        job_data = ai_engine.analyze_job(job_description)
        
        # Calculate ATS score
        ats_result = ai_engine.calculate_ats(resume_data, job_description)
        
        # Match resume to job
        match_result = ai_engine.match_resume_job(resume_data, job_data)
        
        # Generate recommendations
        recommendations = ai_engine.generate_recommendations(resume_data, job_data, ats_result)
        
        # Build response
        return DashboardResponse(
            ats_score=ATSResponse(
                overall_score=ats_result["overall_score"],
                matched_skills=ats_result["matched_skills"],
                missing_skills=ats_result["missing_skills"],
                matched_keywords=ats_result["matched_keywords"],
                missing_keywords=ats_result["missing_keywords"],
                recommendations=ats_result["recommendations"]
            ),
            resume_analysis=ResumeAnalysisResponse(
                full_text=resume_data["full_text"],
                pages=resume_data["pages"],
                email=resume_data.get("email"),
                phone=resume_data.get("phone"),
                skills=resume_data.get("skills", []),
                education=resume_data.get("education", []),
                experience=resume_data.get("experience", []),
                projects=resume_data.get("projects", [])
            ),
            job_analysis=JobAnalysisResponse(
                job_title=job_data["job_title"],
                required_skills=job_data["required_skills"],
                preferred_skills=job_data["preferred_skills"],
                experience_required=job_data["experience_required"],
                education_required=job_data["education_required"],
                keywords=job_data["keywords"]
            ),
            match=MatchResponse(
                match_percentage=match_result["match_percentage"],
                skill_gaps=match_result["skill_gaps"],
                strengths=match_result["strengths"],
                coverage=match_result["coverage"],
                recommendations=match_result["recommendations"]
            )
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate dashboard: {str(e)}"
        )
