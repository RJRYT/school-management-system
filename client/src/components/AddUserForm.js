import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, fetchUserById } from "../actions/userActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const AddUserForm = () => {
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

  const formik = useFormik({
    initialValues: {
      name: selectedUser?.name || "",
      email: selectedUser?.email || "",
      role: selectedUser?.role || "",
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
    return <p>{error}</p>;
  }

  if (loading && isUpdateMode) {
    return <p>Loading...</p>;
  }

  if (!selectedUser && isUpdateMode) {
    return <p>user not found.</p>;
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
        <label>Email:</label>
        <input
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label>Role:</label>
        <select {...formik.getFieldProps("role")}>
          <option value="">Select</option>
          <option value="Admin">Admin</option>
          <option value="OfficeStaff">OfficeStaff</option>
          <option value="Librarian">Librarian</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div>{formik.errors.role}</div>
        ) : null}
      </div>

      <button type="submit">{isUpdateMode ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default AddUserForm;
