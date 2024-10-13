import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="student">Manage Students</Link>
        </li>
        <li>
          <Link to="history/library">Manage Library History</Link>
        </li>
        <li>
          <Link to="history/fees">Manage Fees History</Link>
        </li>
        <li>
          <Link to="users">Manage Office Staff & Librarians</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
