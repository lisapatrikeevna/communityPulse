from flask import jsonify, request, make_response, Blueprint

from community_app.extensions import db  # Импорт из extensions
from community_app.models.questions import Question

# routes/questions.py
questions_bp = Blueprint('questions', __name__, url_prefix='/api/questions')


@questions_bp.route('/', methods=['GET'])  # url/questions
def get_all_questions():
    questions: list[Question] = Question.query.all()

    questions_data: list[dict] = [{"id": question.id, "text": question.text, "created_at": question.created_at} for question in questions]

    # return jsonify(questions)
    # return jsonify(questions_data)
    response = make_response(jsonify(questions_data), 200)
    response.headers['Custom-Header'] = 'our custom header'
    # response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@questions_bp.route('/add', methods=['POST'])
def add_new_question():
    data = request.get_json()
    print(data)

    if not data or 'text' not in data:
        return jsonify({'message': "NO DATA Provided"}, 400)

        # Создание вопроса с указанием category_id
        question = Question(text=data['text'], category_id=data['category_id'])
        db.session.add(question)
        db.session.commit()

    return jsonify({"message": "NEW QUESTION ADDED", "question_id": question.id}), 201


@questions_bp.route('/update/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    question: Question = Question.query.get(question_id)

    if not question:
        return make_response(jsonify({"message": "NO QUESTION FOUND", }), 404)

    request_data = request.get_json()
    if 'text' in request_data:
        question.text = request_data['text']
        db.session.commit()
        return make_response(jsonify({"message": "FILE UPDATED", "NEW_TEXT": question.text}), 200)
    else:
        return make_response(jsonify({"message": "NO DATA PROVIDED"}), 204)


@questions_bp.route('delete/<int:id>', methods=['DELETE'])
def delete_question(id):
    """Удаление конкретного вопроса по его ID."""
    question = Question.query.get(id)
    if question is None:
        return jsonify({'message': "Вопрос с таким ID не найден"}), 404

    db.session.delete(question)
    db.session.commit()
    return jsonify({'message': f"Вопрос с ID {id} удален"}), 200



