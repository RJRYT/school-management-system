import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/students">Manage Students</Link>
        </li>
        <li>
          <Link to="/library-history">Manage Library History</Link>
        </li>
        <li>
          <Link to="/fees-history">Manage Fees History</Link>
        </li>
        <li>
          <Link to="/manage-users">Manage Office Staff & Librarians</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
