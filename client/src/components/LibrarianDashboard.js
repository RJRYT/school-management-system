import React from "react";
import { Link } from "react-router-dom";

const LibrarianDashboard = () => {
  return (
    <div>
      <h1>Librarian Dashboard</h1>
      <ul>
        <li>
          <Link to="student">View Student Details</Link>
        </li>
        <li>
          <Link to="history/library">Manage Library History</Link>
        </li>
      </ul>
    </div>
  );
};

export default LibrarianDashboard;
