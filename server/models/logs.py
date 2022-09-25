from datetime import datetime
from pydantic import BaseModel

class Logs(BaseModel):
    id:int
    user_id:int
    methods:str
    username: str
    description:str
    time:datetime
    
