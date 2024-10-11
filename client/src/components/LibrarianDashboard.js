import React from "react";
import { Link } from "react-router-dom";

const LibrarianDashboard = () => {
  return (
    <div>
      <h1>Librarian Dashboard</h1>
      <ul>
        <li>
          <Link to="/students">View Student Details</Link>
        </li>
        <li>
          <Link to="/library-history">Manage Library History</Link>
        </li>
      </ul>
    </div>
  );
};

export default LibrarianDashboard;
