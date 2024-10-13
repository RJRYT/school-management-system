import React from "react";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  return (
    <div>
      <h1>Office Staff Dashboard</h1>
      <ul>
        <li>
          <Link to="student">Manage Students</Link>
        </li>
        <li>
          <Link to="history/fees">Manage Fees History</Link>
        </li>
        <li>
          <Link to="history/library">View Library History</Link>
        </li>
      </ul>
    </div>
  );
};

export default StaffDashboard;
