import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import UnAuthorized from "./UnAuthorized";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loading />;
  if(!isAuthenticated) return <Navigate to="/login" />;
  return user && isAuthenticated && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <UnAuthorized allowedRoles={allowedRoles} />
  );
};

export default RoleBasedRoute;
