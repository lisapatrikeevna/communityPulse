from flask import Blueprint, make_response, jsonify

from community_app.models.questions import Statistik

response_bp = Blueprint('responses', __name__, url_prefix='/responses')


@response_bp.route('/', methods=['GET'])  # url/questions
def get_all_responses():
    statistiks = Statistik.query.all()
    results = [{"question_id": stat.question_id, "agree_count": stat.agree_count, "disagree_count": stat.disagree_count} for stat in statistiks]
    response = make_response(jsonify(results), 200)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@response_bp.route('/add', methods=['POST'])
def add_new_response():
    return "add new response"

























