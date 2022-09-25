from datetime import datetime
from pydantic import BaseModel, EmailStr, validator, constr


class User(BaseModel):
    id: str | None = None
    username: str
    email: str#EmailStr
    created_at: datetime
    hash_password: str

class UserResp(BaseModel):
    id: str | None = None
    username: str
    email: str#EmailStr
    created_at: datetime

class UserIn(BaseModel):
    username: str
    email: str #EmailStr
    password: constr(max_length=10)
    password_repeat: str

    # @validator('password_repeat')
    # def password_match(cls, v, values, config=None, field=None):
    #     if 'password' in values and v != values['password']:
    #         raise ValueError('password not match')

    #     return v