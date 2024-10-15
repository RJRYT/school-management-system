import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, checkAuthStatus } from "../actions/authActions";
import { useNavigate, Navigate } from "react-router-dom";
import backgroundImage from '../assets/background-image.jpg';
import Loading from "./Loading";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const { email, password } = values;
      const success = await dispatch(login(email, password));

      if (success) {
        dispatch(checkAuthStatus());
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
        setIsSubmitting(false);
      }
    },
  });
  
  if (loading) return <Loading />;

  if(isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="backdrop-blur-sm bg-[#8a88af4d] border border-[#3831bd4d] p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">Login</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...formik.getFieldProps("email")}
            className="border-2 border-gray-300 bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm text-start">{formik.errors.email}</div>
          ) : null}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              className="border-2 border-gray-300 w-full bg-white/60 text-gray-600 placeholder-gray-500 hover:placeholder-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm text-start">{formik.errors.password}</div>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
