import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../actions/studentActions";
import { addLibraryHistory, updateLibraryHistory, fetchLibraryHistoryById } from "../actions/libraryActions";
import { useParams } from "react-router-dom";

const LibraryHistoryForm = () => {
  const dispatch = useDispatch();
  const { historyId } = useParams();
  const { students, loading:studentsLoading } = useSelector(state => state.student);
  const { singleHistory, loading:historyLoading, error } = useSelector((state) => state.library);
  const isUpdateMode = !!historyId;

  useEffect(() => {
    dispatch(fetchStudents());
    if (isUpdateMode) {
      dispatch(fetchLibraryHistoryById(historyId));
    }
  }, [dispatch, historyId, isUpdateMode]);

  const formik = useFormik({
    initialValues: {
        bookTitle: singleHistory?.bookTitle || "",
        studentId: singleHistory?.studentId?._id || "",
        issueDate: singleHistory?.issueDate?.split("T")[0] || "",
        returnDate: singleHistory?.returnDate?.split("T")[0] || "",
        isReturned: singleHistory?.isReturned || false,
    },
    validationSchema: Yup.object({
        bookTitle: Yup.string().required("Required"),
        studentId: Yup.string().required("Required"),
        issueDate: Yup.date().required("Required"),
        returnDate: Yup.date().required("Required"),
        isReturned: Yup.boolean(),
    }),
    onSubmit: (values) => {
      if (isUpdateMode) {
        dispatch(updateLibraryHistory(historyId, values));
      } else {
        dispatch(addLibraryHistory(values));
      }
    },
    enableReinitialize: true,
  });

  if(error) {
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
        <label>Book name:</label>
        <input
          type="text"
          {...formik.getFieldProps("bookTitle")}
        />
        {formik.touched.bookTitle && formik.errors.bookTitle ? (
          <div>{formik.errors.bookTitle}</div>
        ) : null}
      </div>

      <div>
        <label>Borrow student:</label>
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
        <label>issue Date:</label>
        <input
          type="date"
          {...formik.getFieldProps("issueDate")}
        />
        {formik.touched.issueDate && formik.errors.issueDate ? (
          <div>{formik.errors.issueDate}</div>
        ) : null}
      </div>

      <div>
        <label>return Date:</label>
        <input
          type="date"
          {...formik.getFieldProps("returnDate")}
        />
        {formik.touched.returnDate && formik.errors.returnDate ? (
          <div>{formik.errors.returnDate}</div>
        ) : null}
      </div>

      <div>
        <label>Is returned:</label>
        <input
          type="checkbox"
          {...formik.getFieldProps("isReturned")}
        />
      </div>

      <button type="submit">{isUpdateMode ? "Update Record" : "Add Record"}</button>
    </form>
  );
};

export default LibraryHistoryForm;
