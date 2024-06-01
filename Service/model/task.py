from pydantic import BaseModel, field_validator
from datetime import date
from typing import Optional


class Task(BaseModel):
    title: str
    description: Optional[str] = ""
    created_at: Optional[date] = None
    updated_at: Optional[date] = None

    @field_validator('title')
    def validate_name(cls, value):
        if len(value) == 0:
            raise ValueError('title should not be empty.')
        elif len(value) > 255:
            raise ValueError(
                'title should not exceed more than 255 character.')

        return value
