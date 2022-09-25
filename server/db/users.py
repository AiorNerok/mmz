from sqlalchemy import Table, Column, Integer, String, DateTime
from db.base import metadata
import datetime

users = Table(
    'users',
    metadata,
    Column('id', Integer, primary_key=True, autoincrement=True, unique=True),
    Column('email', String, unique=True),
    Column('username', String, unique=True),
    Column('hash_password', String),
    Column('created_at', DateTime, default=datetime.datetime.now()),
)
