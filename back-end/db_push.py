import os
import json
from models import Demographics, Geography, FoodAndTourism
from init import db

with open('data/generalCountryData/codeToCountry.json', 'r') as file:
    code_to_country_data = json.load(file)

with open('data/generalCountryData/countriesBasicData.json', 'r') as file:
    countries_basic_data = json.load(file)

with open('data/generalCountryData/countriesFlagData.json', 'r') as file:
    countries_flag_data = json.load(file)

with open('data/generalCountryData/countriesPopulationData.json', 'r') as file:
    countries_population_data = json.load(file)

with open('data/generalCountryData/countriesStatesData.json', 'r') as file:
    countries_states_data = json.load(file)

with open('data/generalCountryData/countriesCitiesData.json', 'r') as file:
    countries_cities_data = json.load(file)

with open('data/generalCountryData/countriesDemographicsYoutubeData.json', 'r') as file:
    countries_demographics_videos_data = json.load(file)

with open('data/generalCountryData/countriesLocationData.json', 'r') as file:
    countries_location_data = json.load(file)

with open('data/generalCountryData/countriesNeighborsData.json', 'r') as file:
    countries_neighbors_data = json.load(file)

with open('data/generalCountryData/countriesAreaData.json', 'r') as file:
    countries_area_data = json.load(file)

with open('data/generalCountryData/countriesLandAreaData.json', 'r') as file:
    countries_land_area_data = json.load(file)

with open('data/generalCountryData/countriesMainDishesData.json', 'r') as file:
    countries_main_dishes_data = json.load(file)

with open('data/generalCountryData/countriesTopAgriculturalExportData.json', 'r') as file:
    countries_top_agricultural_export_data = json.load(file)

with open('data/generalCountryData/countriesTourismIncomeData.json', 'r') as file:
    countries_tourism_income_data = json.load(file)

with open('data/generalCountryData/countriesTouristArrivalsData.json', 'r') as file:
    countries_tourist_arrivals_data = json.load(file)

with open('data/generalCountryData/countriesTouristAttractionsData.json', 'r') as file:
    countries_tourist_attractions_data = json.load(file)

with open('data/generalCountryData/countriesTourismYoutubeData.json', 'r') as file:
    countries_tourism_videos_data = json.load(file)

with open('data/generalCountryData/countriesTemperaturesData.json', 'r') as file:
    countries_temperatures_data = json.load(file)

def populate_demographics():
    individual_files_dir = 'data/individualCountryData'
    for file_name in os.listdir(individual_files_dir):
        with open(individual_files_dir + '/' + file_name, 'r') as file:
            country_dem_data = json.load(file)
            add_demographics(country_dem_data)
    db.session.commit()

def add_demographics(country_ind_data):
    country_code = country_ind_data['isoAlpha2']
    country_name = code_to_country_data[country_code] if country_code in code_to_country_data else ""
    if country_name:
        country_basic_data = list(filter(lambda country: country['alpha2Code'] == country_code, countries_basic_data))
        country_flag_data = list(filter(lambda country: country['name'] == country_name, countries_flag_data['data']))
        country_population_data = list(filter(lambda country: country['country'] == country_name, countries_population_data['data']))
        country_cities_data = list(filter(lambda country: country['country'] == country_name, countries_cities_data['data']))
        country_states_data = list(filter(lambda country: country['name'] == country_name, countries_states_data['data']))
        country_demographics_video_data = list(filter(lambda country: country['countryCode'] == country_code, countries_demographics_videos_data))
        if country_basic_data and country_flag_data and country_population_data and country_cities_data and country_states_data:
            country_dem_obj = {
                "country_id": country_code,
                "country_name": country_name,
                "country_flag": country_flag_data[0]['flag'],
                "country_flag_emoji": country_ind_data['countryFlagEmoji'],
                "country_capital": country_basic_data[0]['capital'],
                "country_languages": list(map(lambda lang_obj: lang_obj['isoName'], country_ind_data['isoAdminLanguages'])),
                "country_population": country_population_data[0]['populationCounts'][-1]['value'],
                "country_currency": country_ind_data['currency']['code'],
                "country_calling_code": country_ind_data['callingCode'],
                "country_cities": len(country_cities_data[0]['cities']),
                "country_states": len(country_states_data[0]['states']),
                "country_domain": country_basic_data[0]['topLevelDomain'][0],
                "country_income_level": country_ind_data['wbIncomeLevel']['value'],
                "country_demographics_video_src": "https://www.youtube.com/watch?v=" + country_demographics_video_data[0]['items'][0]['id']['videoId'] if len(country_demographics_video_data[0]['items']) > 0 else ""
            }
            demographics_db_instance = Demographics(**country_dem_obj)
            db.session.add(demographics_db_instance)


