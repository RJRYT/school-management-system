import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../actions/studentActions";
import { addFeesHistory, updateFeesHistory, fetchFeesHistoryById } from "../actions/feesActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const FeesHistoryForm = () => {
  const dispatch = useDispatch();
  const { historyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { students, loading: studentsLoading } = useSelector(state => state.student);
  const { singleHistory, loading: historyLoading, error } = useSelector((state) => state.fees);
  const isUpdateMode = !!historyId;

  useEffect(() => {
    dispatch(fetchStudents());
    if (isUpdateMode) {
      dispatch(fetchFeesHistoryById(historyId));
    }
  }, [dispatch, historyId, isUpdateMode]);

  const formik = useFormik({
    initialValues: {
      amountPaid: singleHistory?.amountPaid || "",
      studentId: singleHistory?.studentId?._id || "",
      paymentDate: singleHistory?.paymentDate?.split("T")[0] || "",
      paymentMethod: singleHistory?.paymentMethod || "",
      feesStatus: singleHistory?.feesStatus || "Pending",
      remarks: singleHistory?.remarks || "",
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
      if (isUpdateMode) {
        dispatch(updateFeesHistory(historyId, values));
      } else {
        dispatch(addFeesHistory(values));
      }
      const currentPath = location.pathname;
      const newPath = currentPath.replace(/\/update\/[^/]+|\/new$/, "");
      navigate(newPath);
    },
    enableReinitialize: true,
  });

  if (error) {
    return <p>{error}</p>;
  }

  if (historyLoading && isUpdateMode) {
    return <p>Loading...</p>;
  }

  if (studentsLoading && isUpdateMode) {
    return <p>Student list Loading...</p>;
  }

  if (!singleHistory && isUpdateMode) {
    return <p>history not found.</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          {...formik.getFieldProps("amountPaid")}
        />
        {formik.touched.amountPaid && formik.errors.amountPaid ? (
          <div>{formik.errors.amountPaid}</div>
        ) : null}
      </div>

      <div>
        <label>Paid student:</label>
        <select {...formik.getFieldProps("studentId")}>
          <option value="">Select a student</option>
          {students && students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        {formik.touched.studentId && formik.errors.studentId ? (
          <div>{formik.errors.studentId}</div>
        ) : null}
      </div>

      <div>
        <label>payment Date:</label>
        <input
          type="date"
          {...formik.getFieldProps("paymentDate")}
        />
        {formik.touched.paymentDate && formik.errors.paymentDate ? (
          <div>{formik.errors.paymentDate}</div>
        ) : null}
      </div>

      <div>
        <label>payment Method:</label>
        <select {...formik.getFieldProps("paymentMethod")}>
          <option value="">Select</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Other">Other</option>
        </select>
        {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
          <div>{formik.errors.paymentMethod}</div>
        ) : null}
      </div>

      <div>
        <label>fees Status:</label>
        <select {...formik.getFieldProps("feesStatus")}>
          <option value="">Select</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Partial">Partial</option>
        </select>
        {formik.touched.feesStatus && formik.errors.feesStatus ? (
          <div>{formik.errors.feesStatus}</div>
        ) : null}
      </div>

      <div>
        <label>Remarks:</label>
        <input
          type="text"
          {...formik.getFieldProps("remarks")}
        />
      </div>

      <button type="submit">{isUpdateMode ? "Update Record" : "Add Record"}</button>
    </form>
  );
};

export default FeesHistoryForm;
