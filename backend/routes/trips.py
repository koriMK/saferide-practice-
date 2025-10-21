from flask import Blueprint, request
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Trip, TripStatus, User
from utils.decorators import admin_required
# from flasgger import swag_from

trips_bp = Blueprint('trips', __name__)
api = Api(trips_bp)

class TripResource(Resource):
    @jwt_required()
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