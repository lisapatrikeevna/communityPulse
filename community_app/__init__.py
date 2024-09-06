import os
import dotenv
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig, ProductionConfig, TestingConfig ,Config
from community_app.routes.questions import questions_bp
from community_app.routes.responses import response_bp
from community_app.routes.category import category_bp

#  __init__.py
migrate = Migrate()
db = SQLAlchemy()
dotenv.load_dotenv()
configName = os.getenv('Flask_ENV')

configSetUp = {"development": DevelopmentConfig, "production": ProductionConfig, "testing": TestingConfig, }.get(configName)

app = Flask(__name__)
app.register_blueprint(questions_bp)
app.register_blueprint(response_bp)
app.register_blueprint(category_bp)



def create_app():
    app = Flask(__name__)
    app.config.from_object(configSetUp)
    db.init_app(app)
    migrate.init_app(app, db)

    return app



