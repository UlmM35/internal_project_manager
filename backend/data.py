from database import SessionLocal, engine, Base
from models import Project

Base.metadata.create_all(bind=engine)

# project options
projects = [
    "Customer Portal Redesign",
    "Data Pipeline Migration",
    "Mobile App Enhancement",
    "Internal Analytics Dashboard",
    "API Gateway Implementation",
    "Cloud Infrastructure Setup",
    "E-commerce Platform Update",
    "Reporting System Automation",
    "Microservices Architecture Transition",
    "Customer Data Platform Integration",
]

def load_projects():
    db = SessionLocal()
    try:
        existing_projects = db.query(Project).count()
        if existing_projects > 0:
            print("Projects are already in db, skipping")
            return
        
        for project in projects:
            project = Project(name=project)
            db.add(project)
            
        db.commit()
        print(f"Added projects")
    except Exception as e:
        db.rollback()
        print(f"Error inserting projects into db: {e}")
    finally:
        db.close()
        
        
if __name__ == "__main__":
    load_projects()