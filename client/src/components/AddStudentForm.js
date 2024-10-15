import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, fetchStudentById } from "../actions/studentActions";
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

const AddStudentForm = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { student: studentData, loading } = useSelector(state => state.student);
  const isUpdateMode = !!studentId;

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchStudentById(studentId));
    }
  }, [dispatch, studentId, isUpdateMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      name: isUpdateMode ? studentData?.name || "" : "",
      rollNumber: isUpdateMode ? studentData?.rollNumber || "" : "",
      class: isUpdateMode ? studentData?.class || "" : "",
      section: isUpdateMode ? studentData?.section || "" : "",
      dateOfBirth: isUpdateMode ? studentData?.dateOfBirth?.split("T")[0] || "" : "",
      gender: isUpdateMode ? studentData?.gender || "" : "",
      address: {
        street: isUpdateMode ? studentData?.address?.street || "" : "",
        city: isUpdateMode ? studentData?.address?.city || "" : "",
        state: isUpdateMode ? studentData?.address?.state || "" : "",
        postalCode: isUpdateMode ? studentData?.address?.postalCode || "" : "",
        country: isUpdateMode ? studentData?.address?.country || "" : "",
      },
      parentDetails: {
        fatherName: isUpdateMode ? studentData?.parentDetails?.fatherName || "" : "",
        motherName: isUpdateMode ? studentData?.parentDetails?.motherName || "" : "",
        contactNumber: isUpdateMode ? studentData?.parentDetails?.contactNumber || "" : "",
      },
      feesStatus: isUpdateMode ? studentData?.feesStatus || "Pending" : "Pending",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      rollNumber: Yup.string().required("Required"),
      class: Yup.string().required("Required"),
      section: Yup.string().required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
      address: Yup.object({
        street: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        postalCode: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
      }),
      parentDetails: Yup.object({
        fatherName: Yup.string().required("Required"),
        motherName: Yup.string().required("Required"),
        contactNumber: Yup.string().required("Required"),
      }),
      feesStatus: Yup.string().oneOf(["Paid", "Pending", "Partial"]).required("Required"),
    }),
    onSubmit: (values) => {
      if (isUpdateMode) {
        dispatch(updateStudent(studentId, values));
      } else {
        dispatch(addStudent(values));
      }
      const currentPath = location.pathname;
      const newPath = currentPath.replace(/\/update\/[^/]+|\/new$/, "");
      navigate(newPath);
    },
    enableReinitialize: true,
  });

  if (loading && isUpdateMode) {
    return <InfoDialogBox title="Loading" text="We are processing your request." />;
  }

  if (!studentData && isUpdateMode) {
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
            {isUpdateMode ? "Update Student" : "Add New Student"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-4">
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  {...formik.getFieldProps("name")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Roll Number:</label>
                <input
                  type="number"
                  placeholder="Roll number"
                  {...formik.getFieldProps("rollNumber")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.rollNumber && formik.errors.rollNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.rollNumber}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Class:</label>
                <input
                  type="text"
                  placeholder="Class"
                  {...formik.getFieldProps("class")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.class && formik.errors.class ? (
                  <div className="text-red-500 text-sm">{formik.errors.class}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Section:</label>
                <input
                  type="text"
                  placeholder="Section"
                  {...formik.getFieldProps("section")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.section && formik.errors.section ? (
                  <div className="text-red-500 text-sm">{formik.errors.section}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Date of Birth:</label>
                <input
                  type="date"
                  {...formik.getFieldProps("dateOfBirth")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div className="text-red-500 text-sm">{formik.errors.dateOfBirth}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Gender:</label>
                <select
                  {...formik.getFieldProps("gender")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                ) : null}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-200 mb-4">Address</h3>
            <div className="grid grid-cols-2 gap-6 mb-4">

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Street:</label>
                <input
                  type="text"
                  placeholder="Street name"
                  {...formik.getFieldProps("address.street")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.address?.street && formik.errors.address?.street ? (
                  <div className="text-red-500 text-sm">{formik.errors.address.street}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">City:</label>
                <input
                  type="text"
                  placeholder="City"
                  {...formik.getFieldProps("address.city")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.address?.city && formik.errors.address?.city ? (
                  <div className="text-red-500 text-sm">{formik.errors.address.city}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">State:</label>
                <input
                  type="text"
                  placeholder="State"
                  {...formik.getFieldProps("address.state")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.address?.state && formik.errors.address?.state ? (
                  <div className="text-red-500 text-sm">{formik.errors.address.state}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Postal Code:</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  {...formik.getFieldProps("address.postalCode")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.address?.postalCode && formik.errors.address?.postalCode ? (
                  <div className="text-red-500 text-sm">{formik.errors.address.postalCode}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Country:</label>
                <input
                  type="text"
                  placeholder="Country"
                  {...formik.getFieldProps("address.country")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.address?.country && formik.errors.address?.country ? (
                  <div className="text-red-500 text-sm">{formik.errors.address.country}</div>
                ) : null}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-200 mb-4">Parent Details</h3>
            <div className="grid grid-cols-2 gap-6 mb-4">

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Father Name:</label>
                <input
                  type="text"
                  placeholder="Father name"
                  {...formik.getFieldProps("parentDetails.fatherName")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.parentDetails?.fatherName && formik.errors.parentDetails?.fatherName ? (
                  <div className="text-red-500 text-sm">{formik.errors.parentDetails.fatherName}</div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-200 mb-2">Mother Name:</label>
                <input
                  type="text"
                  placeholder="Mother name"
                  {...formik.getFieldProps("parentDetails.motherName")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.parentDetails?.motherName && formik.errors.parentDetails?.motherName ? (
                  <div className="text-red-500 text-sm">{formik.errors.parentDetails.motherName}</div>
                ) : null}
              </div>

              <div className="col-span-2">
                <label className="block text-gray-200 mb-2">Contact Number:</label>
                <input
                  type="text"
                  placeholder="Contact number"
                  {...formik.getFieldProps("parentDetails.contactNumber")}
                  className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formik.touched.parentDetails?.contactNumber && formik.errors.parentDetails?.contactNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.parentDetails.contactNumber}</div>
                ) : null}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Fees Status:</label>
              <select
                {...formik.getFieldProps("feesStatus")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
              </select>
              {formik.touched.feesStatus && formik.errors.feesStatus ? (
                <div className="text-red-500 text-sm">{formik.errors.feesStatus}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
            >
              {isUpdateMode ? "Update Student" : "Add Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
