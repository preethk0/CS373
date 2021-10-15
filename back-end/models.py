from flask_sqlalchemy import SQLAlchemy
from main import db, app
from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow(app)

###### MODELS ######

# Define Demographics table/data model
class Demographics(db.Model):
    __tablename__ = "demographics"
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
    __tablename__ = "geography"
    country_id = db.Column(db.String(), primary_key=True)
    country_name = db.Column(db.String())
    country_latitude = db.Column(db.Float)
    country_longitude = db.Column(db.Float)
    country_continent = db.Column(db.String())
    country_region = db.Column(db.String())
    country_adjacent_countries = db.Column(db.PickleType)
    country_land_area = db.Column(db.String())
    country_water_area = db.Column(db.String())
    country_water_percent = db.Column(db.String())

# Define Food and Tourism table/data model


# Schemas for each model
class DemographicsSchema(ma.Schema):
    country_id = fields.Str(required=True)
    country_name = fields.Str(required=True)
    country_flag = fields.Str(required=True)
    country_flag_emoji = fields.Str(required=True)
    country_capital = fields.Str(required=True)
    country_population = fields.Int(required=True)
    country_languages = fields.Str(required=True)
    country_currency = fields.Str(required=True)
    country_calling_code = fields.Str(required=True)
    country_domain = fields.Str(required=True)
    country_cities = fields.Int(required=True)
    country_states = fields.Int(required=True)
    country_income_level = fields.Str(required=True)

with app.app_context():
    db.create_all()
    db.session.commit()