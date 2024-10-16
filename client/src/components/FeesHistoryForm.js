import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../actions/studentActions";
import { addFeesHistory, updateFeesHistory, fetchFeesHistoryById } from "../actions/feesActions";
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

const FeesHistoryForm = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const { historyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState(null);
  const { students, loading: studentsLoading } = useSelector(state => state.student);
  const { singleHistory, loading: historyLoading, error } = useSelector((state) => state.fees);
  const isUpdateMode = !!historyId;

  useEffect(() => {
    dispatch(fetchStudents());
    if (isUpdateMode) {
      dispatch(fetchFeesHistoryById(historyId));
    }
  }, [dispatch, historyId, isUpdateMode]);

  const confirmProcess = () => {
    if (isUpdateMode) {
      dispatch(updateFeesHistory(historyId, confirmValues));
    } else {
      dispatch(addFeesHistory(confirmValues));
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
      amountPaid: isUpdateMode ? singleHistory?.amountPaid || "" : "",
      studentId: isUpdateMode ? singleHistory?.studentId?._id || "" : "",
      paymentDate: isUpdateMode ? singleHistory?.paymentDate?.split("T")[0] || "" : "",
      paymentMethod: isUpdateMode ? singleHistory?.paymentMethod || "" : "",
      feesStatus: isUpdateMode ? singleHistory?.feesStatus || "Pending" : "Pending",
      remarks: isUpdateMode ? singleHistory?.remarks || "" : "",
    },
    validationSchema: Yup.object({
      amountPaid: Yup.number().required("Required"),
      studentId: Yup.string().required("Required"),
      paymentDate: Yup.date().required("Required"),
      paymentMethod: Yup.string().required("Required"),
      feesStatus: Yup.string().required("Required"),
      remarks: Yup.string(),
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
              <label className="block text-gray-200 mb-2">Amount:</label>
              <input
                type="number"
                placeholder="Amount Paid:"
                {...formik.getFieldProps("amountPaid")}                
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.amountPaid && formik.errors.amountPaid ? (
                <div className="text-red-500 text-sm">{formik.errors.amountPaid}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Paid student:</label>
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
              <label className="block text-gray-200 mb-2">payment Date:</label>
              <input
                type="date"
                {...formik.getFieldProps("paymentDate")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.paymentDate && formik.errors.paymentDate ? (
                <div className="text-red-500 text-sm">{formik.errors.paymentDate}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">payment Method:</label>
              <select 
              {...formik.getFieldProps("paymentMethod")}
              className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                <div className="text-red-500 text-sm">{formik.errors.paymentMethod}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">fees Status:</label>
              <select 
              {...formik.getFieldProps("feesStatus")}
              className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
              {formik.touched.feesStatus && formik.errors.feesStatus ? (
                <div className="text-red-500 text-sm">{formik.errors.feesStatus}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Remarks:</label>
              <input
                type="text"
                placeholder="Any Remarks ?"
                {...formik.getFieldProps("remarks")}
                className="w-full border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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

export default FeesHistoryForm;
