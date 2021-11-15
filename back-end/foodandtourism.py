from sqlalchemy import and_, or_, func
from sqlalchemy.sql.expression import all_, cast
import sqlalchemy
from models import FoodAndTourism

def filter_foodandtourism(foodandtourism_query, queries):
    if "country_name" in queries:
        countries_filter = queries['country_name']
        foodandtourism_query = foodandtourism_query.filter(FoodAndTourism.country_name.in_(countries_filter))

    if "country_tourism_revenue" in queries:
        revenue_filter = queries['country_tourism_revenue']
        all_filters = []
        for filter in revenue_filter:
            lower_bound, upper_bound = filter.split("-")
            all_filters.append(and_(FoodAndTourism.country_tourism_revenue > int(lower_bound) * 10**6, FoodAndTourism.country_tourism_revenue <= int(upper_bound) * 10**6))
        foodandtourism_query = foodandtourism_query.filter(or_(*tuple(all_filters)))
    
    if "country_number_of_tourists" in queries:
        tourist_filter = queries['country_number_of_tourists']
        all_filters = []
        for filter in tourist_filter:
            lower_bound, upper_bound = filter.split("-")
            all_filters.append(and_(FoodAndTourism.country_number_of_tourists > int(lower_bound) * 10**3, FoodAndTourism.country_number_of_tourists <= int(upper_bound) * 10**3))
        foodandtourism_query = foodandtourism_query.filter(or_(*tuple(all_filters)))

    if "country_income_level" in queries:
        income_filter = queries['country_continent']
        foodandtourism_query = foodandtourism_query.filter(FoodAndTourism.country_income_level.in_(income_filter))

    return foodandtourism_query

def sort_foodandtourism(foodandtourism_query, queries):
    if "sort" in queries:
        sort_value = queries['sort'][0]
        attribute, order = sort_value.split("-")

        foodandtourism_attribute = None
        if attribute == "country_name":
            foodandtourism_attribute = FoodAndTourism.country_name
        elif attribute == "country_tourism_revenue":
            foodandtourism_attribute = FoodAndTourism.country_tourism_revenue
        elif attribute == "country_number_of_tourists":
            foodandtourism_attribute = FoodAndTourism.country_number_of_tourists
        elif attribute == "country_income_level":
            foodandtourism_attribute = FoodAndTourism.country_income_level
        
        if foodandtourism_attribute:
            return foodandtourism_query.order_by(foodandtourism_attribute.desc() if order == "des" else foodandtourism_attribute)
    
    return foodandtourism_query


def search_foodandtourism(foodandtourism_query, queries):
    if "search" in queries:
        term = queries['search'][0].strip().lower()

        keywords = ['tourism revenue:', 'income level:', 'number of tourists:']

        all_filters = []

        if True in [keyword.strip().find(term) >= 0 for keyword in keywords]:
            return foodandtourism_query

        if term.find(keywords[0]) == 0:
            all_filters.append(func.lower(cast(FoodAndTourism.country_tourism_revenue, sqlalchemy.String)).startswith(term[len(keywords[0]) + 1:])) 
        elif term.find(keywords[1]) == 0:
            all_filters.append(func.lower(FoodAndTourism.country_income_level).startswith(term[len(keywords[3]) + 1:]))
        elif term.find(keywords[2]) == 0:
            all_filters.append(func.lower(cast(FoodAndTourism.country_number_of_tourists, sqlalchemy.String)).startswith(term[len(keywords[2]) + 1:]))
        
        all_filters.append(func.lower(FoodAndTourism.country_name).contains(term))
        all_filters.append(func.lower(cast(FoodAndTourism.country_tourism_revenue, sqlalchemy.String)).contains(term)) 
        all_filters.append(func.lower(FoodAndTourism.country_income_level).contains(term)) 
        all_filters.append(func.lower(cast(FoodAndTourism.country_number_of_tourists, sqlalchemy.String)).contains(term))

        foodandtourism_query = foodandtourism_query.filter(or_(*tuple(all_filters)))
            
    return foodandtourism_query