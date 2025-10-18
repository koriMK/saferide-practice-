from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, UserRole

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return {'message': 'Email already exists'}, 400
        
    user = User(
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=UserRole(data.get('role', 'user'))
    )
    
    db.session.add(user)
    db.session.commit()
    
    return {'message': 'User registered successfully'}, 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return {
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': user.role.value
            }
        }
    
    return {'message': 'Invalid credentials'}, 401