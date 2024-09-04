from community_app import db

# category.py
class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(55), unique=True, nullable=False)

    def __repr__(self):
        return f'Category: {self.name}'

    










