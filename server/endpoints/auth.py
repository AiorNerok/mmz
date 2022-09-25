from fastapi import APIRouter, Depends, HTTPException, status, Response

from models.token import Token, Login
from repositories.users import UserRepo
from endpoints.depends import get_user_repo
from core.security import Hash, Token as TokenSecurity

router = APIRouter()


@router.post('/', response_model=Token)
async def login(login: Login, response: Response, users: UserRepo = Depends(get_user_repo)):
    user = await users.get_by_email(login.email)
    if user is None or not Hash.verify(login.password, user.hash_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='incorrect email or password')

    token = Token(access_token=TokenSecurity.create_token({'sub': user.email}),
                  token_type='Bearer')

    response.set_cookie(key='token', value=token.access_token)

    return token
