from datetime import datetime
from community_app.extensions import db  # Импорт из extensions


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(300), nullable=False)
    # responses = db.relationship('Response', backref='question', lazy=True, cascade="all, delete")
    responses = db.relationship('Response', backref='question', lazy=True, cascade="all, delete-orphan")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id', ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return f'Question: {self.text}'


class Statistik(db.Model):
    __tablename__ = 'statistik'
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id', ondelete="CASCADE"), primary_key=True)
    agree_count = db.Column(db.Integer, nullable=False, default=0)
    disagree_count = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return '<Statistic for Question %r: %r agree, %r disagree>' % (self.question_id, self.agree_count, self.disagree_count)






