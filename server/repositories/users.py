from datetime import datetime
from db.users import users
from models.users import UserIn, User
from repositories.base import BaseRepository
from core.security import Hash


class UserRepo(BaseRepository):

    async def get_all(self,
                      limit: int = 100,
                      skip: int = 0) -> list[User] | None:
        query = users.select().limit(limit).offset(skip)
        return await self.database.fetch_all(query)

    async def get_by_id(self, id: int) -> User:
        query = users.select().where(users.c.id == id)
        user = await self.database.fetch_one(query)

        if user is None:
            return None

        return User.parse_obj(user)

    async def create(self, u: UserIn) -> User:
        user = User(username=u.username,
                    email=u.email,
                    hash_password=Hash.bcrypt(u.password),
                    created_at=datetime.now())

        values = {**user.dict()}
        values.pop('id')

        query = users.insert().values(**values)
        user.id = await self.database.execute(query)

        return user

    async def update(self, id: int, u: UserIn) -> User:
        user = User(id=id,
                    username=u.username,
                    email=u.email,
                    hash_password=Hash.bcrypt(u.password),
                    created_at=datetime.now())

        values = {**user.dict()}
        values.pop('id')
        values.pop('created_at')

        query = users.update().where(users.c.id == id).values(**values)
        await self.database.execute(query)
        return user

    async def get_by_email(self, email: str) -> User:
        query = users.select().where(users.c.email == email)
        user = await self.database.fetch_one(query)

        if user is None:
            return None

        return User.parse_obj(user)

    async def get_by_username(self, username: str) -> User:
        query = users.select().where(users.c.username == username)
        user = await self.database.fetch_one(query)

        if user is None:
            return None

        return User.parse_obj(user)