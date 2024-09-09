from pydantic import BaseModel, Field


# schemas/questions.py
class QuestionCreate(BaseModel):
    text: str = Field(..., min_length=2, max_length=500)
    category_id: int


class QuestionResponse(BaseModel):
    id: int
    text: str
    category_id: int

    class Config:
        from_attributes = True  # Включаем поддержку from_orm
