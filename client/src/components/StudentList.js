import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { fetchStudents, deleteStudent } from "../actions/studentActions";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background-image.jpg";
import { logout } from "../actions/authActions";
import ConfirmationDialog from "./ConfirmationDialog";

const MetaData = {
  admin: {
    title: "Admin Dashboard",
    path: "/dashboard/admin/"
  },
  staff: {
    title: "Staff Dashboard",
    path: "/dashboard/staff/"
  },
  librarian: {
    title: "Librarian Dashboard",
    path: "/dashboard/librarian/"
  },
  user: {
    title: "Dashboard",
    path: "/dashboard/"
  }
}

const StudentList = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >

      <nav className="w-full bg-blue-600/30 py-4 backdrop-blur-sm">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-bold text-white">{MetaData[role].title}</h1>
          <ul className="flex space-x-8 text-white font-semibold">
            <li>
              <button
                className="hover:text-gray-300 transition duration-300"
                onClick={() => navigate(MetaData[role].path)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-gray-300 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="px-4 py-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Student List</h2>
          {role !== "librarian" && <Link
            to="new"
            className="bg-green-500/80 backdrop-blur-sm text-white text-sm font-bold py-1 px-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add New Student
          </Link>}
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full rounded-lg">
            <thead className="bg-blue-600/30 backdrop-blur-sm text-white">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 backdrop-blur-sm">
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="py-3 px-4">{student._id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`${student._id}`}
                      className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      View
                    </Link>
                    {role !== "librarian" &&
                      <>
                        <Link
                          to={`update/${student._id}`}
                          className="text-yellow-500 hover:text-yellow-700 mx-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-red-500 hover:text-red-700 mx-2"
                        >
                          Delete
                        </button>
                      </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmationDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete this history?"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentList;
