from flask import Blueprint

# routes/category.py
category_bp = Blueprint('category', __name__, url_prefix='/category')


@category_bp.route('/', methods=['GET'])  # url/category
def get_all_categories():
    return "get all category"


@category_bp.route('/add', methods=['POST'])
def add_new_category():
    return "add new category"
