from fastapi import APIRouter, Depends, HTTPException, status

from models.users import User, UserIn, UserResp
from repositories.users import UserRepo
from endpoints.depends import get_current_user, get_logs_repo, get_user_repo
from repositories.logs import LogsRepo

router = APIRouter()


@router.get('/', response_model=list[UserResp])
async def read_users(users: UserRepo = Depends(get_user_repo),
                     logs: LogsRepo = Depends(get_logs_repo),
                     limit: int = 100,
                     skip: int = 0,
                     current_user: User = Depends(get_current_user)):

    log_v = {
        'description': 'get all users',
        'methods': 'GET',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await users.get_all(limit=limit, skip=skip)


@router.post('/', response_model=UserResp)
async def create_user(user: UserIn, users: UserRepo = Depends(get_user_repo)):

    user_ = await users.get_by_email(user.email)
    if user_ != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='email already in use')

    user_ = await users.get_by_username(user.username)
    if user_ != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='username already in use')

    return await users.create(user)


@router.get('/{id}', response_model=UserResp)
async def read_users(id: int,
                     users: UserRepo = Depends(get_user_repo),
                     logs: LogsRepo = Depends(get_logs_repo),
                     current_user: User = Depends(get_current_user)):

    log_v = {
        'description': 'get all users',
        'methods': 'GET',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await users.get_by_id(id)
