from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base


employee_projects = Table(
    "employee_projects",
    Base.metadata,
    Column("employee_id", Integer, ForeignKey("employees.id"), primary_key=True),
    Column("project_id", Integer, ForeignKey("projects.id"), primary_key=True),
)
 
 
class Employee(Base):
    __tablename__ = "employees"
 
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    experience_level = Column(String, nullable=False)  
    tech_stack = Column(String, nullable=False)        
    project_duration = Column(String, nullable=False) 
    additional_skills = Column(String, nullable=True)
 
    projects = relationship("Project", secondary=employee_projects, back_populates="employees")
 
 
class Project(Base):
    __tablename__ = "projects"
 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
 
    employees = relationship("Employee", secondary=employee_projects, back_populates="projects")
 