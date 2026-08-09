from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.resume import router as resume_router
from app.api.job import router as job_router
from app.api.dashboard import router as dashboard_router
from app.api.analysis import router as analysis_router
from app.api.settings import router as settings_router
from app.core.config import get_settings
from app.db.mongodb import mongodb

@asynccontextmanager
async def lifespan(app: FastAPI):
    await mongodb.connect()
    yield
    await mongodb.disconnect()

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(resume_router, prefix="/resume", tags=["Resume"])
app.include_router(job_router, prefix="/job", tags=["Job"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(analysis_router, prefix="/analysis", tags=["Analysis"])
app.include_router(settings_router, prefix="/settings", tags=["Settings"])
