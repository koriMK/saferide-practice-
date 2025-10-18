from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests
import os

google_auth_bp = Blueprint('google_auth', __name__)

@google_auth_bp.route('/auth/google', methods=['POST'])
def google_login():
    try:
        token = request.json.get('credential')
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), os.getenv('GOOGLE_CLIENT_ID')
        )
        
        # Extract user info
        user_data = {
            'email': idinfo['email'],
            'name': idinfo['name'],
            'picture': idinfo.get('picture'),
            'google_id': idinfo['sub']
        }
        
        # Create or get user from database
        # Add your user creation/login logic here
        
        return jsonify({'success': True, 'user': user_data})
    
    except ValueError:
        return jsonify({'error': 'Invalid token'}), 400