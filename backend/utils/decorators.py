from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required as flask_jwt_required
from models import User, UserRole

# Re-export jwt_required for convenience
jwt_required = flask_jwt_required()

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != UserRole.ADMIN:
            return {'message': 'Admin access required'}, 403
        
        return f(*args, **kwargs)
    return decorated_function