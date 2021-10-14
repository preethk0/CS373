import os
import json
from models import Demographics, Geography

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

def populate_demographics():
    individual_files_dir = 'data/individualCountryData'
    for file_name in os.listdir(individual_files_dir):
        with open(individual_files_dir + '/' + file_name, 'r') as file:
            country_dem_data = json.load(file)
            add_demographics(country_dem_data)

def add_demographics(country_ind_data):
    country_code = country_ind_data['isoAlpha2']
    country_name = code_to_country_data[country_code] if country_code in code_to_country_data else ""
    if country_name:
        country_basic_data = list(filter(lambda country: country['alpha2Code'] == country_code, countries_basic_data))
        country_flag_data = list(filter(lambda country: country['name'] == country_name, countries_flag_data['data']))
        country_population_data = list(filter(lambda country: country['country'] == country_name, countries_population_data['data']))
        country_cities_data = list(filter(lambda country: country['country'] == country_name, countries_cities_data['data']))
        country_states_data = list(filter(lambda country: country['name'] == country_name, countries_states_data['data']))
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
                "country_income_level": country_ind_data['wbIncomeLevel']['value']
            }
            demographics_db_instance = Demographics(**country_dem_obj)

def populate_geography():
    # do something
    print()

def add_geography():
    # do something
    print()

def populate_food_and_tourism():
    # do something
    print()

def add_food_and_tourism():
    # do something
    print()

if __name__ == "__main__":
    print("Populating DB...")
    populate_demographics()