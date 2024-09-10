from flask import jsonify, request, make_response, Blueprint
from pydantic import ValidationError

from community_app.extensions import db  # Импорт из extensions
from community_app.models.questions import Question
from community_app.schemas.questions import QuestionCreate, QuestionResponse

# routes/questions.py
questions_bp = Blueprint('questions', __name__, url_prefix='/api/questions')


@questions_bp.route('/', methods=['GET'])  # url/questions
def get_all_questions():
    questions: list[Question] = Question.query.all()

    result = [QuestionResponse.from_orm(question).dict() for question in questions]
    response = make_response(jsonify(result), 200)
    # response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@questions_bp.route('/add', methods=['POST'])
def add_new_question():
    data = request.get_json()
    print(data)

    # if not data or 'text' not in data:
    #     return jsonify({'message': "NO DATA Provided"}, 400)
    #
    #     # Создание вопроса с указанием category_id
    #     question = Question(text=data['text'], category_id=data['category_id'])
    #     db.session.add(question)
    #     db.session.commit()
    #
    # return jsonify({"message": "NEW QUESTION ADDED", "question_id": question.id}), 201
    try:
        question_data = QuestionCreate(**data)
    except ValidationError as err:
        return make_response(jsonify(err.errors()), 400)
    question: Question = Question(text=question_data.text, category_id=question_data.category_id)
    # question: Question = Question(text=question_data.text, category_id=question_data.category_id, created_at=question_data.created_at  )
    db.session.add(question)
    db.session.commit()

    # Преобразуем объект Pydantic в словарь перед сериализацией
    return make_response(jsonify(QuestionResponse(id=question.id, text=question.text, category_id=question_data.category_id).model_dump()), 201)  # return make_response(jsonify(QuestionResponse(id=question.id, text=question.text.dict() ), 201))


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
    print(id)
    """Удаление конкретного вопроса по его ID."""
    question = Question.query.get(id)
    print("question ", question)
    if question is None:
        print("if question ", question)
        return jsonify({'message': "Вопрос с таким ID не найден"}), 404


    db.session.delete(question)
    db.session.commit()
    return make_response(jsonify({'message': f"Вопрос с ID {id} удален"}), 200)
