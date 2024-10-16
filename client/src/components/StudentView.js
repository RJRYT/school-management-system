import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentById } from "../actions/studentActions";
import InfoDialogBox from "./InfoDialogBox";
import { FaSignOutAlt } from "react-icons/fa";
import backgroundImage from "../assets/background-image.jpg";
import { logout } from "../actions/authActions";

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

const StudentView = ({ role = "user" }) => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentById(studentId));
  }, [dispatch, studentId]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return <InfoDialogBox title="Loading" text="We are processing your request." />;
  }

  if (!student) {
    return <InfoDialogBox title="Student not Found" text="Student id provided is not found in our records." />;
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

      <div className="flex items-center justify-center p-4">
        <div className="backdrop-blur-sm bg-[#8a88af4d] border border-[#3831bd4d] p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Student details: {student.name}
          </h2>

          <div className="space-y-4 text-gray-200">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Class:</strong> {student.class}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {student.gender}</p>

            <h3 className="text-lg font-semibold mt-4 underline">Address</h3>
            <p><strong>Street:</strong> {student.address.street}</p>
            <p><strong>City:</strong> {student.address.city}</p>
            <p><strong>State:</strong> {student.address.state}</p>
            <p><strong>Postal Code:</strong> {student.address.postalCode}</p>
            <p><strong>Country:</strong> {student.address.country}</p>

            <h3 className="text-lg font-semibold mt-4 underline">Parent Details</h3>
            <p><strong>Father's Name:</strong> {student.parentDetails.fatherName}</p>
            <p><strong>Mother's Name:</strong> {student.parentDetails.motherName}</p>
            <p><strong>Contact Number:</strong> {student.parentDetails.contactNumber}</p>

            <p><strong>Fees Status:</strong> {student.feesStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
