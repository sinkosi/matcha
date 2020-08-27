from flask import Flask
import os

app = Flask(__name__, static_folder="uploads", static_url_path='/uploads')
app.config['SECRET_KEY'] = 'SECRET_KEY'
# app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

UPLOAD_DIRECTORY = "uploads/images"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

from app import routes
# from app import chats

