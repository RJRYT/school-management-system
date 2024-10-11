import React from "react";

const UnAuthorized = ({ allowedRoles }) => {
  return (
    <div>
      <h1>UnAuthorized</h1>
      <p>You are not allowed to view this page. you are not a {allowedRoles.toString() }</p>
    </div>
  );
};

export default UnAuthorized;
