from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

###### MODELS ######

# Define Demographics table/data model
class Demographics(db.Model):
    country_id = db.Column(db.String(), primary_key=True)
    country_name = db.Column(db.String())
    country_flag = db.Column(db.String())
    country_flag_emoji = db.Column(db.String())
    country_capital = db.Column(db.String())
    country_population = db.Column(db.Integer)
    country_languages = db.Column(db.PickleType)
    country_currency = db.Column(db.String())
    country_calling_code = db.Column(db.String())
    country_domain = db.Column(db.String())
    country_cities = db.Column(db.Integer)
    country_states = db.Column(db.Integer)
    country_income_level = db.Column(db.String())

# Define Geography table/data model
class Geography(db.Model):
    country_id = db.Column(db.String(), primary_key=True)
    country_name = db.Column(db.String())
    country_latitude = db.Column(db.Float)
    country_longitude = db.Column(db.Float)
    country_continent = db.Column(db.String())
    country_region = db.Column(db.String())

    def __init__(self, country_id="NaN", country_name="NaN", country_latitude=0.0, country_longitude=0.0, country_continent="NaN", country_region="NaN"):
        self.country_id = country_id
        self.country_name = country_name
        self.country_latitude = country_latitude
        self.country_longitude = country_longitude
        self.country_continent = country_continent
        self.country_region = country_region

# Define Food and Tourism table/data model