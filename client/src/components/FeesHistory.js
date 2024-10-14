import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeesHistory, deleteFeesHistory } from "../actions/feesActions";
import { Link } from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog";

const FeesHistory = () => {
  const dispatch = useDispatch();
  const { feesHistory, loading, error } = useSelector((state) => state.fees);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [historyToDelete, setHistoryToDelete] = useState(null);
console.log(feesHistory);
  const handleDelete = (id) => {
    setHistoryToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteFeesHistory(historyToDelete));
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(fetchFeesHistory());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Fees History</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>payment Method</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feesHistory.map((record) => (
            <tr key={record._id}>
              <td>{record.studentId.name}</td>
              <td>{record.paymentMethod}</td>
              <td>{record.amountPaid}/-</td>
              <td>{record.paymentDate.split("T")[0]}</td>
              <td>{record.feesStatus}</td>
              <td>{record.remarks || "---"}</td>
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

export default FeesHistory;
