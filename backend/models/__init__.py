from app import db
from datetime import datetime
from enum import Enum

class UserRole(Enum):
    USER = "user"
    DRIVER = "driver"
    ADMIN = "admin"

class TripStatus(Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), default=UserRole.USER)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    trips = db.relationship('Trip', foreign_keys='Trip.user_id', backref='user')
    driver_trips = db.relationship('Trip', foreign_keys='Trip.driver_id', backref='driver')
    driver_profile = db.relationship('DriverProfile', backref='user', uselist=False)

class DriverProfile(db.Model):
    __tablename__ = 'driver_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    license_url = db.Column(db.String(255))
    id_document_url = db.Column(db.String(255))
    is_verified = db.Column(db.Boolean, default=False)
    is_available = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Trip(db.Model):
    __tablename__ = 'trips'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pickup_location = db.Column(db.String(255), nullable=False)
    dropoff_location = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Enum(TripStatus), default=TripStatus.PENDING)
    fare = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)