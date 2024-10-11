import React from "react";

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  if (!open) return null;

  return (
    <div className="confirmation-dialog">
      <h2>Are you sure?</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;
