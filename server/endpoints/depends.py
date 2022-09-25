from fastapi import Depends, HTTPException, status
from core.security import JWTBearer, Token

from models.users import User
from repositories.posts import PostRepo
from repositories.users import UserRepo
from db.base import database
from repositories.logs import LogsRepo


def get_user_repo() -> UserRepo:
    return UserRepo(database)


def get_post_repo() -> PostRepo:
    return PostRepo(database)


def get_logs_repo() -> LogsRepo:
    return LogsRepo(database)


async def get_current_user(users: UserRepo = Depends(get_user_repo),
                           token: str = Depends(JWTBearer())) -> User:
    exp = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                        detail='Credantial is not valid')

    payload = Token.decode_token(token)
    if payload is None: raise exp

    email: str = payload.get('sub')
    if email is None: raise exp

    user = await users.get_by_email(email=email)
    if user is None: raise exp

    return user
