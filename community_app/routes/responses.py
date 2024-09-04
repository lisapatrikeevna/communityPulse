from flask import Blueprint

response_bp = Blueprint('questions', __name__, url_prefix='/responses')


@response_bp.route('/')  # url/questions
def get_all_questions():
    return "get all response"

@response_bp.route('/add', methods=['POST'])
def add_new_questions():
    return "add new response"





