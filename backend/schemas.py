from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List

class CreateEmployee(BaseModel):
    full_name: str
    email: EmailStr # use EmailStr because its good for email validation
    experience_level: str
    tech_stack: str
    project_duration: str
    additional_skills: Optional[str] = None
    project_ids: List[int]
    
class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    name: str
    
class EmployeeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)   
    
    id: int
    full_name: str
    email: EmailStr
    experience_level: str
    tech_stack: str
    project_duration: str
    additional_skills: Optional[str] = None
    projects: List[ProjectResponse] = []

