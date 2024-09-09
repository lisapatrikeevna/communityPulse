from flask import Blueprint
from community_app.extensions import db  # Импорт из extensions
from community_app.models.category import Category  # Импортируем модель категории
from flask import jsonify, request, make_response, Blueprint
# routes/category.py
category_bp = Blueprint('category', __name__, url_prefix='/api/category')


@category_bp.route('/', methods=['GET'])  # url/category
def get_all_categories():
    # return "get all category"
    categories = Category.query.all()  # Получаем все категории
    return jsonify([{"id": category.id, "name": category.name} for category in categories]), 200



@category_bp.route('/add', methods=['POST'])
def add_new_category():
    # return "add new category"
    data = request.get_json()  # Получаем данные из запроса
    if not data or 'name' not in data:
        return jsonify({"message": "Category name is required"}), 400

        # Проверяем, нет ли категории с таким именем
    if Category.query.filter_by(name=data['name']).first():
        return jsonify({"message": "Category already exists"}), 400
    
        # Создаем новую категорию
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()

    return jsonify({"message": "New category added", "category_id": new_category.id}), 201


@category_bp.route('delete/<int:id>', methods=['DELETE'])
def delete_category(id):
    """Удаление конкретного вопроса по его ID."""
    category = Category.query.get(id)
    if category is None:
        return jsonify({'message': "Вопрос с таким ID не найден"}), 404

    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': f"Вопрос с ID {id} удален"}), 200