def populate_geography():
    individual_files_dir = 'data/individualCountryData'
    for file_name in os.listdir(individual_files_dir):
        with open(individual_files_dir + '/' + file_name, 'r') as file:
            country_geo_data = json.load(file)
            add_geography(country_geo_data)
    db.session.commit()

def add_geography(country_ind_data):
    country_code = country_ind_data['isoAlpha2']
    country_name = code_to_country_data[country_code] if country_code in code_to_country_data else ""
    if country_name:
        country_location_data = list(filter(lambda country: country['name'] == country_name, countries_location_data['data']))
        country_neighbors_data = list(filter(lambda country: country['country_code'] == country_code, countries_neighbors_data))
        country_area_data = list(filter(lambda country: country['country'].strip() == country_name, countries_area_data))
        if country_location_data and country_neighbors_data and country_area_data:
            country_geo_obj = {
                "country_id": country_code,
                "country_name": country_name,
                "country_latitude": country_location_data[0]['lat'],
                "country_longitude": country_location_data[0]['long'],
                "country_continent": country_ind_data['continents'][0]['continent'] if len(country_ind_data['continents'][0]) > 0 else "",
                "country_region": country_ind_data['wbRegion']['value'],
                "country_adjacent_countries": country_neighbors_data[0]['country_border_names'],
                "country_land_area": country_area_data[0]['land_area'],
                "country_water_area": country_area_data[0]['water_area'],
                "country_water_percent": country_area_data[0]['water_percent']
            }
            geography_db_instance = Geography(**country_geo_obj)
            db.session.add(geography_db_instance)

def populate_food_and_tourism():
    individual_files_dir = 'data/individualCountryData'
    for file_name in os.listdir(individual_files_dir):
        with open(individual_files_dir + '/' + file_name, 'r') as file:
            country_food_and_tourism_data = json.load(file)
            add_food_and_tourism(country_food_and_tourism_data)
    db.session.commit()

def add_food_and_tourism(country_ind_data):
    country_code = country_ind_data['isoAlpha2']
    country_name = code_to_country_data[country_code] if country_code in code_to_country_data else ""
    if country_name:
        country_main_dishes_data = list(filter(lambda country: country['country'] == country_name, countries_main_dishes_data))
        country_top_agricultural_export_data = list(filter(lambda country: country['country'] == country_name, countries_top_agricultural_export_data))
        country_tourism_income_data = list(filter(lambda country: country['country'] == country_name, countries_tourism_income_data))
        country_tourist_arrivals_data = list(filter(lambda country: country['country'] == country_name, countries_tourist_arrivals_data))
        country_tourist_attractions_data = list(filter(lambda country: country['country'] == country_name, countries_tourist_attractions_data))
        country_tourism_video_data = list(filter(lambda country: country['countryCode'] == country_code, countries_tourism_videos_data))
        country_temperatures_data = list(filter(lambda country: country['country'] == country_name, countries_temperatures_data))
        if country_main_dishes_data and country_top_agricultural_export_data and country_tourism_income_data and country_tourist_arrivals_data and country_tourist_attractions_data and country_tourism_video_data and country_temperatures_data:
            country_food_and_tourism_obj = {
                "country_id": country_code,
                "country_name": country_name,
                "country_income_level": country_ind_data['wbIncomeLevel']['value'],
                "country_main_dishes": country_main_dishes_data[0]['main_dishes'],
                "country_main_dishes_images": country_main_dishes_data[0]['main_dishes_images'],
                "country_agricultural_exports": country_top_agricultural_export_data[0]['topCommodity'],
                "country_main_attraction": country_tourist_attractions_data[0]['attraction'],
                "country_main_attraction_image_src": country_tourist_attractions_data[0]['attraction_image'],
                "country_tourism_video_src": "https://www.youtube.com/watch?v=" + country_tourism_video_data[0]['items'][0]['id']['videoId'] if len(country_tourism_video_data[0]['items']) > 0 else "",
                "country_number_of_tourists": country_tourist_arrivals_data[0]['tourists'],
                "country_tourism_revenue": country_tourism_income_data[0]['tourism_income'],
                "country_tourism_percent_GDP": country_tourism_income_data[0]['percentage_of_GDP'],
                "country_coldest_month_temp": country_temperatures_data[0]['coldest_temp'],
                "country_warmest_month_temp": country_temperatures_data[0]['hottest_temp']
            }
            food_and_tourism_db_instance = FoodAndTourism(**country_food_and_tourism_obj)
            db.session.add(food_and_tourism_db_instance)

if __name__ == "__main__":
    print("Populating DB...")
    # populate_demographics()
    # populate_geography()
    populate_food_and_tourism()
    print("Done")