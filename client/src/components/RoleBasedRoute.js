import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;
  return user && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default RoleBasedRoute;
