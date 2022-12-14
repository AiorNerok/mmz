from databases import Database
from sqlalchemy import create_engine, MetaData

from core.config import DB_URL

database = Database(DB_URL)

metadata = MetaData()

engine = create_engine(DB_URL, connect_args={'check_same_thread': False})
