from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
from models import Demographics, Geography, demographics_schema, all_demographics_schema, geography_schema, all_geography_schema
from init import app, db

# a simple page that says hello
@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

# Retrieve demographics data for all countries
@app.route("/demographics", methods=["GET"])
def get_all_demographics():
    all_demographics = Demographics.query.all()
    result = all_demographics_schema.dump(all_demographics)
    return jsonify({"demographics": result})

# Retrieve demographics data for country with specific country-id
@app.route("/demographics/<id>", methods=["GET"])
def get_demographics(id):
    country_demographics = Demographics.query.get(id)
    result = demographics_schema.dump(country_demographics)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)