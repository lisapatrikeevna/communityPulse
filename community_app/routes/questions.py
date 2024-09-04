from flask import Blueprint


# routes/questions.py
questions_bp = Blueprint('questions', __name__, url_prefix='/questions')


@questions_bp.route('/', methods = ['GET'])  # url/questions
def get_all_questions():
    return "get all questions"

@questions_bp.route('/add', methods=['POST'])
def add_new_questions():
    return "add new questions"





