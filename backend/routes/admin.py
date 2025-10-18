from flask import Blueprint
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required
from models import db, User, DriverProfile, UserRole
from utils.decorators import admin_required
from flasgger import swag_from

admin_bp = Blueprint('admin', __name__)
api = Api(admin_bp)

class DriversResource(Resource):
    @jwt_required()
    @admin_required
    @swag_from({
        'tags': ['Admin'],
        'security': [{'Bearer': []}],
        'responses': {
            200: {'description': 'Drivers list retrieved'}
        }
    })
    def get(self):
        drivers = User.query.filter_by(role=UserRole.DRIVER).all()
        return {
            'drivers': [{
                'id': driver.id,
                'email': driver.email,
                'phone_number': driver.phone_number,
                'is_verified': driver.driver_profile.is_verified if driver.driver_profile else False,
                'rating': driver.driver_profile.rating if driver.driver_profile else 0
            } for driver in drivers]
        }

api.add_resource(DriversResource, '/drivers')