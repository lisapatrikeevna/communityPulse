import os
import dotenv
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig, ProductionConfig, TestingConfig
from community_app.routes.questions import questions_bp
from community_app.routes.responses import response_bp

#  __init__.py
migrate = Migrate()
db = SQLAlchemy()
dotenv.load_dotenv()
configName = os.getenv('Flask_ENV')

configSetUp = {"development": DevelopmentConfig, "production": ProductionConfig, "testing": TestingConfig, }.get(configName)


def create_app():
# def create_app(configName):
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(questions_bp) 
    app.register_blueprint(response_bp)

    return app
#
# @app.route('/')
# def hello_world():  # put application's code here
#     return 'Hello World!'

