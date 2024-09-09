from flask import Blueprint, make_response, jsonify, request

from community_app.extensions import db  # Импорт из extensions
from community_app.models.questions import Statistik, Question
from community_app.models.response import Response

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


@response_bp.route('/add', methods=['POST'])
def add_response():
    """Добавление нового ответа на вопрос с обновлением статистики."""
    data = request.get_json()
    if not data or 'question_id' not in data or 'is_agree' not in data:
        return jsonify({'message': "Некорректные данные"}), 400

    question = Question.query.get(data['question_id'])
    if not question:
        return jsonify({'message': "Вопрос не найден"}), 404

    response = Response(question_id=question.id, is_agree=data['is_agree'])
    db.session.add(response)

    # Обновление статистики
    statistic = Statistik.query.filter_by(question_id=question.id).first()
    if not statistic:
        statistic = Statistik(question_id=question.id, agree_count=0, disagree_count=0)
        db.session.add(statistic)
    if data['is_agree']:
        statistic.agree_count += 1
    else:
        statistic.disagree_count += 1

    db.session.commit()

    return jsonify({'message': f"Ответ на вопрос {question.id} добавлен"}), 201
