from flask import Blueprint, request
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, DriverProfile, UserRole
from services.cloudinary_service import upload_and_resize_image
from flasgger import swag_from

upload_bp = Blueprint('upload', __name__)
api = Api(upload_bp)

class UploadResource(Resource):
    @jwt_required()
    @swag_from({
        'tags': ['Upload'],
        'security': [{'Bearer': []}],
        'consumes': ['multipart/form-data'],
        'parameters': [
            {
                'name': 'file',
                'in': 'formData',
                'type': 'file',
                'required': True,
                'description': 'Image file to upload'
            },
            {
                'name': 'document_type',
                'in': 'formData',
                'type': 'string',
                'required': True,
                'enum': ['license', 'id'],
                'description': 'Type of document'
            }
        ],
        'responses': {
            200: {'description': 'File uploaded successfully'},
            403: {'description': 'Only drivers can upload documents'}
        }
    })
    def post(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != UserRole.DRIVER:
            return {'message': 'Only drivers can upload documents'}, 403
        
        if 'file' not in request.files:
            return {'message': 'No file provided'}, 400
        
        file = request.files['file']
        document_type = request.form.get('document_type')
        
        # Upload and resize image
        image_url = upload_and_resize_image(file)
        
        # Create or update driver profile
        driver_profile = user.driver_profile
        if not driver_profile:
            driver_profile = DriverProfile(user_id=user.id)
            db.session.add(driver_profile)
        
        if document_type == 'license':
            driver_profile.license_image_url = image_url
        elif document_type == 'id':
            driver_profile.id_image_url = image_url
        
        db.session.commit()
        
        return {'message': 'File uploaded successfully', 'url': image_url}

api.add_resource(UploadResource, '')