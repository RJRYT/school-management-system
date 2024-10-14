import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDelete = (id) => {
    setUserToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(userToDelete));
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>All users</h2>
      <table>
        <thead>
          <tr>
            <th>user ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((record) => (
            <tr key={record._id}>
              <td>{record._id}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.role}</td>
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
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UsersList;
