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
    
# db.create_all()

# APIS

# API 1: http://api.countrylayer.com/v2/all?access_key=dffc936e64bb09079cd726042ec3457b 
# (result in countriesBasicData.json file above - has topLevelDomain, capital, two/three letter country code, country name, calling code, region and alternate spellings)

# API 2: https://api.bigdatacloud.net/data/country-info?code=us&localityLanguage=en&key=48c93ba0b7c24371aa0f78e62f1668d5 
# (have to change the code=___, giving 2 letter country code as parameter - has languages, currency, region/continent, income level, calling code, countryFlagEmoji)

# API 3: https://documenter.getpostman.com/view/1134062/T1LJjU52 
# (has bunch of different API calls - has population data, capital, flag, cities, states, currencies etc.)

# a simple page that says hello
@app.route('/hello')
def hello():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)