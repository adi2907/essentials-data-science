from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
from datetime import datetime

# Define the data model
class Student(BaseModel):
    id: int
    name: str
    age: int
    grade: float
    enrollment_date: str

# Initialize with some test data
students = [
    Student(
        id=1,
        name="John Doe",
        age=20,
        grade=85.5,
        enrollment_date="2024-01-15"
    ),
    Student(
        id=2,
        name="Jane Smith",
        age=19,
        grade=92.0,
        enrollment_date="2024-01-16"
    )
]


# Initialize FastAPI app
app = FastAPI(title="Student Management System")



@app.get("/")
def read_root():
    return {"message": "Welcome to Student Management System API"}

@app.get("/students/", response_model=List[Student])
def get_all_students():
    return students

@app.get("/students/{student_id}")
def get_student(student_id: int):
    student = next((s for s in students if s.id == student_id), None)
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@app.post("/students/", response_model=Student)
def add_student(student: Student):
    # Check if student ID already exists
    if any(s.id == student.id for s in students):
        raise HTTPException(status_code=400, detail="Student ID already exists")
    students.append(student)
    return student

@app.get("/statistics/")
def get_statistics():
    if not students:
        return {
            "average_grade": 0,
            "total_students": 0,
            "average_age": 0
        }
    
    return {
        "average_grade": sum(s.grade for s in students) / len(students),
        "total_students": len(students),
        "average_age": sum(s.age for s in students) / len(students)
    }

if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)
