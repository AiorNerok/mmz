from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware

from db.base import database
from endpoints import users, auth, posts, logs

app = FastAPI()

app.include_router(users.router, prefix='/users', tags=['users'])
app.include_router(auth.router, prefix='/auth', tags=['auth'])
app.include_router(posts.router, prefix='/posts', tags=['posts'])
app.include_router(logs.router, prefix='/logs', tags=['logs'])

origins = ['http://localhost:3000', 'http://localhost:8000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event('startup')
async def startup():
    await database.connect()


@app.on_event('shutdown')
async def shutdown():
    await database.disconnect()
