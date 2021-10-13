import os
import json
from models import Demographics, Geography


def populate_demographics():
    individual_files_dir = 'data/individualCountryData'
    for file_name in os.listdir(individual_files_dir):
        with open(individual_files_dir + '/' + file_name, 'r') as file:
            country_dem_data = json.load(file)
            add_demographic(country_dem_data)
        break

def add_demographic(country_data):
    country_code = country_data.isoAlpha2
    # country_name = 