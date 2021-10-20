from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
from models import (
    Demographics, 
    Geography, 
    FoodAndTourism, 
    demographics_schema, 
    all_demographics_schema, 
    geography_schema, 
    all_geography_schema,
    foodandtourism_schema,
    all_foodandtourism_schema
)
from init import app

# a simple page that says hello
@app.route("/")
def hello_world():
    return 'WELCOME TO AROUND THE WORLD\'S API!'

#************************************************************************#

# Retrieve demographics data for all countries
@app.route("/demographics", methods=["GET"])
def get_all_demographics():
    all_demographics = Demographics.query.all()
    result = all_demographics_schema.dump(all_demographics)
    return jsonify(result)

# Retrieve demographics data for country with specific country-id
@app.route("/demographics/<id>", methods=["GET"])
def get_demographics(id):
    country_demographics = Demographics.query.get(id)
    result = demographics_schema.dump(country_demographics)
    return result

#************************************************************************#

# Retrieve geography data for all countries
@app.route("/geography", methods=["GET"])
def get_all_geography():
    all_geography = Geography.query.all()
    result = all_geography_schema.dump(all_geography)
    return jsonify(result)

# Retrieve geography data for country with specific country-id
@app.route("/geography/<id>", methods=["GET"])
def get_geography(id):
    country_geography = Geography.query.get(id)
    result = geography_schema.dump(country_geography)
    return result

#************************************************************************#

# Retrieve food and tourism data for all countries
@app.route("/foodandtourism", methods=["GET"])
def get_all_foodandtourism():
    all_foodandtourism = FoodAndTourism.query.all()
    result = all_foodandtourism_schema.dump(all_foodandtourism)
    return jsonify(result)

# Retrieve food and tourism data for country with specific country-id
@app.route("/foodandtourism/<id>", methods=["GET"])
def get_foodandtourism(id):
    country_foodandtourism = FoodAndTourism.query.get(id)
    result = foodandtourism_schema.dump(country_foodandtourism)
    return result

#************************************************************************#

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)