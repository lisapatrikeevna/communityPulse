from flask import Blueprint, jsonify, request, make_response

from community_app import db
from community_app.models.questions import Question

# routes/questions.py
questions_bp = Blueprint('questions', __name__, url_prefix='/api/questions')


@questions_bp.route('/', methods=['GET'])  # url/questions
def get_all_questions():
    questions: list[Question] = Question.query.all()

    questions_data: list[dict] = [{"id": question.id, "text": question.text, "created_at": question.created_at} for question in questions]

    return jsonify(questions)


@questions_bp.route('/add', methods=['POST'])
def add_new_question():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({'message': "NO DATA Provided"}, 400)
        question: Questions = Questions(text=data['text'])

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
