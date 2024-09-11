from pydantic import BaseModel  ,Field


# schemas/category.py
class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)

class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True





