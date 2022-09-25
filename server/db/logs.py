from sqlalchemy import Table, Column, Integer, String, DateTime, ForeignKey
from db.base import metadata
import datetime

logs = Table(
    'logs', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True, unique=True),
    Column('user_id', Integer), Column('methods', String),
    Column('description', String), Column('time', DateTime),
    Column('username', String))
