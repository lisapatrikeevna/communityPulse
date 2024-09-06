from community_app.extensions import db  # Импорт из extensions


class Response(db.Model):
    __tablename__ = 'responses'
    id = db.Column(db.Integer, primary_key=True)
    # text = db.Column(db.String(300), nullable=False)
    # responses = db.relationship('Responses', backref='questions', lazy='dynamic')
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    is_agree = db.Column(db.Boolean, nullable=False)   # True if agree, False if disagree
   
    # def __repr__(self):
    #     return f'Statistic for Question {self.question_id}: {self.agree_count} agree, {self.disagree_count} disagree'
    def __str__(self):
        return self.text





