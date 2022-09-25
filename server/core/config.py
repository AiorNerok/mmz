from starlette.config import Config

config = Config('.env')

DB_URL = config('ENV_DB_URL', cast=str, default='')
ACCESS_TOKEN_EXPIRE_MINUTES = 60
ALGORITHM = 'HS256'
SECRET_KEY = config(
    'ENV_SECRET_KEY',
    cast=str,
    default=
    'def006e735ca830e0b442c3fd49a2d30ab00aad9f491c5ebdeaa0707b6a4f3394a7e84f00992425233d33fe8d5773517bf0ee44744affd9c91e354e7da5020ca'
)
