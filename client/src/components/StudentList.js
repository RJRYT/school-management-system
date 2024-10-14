import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../actions/studentActions";
import { Link } from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteStudent(studentToDelete));
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>
                <Link to={`${student._id}`}>View</Link>
                <Link to={`update/${student._id}`}>Edit</Link>
                <button onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
};

export default StudentList;
