from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import get_settings

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

    async def connect(self):
        settings = get_settings()
        self.client = AsyncIOMotorClient(settings.MONGODB_URI)
        self.database = self.client[settings.DATABASE_NAME]

    async def disconnect(self):
        if self.client:
            self.client.close()

mongodb = MongoDB()
