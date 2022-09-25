from datetime import datetime, timedelta
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import jwt, JWTError

from core.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY

pwd_ctx = CryptContext(schemes=['bcrypt'], deprecated='auto')


class Hash:

    @staticmethod
    def bcrypt(password: str) -> str:
        return pwd_ctx.hash(password)

    @staticmethod
    def verify(password: str, hash: str) -> bool:
        return pwd_ctx.verify(password, hash)


class Token:

    @staticmethod
    def create_token(d: dict) -> str:
        to_encode = d.copy()
        to_encode.update({
            'exp':
            datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        })
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    @staticmethod
    def decode_token(token: str):

        try:
            encoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError:
            return None

        return encoded_jwt


class JWTBearer(HTTPBearer):

    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):

        exp = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail='invalid auth token')

        credentials: HTTPAuthorizationCredentials = await super(
            JWTBearer, self).__call__(request)

        if credentials:
            token = Token.decode_token(credentials.credentials)
            print(token)
            if token is None:
                raise exp
            return credentials.credentials
        else:
            raise exp