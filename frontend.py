import streamlit as st
import pandas as pd
from datetime import datetime

# Initialize session state to store our data if it doesn't exist
if 'students' not in st.session_state:
    # Initialize with some test data
    st.session_state.students = [
        {
            "id": 1,
            "name": "John Doe",
            "age": 20,
            "grade": 85.5,
            "enrollment_date": "2024-01-15"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "age": 19,
            "grade": 92.0,
            "enrollment_date": "2024-01-16"
        }
    ]

st.set_page_config(page_title="Student Management System", page_icon="📚")
st.title("Student Management System")

# Sidebar for navigation
page = st.sidebar.selectbox("Choose a page", ["View Students", "Add Student", "Search Student", "Statistics"])

if page == "View Students":
    st.header("All Students")
    if st.session_state.students:
        df = pd.DataFrame(st.session_state.students)
        st.dataframe(df, use_container_width=True)
    else:
        st.info("No students found in the system.")

elif page == "Add Student":
    st.header("Add New Student")
    
    # Create input form
    with st.form("add_student_form"):
        student_id = st.number_input("Student ID", min_value=1, step=1)
        name = st.text_input("Name")
        age = st.number_input("Age", min_value=15, max_value=100, step=1)
        grade = st.number_input("Grade", min_value=0.0, max_value=100.0, step=0.1)
        enrollment_date = st.date_input("Enrollment Date")
        
        submit_button = st.form_submit_button("Add Student")
        
        if submit_button:
            # Check if ID already exists
            if any(s["id"] == student_id for s in st.session_state.students):
                st.error("Error: Student ID already exists!")
            elif not name:  # Check if name is empty
                st.error("Error: Name is required!")
            else:
                # Add new student
                new_student = {
                    "id": student_id,
                    "name": name,
                    "age": age,
                    "grade": grade,
                    "enrollment_date": enrollment_date.strftime("%Y-%m-%d")
                }
                st.session_state.students.append(new_student)
                st.success("Student added successfully!")
                # Clear form by rerunning
                st.rerun()

elif page == "Search Student":
    st.header("Search Student")
    
    search_method = st.radio("Search by:", ["ID", "Name"])
    
    if search_method == "ID":
        student_id = st.number_input("Enter Student ID", min_value=1, step=1)
        if st.button("Search by ID"):
            student = next((s for s in st.session_state.students if s["id"] == student_id), None)
            if student:
                st.write("Student Information:")
                st.json(student)
            else:
                st.error("Student not found.")
    else:
        search_name = st.text_input("Enter Student Name")
        if st.button("Search by Name"):
            matching_students = [s for s in st.session_state.students if search_name.lower() in s["name"].lower()]
            if matching_students:
                st.write(f"Found {len(matching_students)} matching students:")
                for student in matching_students:
                    st.json(student)
            else:
                st.error("No matching students found.")

elif page == "Statistics":
    st.header("Class Statistics")
    
    if st.session_state.students:
        df = pd.DataFrame(st.session_state.students)
        
        # Calculate statistics
        total_students = len(df)
        average_grade = df['grade'].mean()
        average_age = df['age'].mean()
        
        # Display metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Students", f"{total_students}")
        with col2:
            st.metric("Average Grade", f"{average_grade:.2f}")
        with col3:
            st.metric("Average Age", f"{average_age:.1f}")
        
        # Additional statistics
        st.subheader("Grade Distribution")
        fig_grade = df['grade'].hist()
        st.pyplot(fig_grade.figure)
        
        st.subheader("Age Distribution")
        fig_age = df['age'].hist()
        st.pyplot(fig_age.figure)
        
        # Show top performers
        st.subheader("Top 3 Students by Grade")
        top_students = df.nlargest(3, 'grade')[['name', 'grade']]
        st.table(top_students)
        
    else:
        st.info("No student data available for statistics.")