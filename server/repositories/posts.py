from datetime import datetime
from db.posts import posts
from models.post import Post, PostIn
from repositories.base import BaseRepository


class PostRepo(BaseRepository):

    async def create(self, user_id: int, p: PostIn) -> Post:
        post = Post(id=0,
                    title=p.title,
                    description=p.description,
                    created_at=datetime.now(),
                    user_id=user_id)

        values = {**post.dict()}
        values.pop('id', None)

        query = posts.insert().values(**values)
        post.id = await self.database.execute(query=query)

        return post

    async def update(self, id: int, user_id: int, p: PostIn) -> Post:

        post = Post(id=id,
                    title=p.title,
                    description=p.description,
                    created_at=datetime.now(),
                    user_id=user_id)

        values = {**post.dict()}
        values.pop('id', None)
        values.pop('created_at', None)

        query = posts.update().where(posts.c.id == id).values(**values)
        await self.database.execute(query=query)
        return post

    async def get_all(self,
                      limit: int = 100,
                      skip: int = 0) -> list[Post] | None:
        query = posts.select().limit(limit).offset(skip)

        return await self.database.fetch_all(query)

    async def get_all_filter(self, filter) -> list[Post] | None:
        query = posts.select().filter(posts.c.title.contains(filter))
        #select().where(posts.c.title == filter)

        return await self.database.fetch_all(query)

    async def get_post_filtered(self, filter_title: str) -> list[Post] | None:
        query = posts.select().where(posts.c.title == filter_title)

        return await self.database.fetch_all(query)

    async def get_all_by_user_id(self, id: int) -> list[Post] | None:

        query = posts.select().where(posts.c.user_id == id)

        return await self.database.fetch_all(query)

    async def delete(self, id: int):
        query = posts.delete().where(posts.c.id == id)
        return await self.database.execute(query=query)

    async def get_by_id(self, id: int) -> Post:
        query = posts.select().where(posts.c.id == id)
        post = await self.database.fetch_one(query)
        if post is None: return None
        return Post.parse_obj(post)