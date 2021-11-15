from flask import request, jsonify
from demographics import filter_demographics, sort_demographics, search_demographics
from geography import filter_geography, sort_geography, search_geography

from models import (
    Demographics,
    Geography,
    FoodAndTourism,
    demographics_schema,
    all_demographics_schema,
    geography_schema,
    all_geography_schema,
    foodandtourism_schema,
    all_foodandtourism_schema,
)
from init import app, db

# a simple page that says hello
@app.route("/")
def hello_world():
    return "WELCOME TO AROUND THE WORLD'S API!"


# ************************************************************************#

# Retrieve demographics data for all countries
@app.route("/demographics", methods=["GET"])
def get_all_demographics():
    queries = request.args.to_dict(flat=False)
    dem_query = db.session.query(Demographics)

    page = int(queries['page'][0]) if "page" in queries else 1
    per_page = int(queries['per_page'][0]) if "per_page" in queries else 9
    
    dem_query = filter_demographics(dem_query, queries)
    dem_query = sort_demographics(dem_query, queries)
    dem_query = search_demographics(dem_query, queries)
    demographics = dem_query.paginate(page=page, per_page=per_page)

    result = all_demographics_schema.dump(demographics.items, many=True)

    return {'result': result, 'count': dem_query.count()}


# Retrieve demographics data for country with specific country-id
@app.route("/demographics/<id>", methods=["GET"])
def get_demographics(id):
    country_demographics = Demographics.query.get(id)
    result = demographics_schema.dump(country_demographics)
    return result


# ************************************************************************#

# Retrieve geography data for all countries
@app.route("/geography", methods=["GET"])
def get_all_geography():
    queries = request.args.to_dict(flat=False)
    geo_query = db.session.query(Geography)

    page = int(queries['page'][0]) if "page" in queries else 1
    per_page = int(queries['per_page'][0]) if "per_page" in queries else 10
    
    geo_query = filter_geography(geo_query, queries)
    geo_query = sort_geography(geo_query, queries)
    geo_query = search_geography(geo_query, queries)
    geography = geo_query.paginate(page=page, per_page=per_page)

    result = all_geography_schema.dump(geography.items, many=True)

    return {'result': result, 'count': geo_query.count()}


# Retrieve geography data for country with specific country-id
@app.route("/geography/<id>", methods=["GET"])
def get_geography(id):
    country_geography = Geography.query.get(id)
    result = geography_schema.dump(country_geography)
    return result


# ************************************************************************#

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


# ************************************************************************#

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
