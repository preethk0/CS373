from sqlalchemy import and_, or_, func
from sqlalchemy.sql.expression import all_, cast
import sqlalchemy
from models import Demographics

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

    if "country_states" in queries:
        states_filter = queries['country_states']
        all_filters = []
        for filter in states_filter:
            lower_bound, upper_bound = filter.split("-")
            all_filters.append(and_(Demographics.country_states >= int(lower_bound), Demographics.country_states <= int(upper_bound)))
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
        elif attribute == "country_language":
            dem_attribute  = Demographics.country_languages

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