from sqlalchemy import Table, Column, Integer, String, DateTime, ForeignKey
from db.base import metadata
import datetime

posts = Table(
    'posts', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True, unique=True),
    Column('title', String, unique=True),
    Column('description', String),
    Column('created_at', DateTime, default=datetime.datetime.now()),
    Column('user_id', ForeignKey('users.id'), nullable=False))
