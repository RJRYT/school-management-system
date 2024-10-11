import React from "react";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  return (
    <div>
      <h1>Office Staff Dashboard</h1>
      <ul>
        <li>
          <Link to="/students">Manage Students</Link>
        </li>
        <li>
          <Link to="/fees-history">Manage Fees History</Link>
        </li>
        <li>
          <Link to="/library-history">View Library History</Link>
        </li>
      </ul>
    </div>
  );
};

export default StaffDashboard;
