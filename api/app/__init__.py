from flask import Flask
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET_KEY'
# app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

from app import routes
# from app import chats

