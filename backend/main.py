from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db, Base
from models import Employee, Project
from schemas import CreateEmployee, EmployeeResponse

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@app.post("/profile", response_model=EmployeeResponse)
def save_profile(employee_data: CreateEmployee, db: Session = Depends(get_db)):
 
    if not employee_data.project_ids:
        raise HTTPException(status_code=400, detail="At least one project must be selected")
 
    projects = db.query(Project).filter(Project.id.in_(employee_data.project_ids)).all()
 
    if len(projects) != len(employee_data.project_ids):
        raise HTTPException(status_code=400, detail="One or more project IDs are invalid")
 
    employee = db.query(Employee).filter(Employee.email == employee_data.email).first()
 
    if employee:
        employee.full_name = employee_data.full_name
        employee.experience_level = employee_data.experience_level
        employee.tech_stack = employee_data.tech_stack
        employee.project_duration = employee_data.project_duration
        employee.additional_skills = employee_data.additional_skills
        employee.projects = projects
    else:
        employee = Employee(
            full_name=employee_data.full_name,
            email=employee_data.email,
            experience_level=employee_data.experience_level,
            tech_stack=employee_data.tech_stack,
            project_duration=employee_data.project_duration,
            additional_skills=employee_data.additional_skills,
            projects=projects,
        )
        db.add(employee)
 
    db.commit()
    db.refresh(employee)
    return employee
 
 
@app.get("/profile/{email}", response_model=EmployeeResponse)
def get_profile(email: str, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.email == email).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee