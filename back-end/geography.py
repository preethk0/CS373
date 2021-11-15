from sqlalchemy import and_, or_, func
from sqlalchemy.sql.expression import cast
import sqlalchemy
from models import Geography

def filter_geography(geo_query, queries):
    if "country_name" in queries:
        country_filter = queries['country_name']
        geo_query = geo_query.filter(Geography.country_name.in_(country_filter))

    if "country_longitude" in queries:
        longitude_filter = queries['country_longitude']
        all_filters = []
        for filter in longitude_filter:
            lower_bound, upper_bound = filter.split("*")
            all_filters.append(and_(Geography.country_longitude > int(lower_bound), Geography.country_longitude <= int(upper_bound)))
        geo_query = geo_query.filter(or_(*tuple(all_filters)))

    if "country_latitude" in queries:
        latitude_filter = queries['country_latitude']
        all_filters = []
        for filter in latitude_filter:
            lower_bound, upper_bound = filter.split("*")
            all_filters.append(and_(Geography.country_latitude > int(lower_bound), Geography.country_latitude <= int(upper_bound)))
        geo_query = geo_query.filter(or_(*tuple(all_filters)))

    if "country_continent" in queries:
        continent_filter = queries['country_continent']
        geo_query = geo_query.filter(Geography.country_continent.in_(continent_filter))

    if "country_region" in queries:
        region_filter = queries['country_region']
        geo_query = geo_query.filter(Geography.country_region.in_(region_filter))
    
    return geo_query

def sort_geography(geo_query, queries):
    if "sort" in queries:
        sort_value = queries['sort'][0]
        attribute, order = sort_value.split("-")

        geo_attribute = None
        if attribute == "country_name":
            geo_attribute = Geography.country_name
        elif attribute == "country_longitude":
            geo_attribute = Geography.country_longitude
        elif attribute == "country_latitude":
            geo_attribute = Geography.country_latitude
        elif attribute == "country_continent":
            geo_attribute = Geography.country_continent
        elif attribute == "country_region":
            geo_attribute = Geography.country_region
        
        if geo_attribute:
            return geo_query.order_by(geo_attribute.desc() if order == "des" else geo_attribute)
    
    return geo_query

def search_geography(geo_query, queries):
    if "search" in queries:
        term = queries['search'][0].strip().lower()

        all_filters = []
       
        all_filters.append(func.lower(Geography.country_name).contains(term))
        all_filters.append(func.lower(cast(Geography.country_longitude, sqlalchemy.String)).contains(term))
        all_filters.append(func.lower(cast(Geography.country_latitude, sqlalchemy.String)).contains(term))
        all_filters.append(func.lower(Geography.country_continent).contains(term))
        all_filters.append(func.lower(Geography.country_region).contains(term))

        geo_query = geo_query.filter(or_(*tuple(all_filters)))
            
    return geo_query