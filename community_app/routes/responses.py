from flask import Blueprint, make_response, jsonify, request

from community_app.extensions import db  # Импорт из extensions
from community_app.models.questions import Statistik, Question
from community_app.models.response import Response

# routes/responses.pu
response_bp = Blueprint('responses', __name__, url_prefix='/api/responses')


@response_bp.route('/', methods=['GET'])  # url/questions
def get_all_responses():
    try:
        statistiks = Statistik.query.all()
        responses = Response.query.all()  # Получаем все ответы
        results = []

        for stat in statistiks:
            response_data = {"question_id": stat.question_id, "agree_count": stat.agree_count, "disagree_count": stat.disagree_count, "responses": [{"id": response.id, "text": response.text, "is_agree": response.is_agree, } for response in responses if response.question_id == stat.question_id]}
            results.append(response_data)

        # print("Results: ", results)
        return make_response(jsonify(results), 200)
    except Exception as e:
        print("Error fetching responses: ", str(e))
        return jsonify({'message': 'Error fetching responses'}), 500


@response_bp.route('/add', methods=['POST'])
def add_response():
    """Добавление нового ответа на вопрос с обновлением статистики."""
    data = request.get_json()
    print(data)
    if not data or 'question_id' not in data or 'is_agree' not in data:
        return jsonify({'message': "Некорректные данные"}), 400

    question = Question.query.get(data['question_id'])
    if not question:
        return jsonify({'message': "Вопрос не найден"}), 404

    # Добавляем текст ответа, если он присутствует в запросе
    text = data.get('text', '')
    response = Response(question_id=question.id, is_agree=data['is_agree'], text=text)
    print(response)
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

@response_bp.route('/update/<int:response_id>', methods=['PUT'])
def update_response(response_id):
    response = Response.query.get(response_id)
    print(response)
    if not response:
        return make_response(jsonify({"message": "NO QUESTION FOUND", }), 404)

    print(request)
    request_data = request.get_json()
    print("request_data", request_data)

    if "text" in request_data and "is_agree" in request_data:
        response.text = request_data['text']
        response.is_agree = request_data['is_agree']
        db.session.commit()
        return make_response(jsonify({"message": "FILE UPDATED"}),200)
    else:
        return make_response(jsonify({"message": "NO DATA PROVIDED"}), 204)

@response_bp.route('/delete/<int:response_id>', methods=['DELETE'])
def delete_response(response_id):
    response = Response.query.get(response_id)
    if not response:
        return make_response(jsonify({"message": "NOT FOUND", }), 404)

    db.session.delete(response)
    db.session.commit()
    return make_response(jsonify({"message": "Response DELETED"}), 200)


