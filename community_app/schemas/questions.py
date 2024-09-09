from pydantic import BaseModel, Field



class QuestionCreate(BaseModel):
   text: str= Field(..., min_length=15, max_length=500)

class QuestionResponse(BaseModel):
    id: int
    text : str




