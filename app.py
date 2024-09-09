from community_app import create_app
from community_app.models.questions import Question
from community_app.models.response import Response
from community_app.models.category import Category

# app.py

if __name__ == '__main__':
    app = create_app()
    app.run()












