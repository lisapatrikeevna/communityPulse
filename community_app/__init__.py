import os

import dotenv
from flask import Flask

from community_app.extensions import db, migrate  # Импорт из extensions
from community_app.routes.category import category_bp
from community_app.routes.questions import questions_bp
from community_app.routes.responses import response_bp
from config import DevelopmentConfig, ProductionConfig, TestingConfig
import logging

#  __init__.py

logging.basicConfig(level=logging.DEBUG)
dotenv.load_dotenv()
configName = os.getenv('Flask_ENV')

# configSetUp = {"development": DevelopmentConfig, "production": ProductionConfig, "testing": TestingConfig, }.get(configName)
configSetUp = {"development": DevelopmentConfig, "production": ProductionConfig, "testing": TestingConfig}.get(configName, DevelopmentConfig)


# app = Flask(__name__)
# app.register_blueprint(questions_bp)
# app.register_blueprint(response_bp)
# app.register_blueprint(category_bp)        


def create_app():
    app = Flask(__name__)
    app.config.from_object(configSetUp)
    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(questions_bp)
    app.register_blueprint(response_bp)
    app.register_blueprint(category_bp)
    return app
