import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudentById } from "../actions/studentActions";
import InfoDialogBox from "./InfoDialogBox";

const StudentView = () => {
  const { studentId } = useParams(); 
  const dispatch = useDispatch();

  const { student, loading } = useSelector((state) => state.student); 

  useEffect(() => {
    dispatch(fetchStudentById(studentId));
  }, [dispatch, studentId]);

  if (loading) {
    return <InfoDialogBox title="Loading" text="We are processing your request." />;
  }

  if (!student) {
    return <InfoDialogBox title="Student not Found" text="Student id provided is not found in our records." />;
  }

  return (
    <div className="student-view">
      <h2>Student Details</h2>
      <div className="student-info">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Section:</strong> {student.section}</p>
        <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {student.gender}</p>

        <h3>Address</h3>
        <p><strong>Street:</strong> {student.address.street}</p>
        <p><strong>City:</strong> {student.address.city}</p>
        <p><strong>State:</strong> {student.address.state}</p>
        <p><strong>Postal Code:</strong> {student.address.postalCode}</p>
        <p><strong>Country:</strong> {student.address.country}</p>

        <h3>Parent Details</h3>
        <p><strong>Father's Name:</strong> {student.parentDetails.fatherName}</p>
        <p><strong>Mother's Name:</strong> {student.parentDetails.motherName}</p>
        <p><strong>Contact Number:</strong> {student.parentDetails.contactNumber}</p>

        <p><strong>Fees Status:</strong> {student.feesStatus}</p>
      </div>
    </div>
  );
};

export default StudentView;
