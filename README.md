# Internal Project Manager

A web application for managing internal project assignments. 
Employees can register their profile, select projects they're interested in, 
and update their information if necessary.

## Tech Stack

**Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL  
**Frontend:** React, TypeScript, Axios

## Setup

### Database

Create a PostgreSQL database:

```bash
psql -U postgres -h localhost -c "CREATE DATABASE project_manager;"
```

To restore from the dump:

```bash
psql -U postgres -h localhost -d project_manager < dump.sql
```

### Backend

```bash
cd backend
python3 -m venv venv
Linux/Mac: source venv/bin/activate
Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Start the server:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Features

- Register an employee profile with experience level, tech stack, and project preferences
- Select one or more internal projects from a dynamically loaded list
- Returning users are automatically detected by email and their profile is pre-filled
- Profiles can be updated at any time
