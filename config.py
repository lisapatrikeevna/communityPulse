import os

class Config:
    # SECRET_KEY = os.environ.get('SECRET_KEY')
    # Эта строка отвечает за получение секретного ключа из переменной окружения `SECRET_KEY`.
    # Он используется для защиты данных в приложении, таких как сессии и CSRF-токены.

    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    # Здесь SQLAlchemy ожидает, что URL базы данных будет передан через переменную окружения `DATABASE_URL`.
    # Это полезно для переключения между разными базами данных в зависимости от окружения (например, тестирование, разработка, продакшн).

    # SQLALCHEMY_DATABASE_URI = 'sqlite:///os.patch/C:/Users/Parkhat Bazakov/PycharmProjects/Communuity_pulse_app/database_1.db'
    # Этот путь указывает на файл базы данных SQLite, который находится на конкретном пути в системе Windows.
    # Использование абсолютного пути к базе данных ограничивает использование приложения только на этой машине.

    # SQLALCHEMY_DATABASE_URI = 'sqlite:///os.patch/Communuity_pulse_app/database_1.db'
    # Эта строка также указывает на базу данных SQLite, но путь к файлу начинается с директории `os.patch`.
    # Это также жестко заданный путь, что может создавать проблемы при переносе проекта на другие машины.

    # SQLALCHEMY_DATABASE_URI = 'sqlite:///databaseCommunuity.db'
    # Эта строка задает относительный путь к базе данных SQLite. База данных будет создаваться в корневой директории проекта.
    # Однако для большей гибкости и универсальности лучше указать относительный путь, начиная с текущей директории.

    SQLALCHEMY_DATABASE_URI = 'sqlite:///./databaseCommunuity.db'
    # Этот путь задает базу данных SQLite в текущей директории проекта, что делает его более переносимым.
    # При перемещении проекта на другой компьютер база данных будет создаваться в корне проекта.

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Этот параметр отключает механизм отслеживания изменений объектов в SQLAlchemy, что немного ускоряет работу и уменьшает потребление памяти.

class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class TestingConfig(Config):
    TESTING = True










    