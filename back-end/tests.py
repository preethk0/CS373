from unittest import main, TestCase
import requests
import json

from sqlalchemy import and_, or_, func
from sqlalchemy.sql.expression import all_, cast
import sqlalchemy
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
from flask import request, jsonify


class Tests(TestCase):
    # Test all demographics
    def test1(self):
        result = requests.get("https://api.around-the-world.me/demographics")
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes["result"]) == 9

    # Test single country demographics call
    def test2(self):
        result = requests.get("https://api.around-the-world.me/demographics/US")
        assert result.status_code == 200
        jsonRes = result.json()
        expected = 13718
        assert jsonRes["country_cities"] == expected

    # Test all Geography
    def test3(self):
        result = requests.get("https://api.around-the-world.me/geography")
        assert result.status_code == 200
        jsonRes = result.json()
        assert jsonRes["count"] == 154

    # Test single country geography call
    def test4(self):
        result = requests.get("https://api.around-the-world.me/geography/US")
        assert result.status_code == 200
        jsonRes = result.json()
        expected = {
            "country_adjacent_countries": "['Canada', 'Mexico']",
            "country_continent": "North America",
            "country_id": "US",
            "country_land_area": "9,147,593 (3,531,905) \u2013\n9,147,643 (3,531,925)[7]",
            "country_latitude": 38.0,
            "country_longitude": -97.0,
            "country_name": "United States",
            "country_region": "North America",
            "country_topography_image": "https://i.pinimg.com/originals/62/b2/90/62b290e795af39fe66c24dc2a449f37f.png",
            "country_water_area": "377,424 (145,724) \u2013\n685,924 (264,837)[7]",
            "country_water_percent": "3.96\u20136.97",
        }
        assert jsonRes == expected

    # Test all food and tourism
    def test5(self):
        result = requests.get("https://api.around-the-world.me/foodandtourism")
        assert result.status_code == 200
        jsonRes = result.json()
        assert jsonRes["count"] == 139

    # Test single country food and tourism call
    def test6(self):
        result = requests.get("https://api.around-the-world.me/foodandtourism/ML")
        assert result.status_code == 200
        jsonRes = result.json()
        expected = {
            "country_agricultural_exports": "Cotton lint",
            "country_coldest_month_temp": 19.4,
            "country_id": "ML",
            "country_income_level": "Low income",
            "country_main_attraction": "National Park of Mali",
            "country_main_attraction_image_src": "https://www.listchallenges.com/f/items/4f0a016e-4dab-4bc7-a70a-1197b04c2172.jpg",
            "country_main_dishes": "['Tiguadege Na - Mali', 'Mali - To Et Tokorodji']",
            "country_main_dishes_images": "['https://www.listchallenges.com/f/items/a1190a89-c9fa-45e5-93da-409b2b21acbe.jpg', 'https://www.listchallenges.com/f/items/fa092b35-afa6-43d5-8551-5fbe293eee99.jpg']",
            "country_name": "Mali",
            "country_number_of_tourists": 193300.0,
            "country_similar_tourist_countries_data": "['Guyana', 'Congo', 'Papua New Guinea', 'Grenada']",
            "country_tourism_percent_GDP": 1.3,
            "country_tourism_revenue": 200000000.0,
            "country_tourism_video_src": "https://www.youtube.com/watch?v=u6z_QtfNAF4",
            "country_warmest_month_temp": 34.6,
        }
        assert jsonRes == expected

    # Test call with invalid country code
    def test7(self):
        result = requests.get("https://api.around-the-world.me/foodandtourism/ABC")
        assert result.status_code == 200
        jsonRes = result.json()
        expected = {}
        assert jsonRes == expected

    # Test for filtering
    def test8(self):
        result = requests.get(
            "https://api.around-the-world.me/demographics?page=1&per_page=9&country_name=Denmark&country_name=Paraguay"
        )
        assert result.status_code == 200
        assert len(result.json()) == 2

    # Test for sorting
    def test9(self):
        result = requests.get(
            "https://api.around-the-world.me/demographics?page=1&per_page=9&sort=country_name-des"
        )
        assert result.status_code == 200
        jsonRes = result.json()
        assert len(jsonRes) > 0 and jsonRes["result"][0]["country_name"] == "Zimbabwe"


if __name__ == "__main__": 
    main()
