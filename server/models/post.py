from datetime import datetime
from pydantic import BaseModel

class BasePost(BaseModel):
    title: str
    description: str
    
class Post(BasePost):
    id: int
    user_id: int
    created_at: datetime

class PostResp(BasePost):
    created_at: datetime
    username: str

class PostIn(BasePost):
    pass