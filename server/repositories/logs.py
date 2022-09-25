from datetime import datetime
from db.logs import logs
from models.logs import Logs
from repositories.base import BaseRepository


class LogsRepo(BaseRepository):

    async def create(self, v: Logs) -> Logs:
        log_ = Logs(id=0,
                    user_id=v['user_id'],
                    methods=v['methods'],
                    username=v['username'],
                    description=v['description'],
                    time=datetime.now())

        values = {**log_.dict()}
        values.pop('id', None)

        query = logs.insert().values(**values)
        log_.id = await self.database.execute(query=query)

        return log_

    async def get_logs(self, limit: int = 100, skip: int = 0) -> list[Logs]:
        query = logs.select().limit(limit).offset(skip)
        return await self.database.fetch_all(query)