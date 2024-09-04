import os


class Config:
    DEBUG = True
    TESTING = False
    # SECRET_KEY = os.environ.get('SECRET_KEY')
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///os.patch/C:/Users/Parkhat Bazakov/PycharmProjects/Communuity_pulse_app/database_1.db'
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///os.patch/Communuity_pulse_app/database_1.db'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///databaseCommunuity.db'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class TestingConfig(Config):
    TESTING = True