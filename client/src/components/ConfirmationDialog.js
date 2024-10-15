import React from "react";

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md mx-auto z-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Are you sure?</h2>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500/50 backdrop-blur-sm text-white px-4 py-2 rounded hover:bg-red-600/50 transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300/50 backdrop-blur-sm text-gray-700 px-4 py-2 rounded hover:bg-gray-400/50 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
