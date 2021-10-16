from models import Demographics, Geography, demographics_schema, all_demographics_schema, geography_schema, all_geography_schema
from main import app, db
from flask import Response, json, request, jsonify, render_template

@app.route("/")
def get_front_end():
    return render_template("index.html")

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


