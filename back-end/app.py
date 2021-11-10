from flask import request, jsonify
from sqlalchemy import and_, or_, func
import sqlalchemy
from sqlalchemy.sql.expression import all_, cast



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


def filter_demographics(dem_query, queries):
    if "country_name" in queries:
        countries_filter = queries['country_name']
        dem_query = dem_query.filter(Demographics.country_name.in_(countries_filter))

    if "country_population" in queries:
        population_filter = queries['country_population']
        all_filters = []
        for filter in population_filter:
            lower_bound, upper_bound = filter.split("-")
            all_filters.append(and_(Demographics.country_population > int(lower_bound) * 10**6, Demographics.country_population <= int(upper_bound) * 10**6))
        dem_query = dem_query.filter(or_(*tuple(all_filters)))
    
    if "country_gdp" in queries:
        gdp_filter = queries['country_gdp']
        all_filters = []
        for filter in gdp_filter:
            lower_bound, upper_bound = filter.split("-")
            all_filters.append(and_(Demographics.country_GDP > int(lower_bound) * 10**9, Demographics.country_GDP <= int(upper_bound) * 10**9))
        dem_query = dem_query.filter(or_(*tuple(all_filters)))

    if "country_language" in queries:
        language_filter = queries['country_language']
        all_filters = []
        for language in language_filter:
            all_filters.append(Demographics.country_languages.contains(language))
        dem_query = dem_query.filter(or_(*tuple(all_filters)))

    return dem_query

def sort_demographics(dem_query, queries):
    if "sort" in queries:
        sort_value = queries['sort'][0]
        attribute, order = sort_value.split("-")

        dem_attribute = None
        if attribute == "country_name":
            dem_attribute = Demographics.country_name
        elif attribute == "country_population":
            dem_attribute = Demographics.country_population
        elif attribute == "country_states":
            dem_attribute = Demographics.country_states
        elif attribute == "country_GDP":
            dem_attribute = Demographics.country_GDP

        if dem_attribute:
            return dem_query.order_by(dem_attribute.desc() if order == "des" else dem_attribute)
    
    return dem_query

def search_demographics(dem_query, queries):
    if "search" in queries:
        term = queries['search'][0].strip().lower()

        keywords = ['population:', 'languages:', 'number of states:', 'nominal gdp: $']

        all_filters = []

        if True in [keyword.strip().find(term) >= 0 for keyword in keywords]:
            return dem_query

        if term.find(keywords[0]) == 0:
            all_filters.append(func.lower(cast(Demographics.country_population, sqlalchemy.String)).startswith(term[len(keywords[0]) + 1:])) # Check populations
        elif term.find(keywords[1]) == 0:
            all_filters.append(func.lower(Demographics.country_languages).startswith(term[len(keywords[1]) + 1:])) # Check languages
        elif term.find(keywords[2]) == 0:
            all_filters.append(func.lower(cast(Demographics.country_states, sqlalchemy.String)).startswith(term[len(keywords[2]) + 1:])) # Check number of states
        elif term.find(keywords[3]) == 0:
            all_filters.append(func.lower(cast(Demographics.country_GDP, sqlalchemy.String)).startswith(term[len(keywords[3]):])) # Check nominal GDP
        
        all_filters.append(func.lower(Demographics.country_name).contains(term)) # Check country names
        all_filters.append(func.lower(Demographics.country_capital).contains(term)) # Check capitals
        all_filters.append(func.lower(cast(Demographics.country_population, sqlalchemy.String)).contains(term)) # Check populations
        all_filters.append(func.lower(Demographics.country_languages).contains(term)) # Check languages
        all_filters.append(func.lower(cast(Demographics.country_states, sqlalchemy.String)).contains(term)) # Check number of states
        all_filters.append(func.lower(cast(Demographics.country_GDP, sqlalchemy.String)).contains(term)) # Check GDP

        dem_query = dem_query.filter(or_(*tuple(all_filters)))
            
    return dem_query

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
    all_geography = Geography.query.all()
    result = all_geography_schema.dump(all_geography)
    return jsonify(result)


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
