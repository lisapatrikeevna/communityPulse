from community_app import db


class Response(db.Model):
    __tablename__ = 'responses'
    id = db.Column(db.Integer, primary_key=True)
    # text = db.Column(db.String(300), nullable=False)
    # responses = db.relationship('Responses', backref='questions', lazy='dynamic')
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    is_agree = db.Column(db.Boolean, nullable=False)   # True if agree, False if disagree
   
    def __repr__(self):
        return f'Statistic for Question {self.question_id}: {self.agree_count} agree, {self.disagree_count} disagree'
    # def __str__(self):
    #     return self.text


# class Statistik(db.Model):
#     __tablename__ = 'statistik'
#     question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), primary_key=True)
#     is_agree = db.Column(db.Integer, nullable=False, default=0)
#     disagree_count = db.Column(db.Integer, nullable=False, default=0)
#
#     def __str__(self):
#         return self.text


