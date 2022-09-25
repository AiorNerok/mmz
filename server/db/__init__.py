from db.base import metadata, engine
from db.posts import posts
from db.users import users
from db.logs import logs

metadata.create_all(bind=engine)