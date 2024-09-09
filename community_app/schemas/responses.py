from pydantic import BaseModel, Field

class ResponseCreate(BaseModel):
    question_id: int = Field(..., description="You need to provide ID")
    is_agree: bool = Field(..., description= "If you agree, write true, If you  disagree write false")


class StatisticResponse(BaseModel):
    question_id: int
    agree_count : int
    disagree_count : int

    class Config:
        from_attributes = True
    





