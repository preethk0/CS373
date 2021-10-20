
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
from dotenv import load_dotenv


# create and configure the app
app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("AWS_DB_KEY")
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

db = SQLAlchemy(app)