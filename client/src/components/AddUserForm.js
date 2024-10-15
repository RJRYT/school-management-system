import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, fetchUserById } from "../actions/userActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import backgroundImage from "../assets/background-image.jpg";
import { logout } from "../actions/authActions";
import InfoDialogBox from "./InfoDialogBox";

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

const AddUserForm = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedUser, loading, error } = useSelector((state) => state.user);
  const isUpdateMode = !!userId;

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId, isUpdateMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      name: isUpdateMode ? selectedUser?.name || "" : "",
      email: isUpdateMode ? selectedUser?.email || "" : "",
      role: isUpdateMode ? selectedUser?.role || "" : "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (isUpdateMode) {
        dispatch(updateUser(userId, values));
      } else {
        dispatch(addUser(values));
      }
      const currentPath = location.pathname;
      const newPath = currentPath.replace(/\/update\/[^/]+|\/new$/, "");
      navigate(newPath);
    },
    enableReinitialize: true,
  });

  if (error) {
    return <InfoDialogBox title="Error" text={error} />;
  }

  if (loading && isUpdateMode) {
    return <InfoDialogBox title="Loading" text="We are processing your request." />;
  }

  if (!selectedUser && isUpdateMode) {
    return <InfoDialogBox title="User not Found" text="User id provided is not found in our records." />;
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
            {isUpdateMode ? "Update User" : "Add New User"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                placeholder="User Name:"
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Email Address:"
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Password:</label>
              <input
                type="password"
                placeholder="Password:"
                {...formik.getFieldProps("password")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Role:</label>
              <select
                {...formik.getFieldProps("role")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="OfficeStaff">OfficeStaff</option>
                <option value="Librarian">Librarian</option>
              </select>
              {formik.touched.role && formik.errors.role ? (
                <div className="text-red-500 text-sm">{formik.errors.role}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
            >
              {isUpdateMode ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
