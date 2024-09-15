from community_app.extensions import db  # Импорт из extensions

# category.py
class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    questions = db.relationship('Question', backref='category', lazy=True,
                                cascade="all, delete-orphan", passive_deletes=True)

    def __repr__(self):
        return f'Category: {self.name}'

    










