import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../actions/studentActions";
import { addLibraryHistory, updateLibraryHistory, fetchLibraryHistoryById } from "../actions/libraryActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import backgroundImage from "../assets/background-image.jpg";
import { logout } from "../actions/authActions";
import InfoDialogBox from "./InfoDialogBox";
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

const LibraryHistoryForm = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const { historyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState(null);
  const { students, loading: studentsLoading } = useSelector(state => state.student);
  const { singleHistory, loading: historyLoading, error } = useSelector((state) => state.library);
  const isUpdateMode = !!historyId;

  useEffect(() => {
    dispatch(fetchStudents());
    if (isUpdateMode) {
      dispatch(fetchLibraryHistoryById(historyId));
    }
  }, [dispatch, historyId, isUpdateMode]);

  const confirmProcess = () => {
    if (isUpdateMode) {
      dispatch(updateLibraryHistory(historyId, confirmValues));
    } else {
      dispatch(addLibraryHistory(confirmValues));
    }
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/\/update\/[^/]+|\/new$/, "");
    navigate(newPath);
    setDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      bookTitle: isUpdateMode ? singleHistory?.bookTitle || "" : "",
      studentId: isUpdateMode ? singleHistory?.studentId?._id || "" : "",
      issueDate: isUpdateMode ? singleHistory?.issueDate?.split("T")[0] || "" : "",
      returnDate: isUpdateMode ? singleHistory?.returnDate?.split("T")[0] || "" : "",
      isReturned: isUpdateMode ? singleHistory?.isReturned || false : false,
    },
    validationSchema: Yup.object({
      bookTitle: Yup.string().required("Required"),
      studentId: Yup.string().required("Required"),
      issueDate: Yup.date().required("Required"),
      returnDate: Yup.date().required("Required"),
      isReturned: Yup.boolean(),
    }),
    onSubmit: (values) => {
      setConfirmValues(values);
      setDialogOpen(true)
    },
    enableReinitialize: true,
  });

  if (error) {
    return <InfoDialogBox title="Error" text={error} />;
  }

  if (historyLoading && isUpdateMode) {
    return <InfoDialogBox title="Loading" text="We are processing your request." />;
  }

  if (studentsLoading && isUpdateMode) {
    return <InfoDialogBox title="Loading students list" text="We are processing your request." />;
  }

  if (!singleHistory && isUpdateMode) {
    return <InfoDialogBox title="Record not Found" text="Record id provided is not found in our records." />;
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
            {isUpdateMode ? "Update Record" : "Add New Record"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Book name:</label>
              <input
                type="text"
                placeholder="Book Name:"
                {...formik.getFieldProps("bookTitle")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.bookTitle && formik.errors.bookTitle ? (
                <div className="text-red-500 text-sm">{formik.errors.bookTitle}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Borrow student:</label>
              <select
                {...formik.getFieldProps("studentId")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a student</option>
                {students && students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
              {formik.touched.studentId && formik.errors.studentId ? (
                <div className="text-red-500 text-sm">{formik.errors.studentId}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">issue Date:</label>
              <input
                type="date"
                {...formik.getFieldProps("issueDate")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.issueDate && formik.errors.issueDate ? (
                <div className="text-red-500 text-sm">{formik.errors.issueDate}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">return Date:</label>
              <input
                type="date"
                {...formik.getFieldProps("returnDate")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.returnDate && formik.errors.returnDate ? (
                <div className="text-red-500 text-sm">{formik.errors.returnDate}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  {...formik.getFieldProps("isReturned")}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
                <span className="ml-2">Is returned</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
            >
              {isUpdateMode ? "Update Record" : "Add Record"}
            </button>
          </form>
          <ConfirmationDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={confirmProcess}
            message={`Are you sure you want to ${isUpdateMode ? "Update" : "Add"} this Record?`}
          />
        </div>
      </div>
    </div>
  );
};

export default LibraryHistoryForm;
