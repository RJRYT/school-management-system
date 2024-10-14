import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, fetchStudentById } from "../actions/studentActions";
import { useParams } from "react-router-dom";

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { student:studentData, loading } = useSelector(state => state.student);
  const isUpdateMode = !!studentId;

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchStudentById(studentId));
    }
  }, [dispatch, studentId, isUpdateMode]);

  const formik = useFormik({
    initialValues: {
      name: studentData?.name || "",
      rollNumber: studentData?.rollNumber || "",
      class: studentData?.class || "",
      section: studentData?.section || "",
      dateOfBirth: studentData?.dateOfBirth.split("T")[0] || "",
      gender: studentData?.gender || "",
      address: {
        street: studentData?.address?.street || "",
        city: studentData?.address?.city || "", 
        state: studentData?.address?.state || "",
        postalCode: studentData?.address?.postalCode || "",
        country: studentData?.address?.country || "",
      },
      parentDetails: {
        fatherName: studentData?.parentDetails?.fatherName || "",
        motherName: studentData?.parentDetails?.motherName || "",
        contactNumber: studentData?.parentDetails?.contactNumber || "",
      },
      feesStatus: studentData?.feesStatus || "Pending",
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
    },
    enableReinitialize: true,
  });

  if (loading && isUpdateMode) {
    return <p>Loading...</p>;
  }

  if (!studentData && isUpdateMode) {
    return <p>Student not found.</p>;
  }
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label>Roll Number:</label>
        <input
          type="text"
          {...formik.getFieldProps("rollNumber")}
        />
        {formik.touched.rollNumber && formik.errors.rollNumber ? (
          <div>{formik.errors.rollNumber}</div>
        ) : null}
      </div>

      <div>
        <label>Class:</label>
        <input
          type="text"
          {...formik.getFieldProps("class")}
        />
        {formik.touched.class && formik.errors.class ? (
          <div>{formik.errors.class}</div>
        ) : null}
      </div>

      <div>
        <label>Section:</label>
        <input
          type="text"
          {...formik.getFieldProps("section")}
        />
        {formik.touched.section && formik.errors.section ? (
          <div>{formik.errors.section}</div>
        ) : null}
      </div>

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          {...formik.getFieldProps("dateOfBirth")}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <div>{formik.errors.dateOfBirth}</div>
        ) : null}
      </div>

      <div>
        <label>Gender:</label>
        <select {...formik.getFieldProps("gender")}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div>{formik.errors.gender}</div>
        ) : null}
      </div>

      <h3>Address:</h3>
      <div>
        <label>Street:</label>
        <input
          type="text"
          {...formik.getFieldProps("address.street")}
        />
        {formik.touched.address?.street && formik.errors.address?.street ? (
          <div>{formik.errors.address.street}</div>
        ) : null}
      </div>

      <div>
        <label>City:</label>
        <input
          type="text"
          {...formik.getFieldProps("address.city")}
        />
        {formik.touched.address?.city && formik.errors.address?.city ? (
          <div>{formik.errors.address.city}</div>
        ) : null}
      </div>

      <div>
        <label>State:</label>
        <input
          type="text"
          {...formik.getFieldProps("address.state")}
        />
        {formik.touched.address?.state && formik.errors.address?.state ? (
          <div>{formik.errors.address.state}</div>
        ) : null}
      </div>

      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          {...formik.getFieldProps("address.postalCode")}
        />
        {formik.touched.address?.postalCode && formik.errors.address?.postalCode ? (
          <div>{formik.errors.address.postalCode}</div>
        ) : null}
      </div>

      <div>
        <label>Country:</label>
        <input
          type="text"
          {...formik.getFieldProps("address.country")}
        />
        {formik.touched.address?.country && formik.errors.address?.country ? (
          <div>{formik.errors.address.country}</div>
        ) : null}
      </div>

      <h3>Parent Details:</h3>
      <div>
        <label>Father's Name:</label>
        <input
          type="text"
          {...formik.getFieldProps("parentDetails.fatherName")}
        />
        {formik.touched.parentDetails?.fatherName && formik.errors.parentDetails?.fatherName ? (
          <div>{formik.errors.parentDetails.fatherName}</div>
        ) : null}
      </div>

      <div>
        <label>Mother's Name:</label>
        <input
          type="text"
          {...formik.getFieldProps("parentDetails.motherName")}
        />
        {formik.touched.parentDetails?.motherName && formik.errors.parentDetails?.motherName ? (
          <div>{formik.errors.parentDetails.motherName}</div>
        ) : null}
      </div>

      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          {...formik.getFieldProps("parentDetails.contactNumber")}
        />
        {formik.touched.parentDetails?.contactNumber && formik.errors.parentDetails?.contactNumber ? (
          <div>{formik.errors.parentDetails.contactNumber}</div>
        ) : null}
      </div>
      {isUpdateMode &&
        <>
          <h3>Fees Status:</h3>
          <div>
            <label>Fees Status:</label>
            <select {...formik.getFieldProps("feesStatus")}>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
            </select>
            {formik.touched.feesStatus && formik.errors.feesStatus ? (
              <div>{formik.errors.feesStatus}</div>
            ) : null}
          </div>
        </>
      }

      <button type="submit">{isUpdateMode ? "Update Student" : "Add Student"}</button>
    </form>
  );
};

export default AddStudentForm;
