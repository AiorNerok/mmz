from fastapi import APIRouter,Depends

from endpoints.depends import get_logs_repo
from models.logs import Logs
from repositories.logs import LogsRepo


router = APIRouter()

@router.get('/', response_model=list[Logs])
async def get_all_logs(log: LogsRepo=Depends(get_logs_repo)):
    return await log.get_logs()