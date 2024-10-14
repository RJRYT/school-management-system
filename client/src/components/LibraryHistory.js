import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryHistory, deleteLibraryHistory } from "../actions/libraryActions";
import { Link } from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog";

const LibraryHistory = () => {
  const dispatch = useDispatch();
  const { libraryHistory, loading, error } = useSelector((state) => state.library);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [historyToDelete, setHistoryToDelete] = useState(null);

  const handleDelete = (id) => {
    setHistoryToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteLibraryHistory(historyToDelete));
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(fetchLibraryHistory());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Library History</h2>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Borrow Student</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {libraryHistory.map((record) => (
            <tr key={record._id}>
              <td>{record.bookTitle}</td>
              <td>{record.studentId.name}</td>
              <td>{record.issueDate.split("T")[0]}</td>
              <td>{record.returnDate.split("T")[0]}</td>
              <td>{record.isReturned ? "Returned" : "Not Returned"}</td>
              <td>
                <Link to={`update/${record._id}`}>Edit</Link>
                <button onClick={() => handleDelete(record._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this history?"
      />
    </div>
  );
};

export default LibraryHistory;
