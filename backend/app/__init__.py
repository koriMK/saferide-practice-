from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
# from flasgger import Swagger
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configuration from environment variables
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///saferide.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, origins=['http://localhost:5173', 'http://localhost:3000'], supports_credentials=True)
    
    # Swagger configuration (temporarily disabled)
    # swagger_config = {
    #     "headers": [],
    #     "specs": [
    #         {
    #             "endpoint": 'apispec',
    #             "route": '/apispec.json',
    #             "rule_filter": lambda rule: True,
    #             "model_filter": lambda tag: True,
    #         }
    #     ],
    #     "static_url_path": "/flasgger_static",
    #     "swagger_ui": True,
    #     "specs_route": "/apidocs/"
    # }
    # Swagger(app, config=swagger_config)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.trips import trips_bp
    from routes.mpesa import mpesa_bp
    # from routes.upload import upload_bp
    # from routes.admin import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(trips_bp, url_prefix='/api/trips')
    app.register_blueprint(mpesa_bp, url_prefix='/api/mpesa')
    # app.register_blueprint(upload_bp, url_prefix='/api/upload')
    # app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    with app.app_context():
        db.create_all()
    
    return app