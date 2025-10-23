from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, UserRole

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"Registration data received: {data}")
        
        if not data:
            print("No data provided")
            return {'message': 'No data provided'}, 400
        
        # Validate required fields
        required_fields = ['name', 'email', 'password', 'phone']
        for field in required_fields:
            if not data.get(field):
                print(f"Missing field: {field}")
                return {'message': f'{field} is required'}, 400
        
        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Email already exists'}, 400
        
        # Validate role
        role_str = data.get('role', 'user')
        try:
            role = UserRole(role_str)
        except ValueError:
            return {'message': 'Invalid role'}, 400
            
        user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            password_hash=generate_password_hash(data['password']),
            role=role
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token and return user data
        access_token = create_access_token(identity=str(user.id))
        return {
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'role': user.role.value
            }
        }, 201
        
    except Exception as e:
        db.session.rollback()
        return {'message': f'Registration error: {str(e)}'}, 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data:
            return {'message': 'No data provided'}, 400
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return {'message': 'Email and password are required'}, 400
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=str(user.id))
            return {
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'phone': user.phone,
                    'role': user.role.value
                }
            }
        
        return {'message': 'Invalid credentials'}, 401
        
    except Exception as e:
        return {'message': f'Login error: {str(e)}'}, 500