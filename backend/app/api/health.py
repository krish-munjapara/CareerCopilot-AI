from fastapi import APIRouter
from app.db.mongodb import mongodb

router = APIRouter()

@router.get("/health")
def health_check():
    try:
        if mongodb.client is not None:
            return {
                "status": "healthy",
                "database": "connected"
            }
        else:
            return {
                "status": "degraded",
                "database": "disconnected"
            }
    except Exception:
        return {
            "status": "degraded",
            "database": "disconnected"
        }
