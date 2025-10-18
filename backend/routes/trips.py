from flask import Blueprint, request
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Trip, TripStatus, User
from utils.decorators import admin_required
from flasgger import swag_from

trips_bp = Blueprint('trips', __name__)
api = Api(trips_bp)

class TripResource(Resource):
    @jwt_required()
    @swag_from({
        'tags': ['Trips'],
        'security': [{'Bearer': []}],
        'responses': {
            200: {'description': 'Trips retrieved successfully'}
        }
    })
    def get(self):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        trips = Trip.query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return {
            'trips': [{
                'id': trip.id,
                'pickup_location': trip.pickup_location,
                'dropoff_location': trip.dropoff_location,
                'status': trip.status.value,
                'fare': trip.fare
            } for trip in trips.items],
            'total': trips.total,
            'pages': trips.pages,
            'current_page': page
        }
    
    @jwt_required()
    @swag_from({
        'tags': ['Trips'],
        'security': [{'Bearer': []}],
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'pickup_location': {'type': 'string'},
                        'dropoff_location': {'type': 'string'}
                    }
                }
            }
        ],
        'responses': {
            201: {'description': 'Trip created successfully'}
        }
    })
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        
        trip = Trip(
            user_id=user_id,
            pickup_location=data['pickup_location'],
            dropoff_location=data['dropoff_location'],
            fare=25.0  # Base fare
        )
        
        db.session.add(trip)
        db.session.commit()
        
        return {'message': 'Trip created', 'trip_id': trip.id}, 201

class TripStatusResource(Resource):
    @jwt_required()
    @swag_from({
        'tags': ['Trips'],
        'security': [{'Bearer': []}],
        'parameters': [
            {
                'name': 'trip_id',
                'in': 'path',
                'type': 'integer',
                'required': True
            },
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'status': {'type': 'string', 'enum': ['accepted', 'in_progress', 'completed']}
                    }
                }
            }
        ],
        'responses': {
            200: {'description': 'Trip status updated'}
        }
    })
    def put(self, trip_id):
        data = request.get_json()
        trip = Trip.query.get_or_404(trip_id)
        
        # Only driver assigned to trip can update status
        current_user_id = get_jwt_identity()
        if trip.driver_id != current_user_id:
            return {'message': 'Unauthorized'}, 403
        
        trip.status = TripStatus(data['status'])
        db.session.commit()
        
        return {'message': 'Trip status updated'}

api.add_resource(TripResource, '')
api.add_resource(TripStatusResource, '/<int:trip_id>/status')