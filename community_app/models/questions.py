from __init__ import db


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(300), nullable=False)
    responses = db.relationship('Responses', backref='question', lazy='dynamic')

    def __str__(self):
        return self.text


class Statistik(db.Model):
    __tablename__ = 'statistik'
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), primary_key=True)
    agree_count = db.Column(db.Integer, nullable=False, default=0)
    disagree_count = db.Column(db.Integer, nullable=False, default=0)

    def __str__(self):
        return self.text


