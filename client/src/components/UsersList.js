import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { fetchUsers, deleteUser } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background-image.jpg";
import { logout } from "../actions/authActions";
import ConfirmationDialog from "./ConfirmationDialog";
import InfoDialogBox from "./InfoDialogBox";

const MetaData = {
  admin: {
    title: "Admin Dashboard",
    path: "/dashboard/admin/"
  },
  staff: {
    title: "Staff Dashboard",
    path: "/dashboard/staff/"
  },
  librarian: {
    title: "Librarian Dashboard",
    path: "/dashboard/librarian/"
  },
  user: {
    title: "Dashboard",
    path: "/dashboard/"
  }
}

const UsersList = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return <InfoDialogBox title="Loading" text="We are processing your request." />;
  }

  if (error) {
    return <InfoDialogBox title="Error" text={error} />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <nav className="w-full bg-blue-600/30 py-4 backdrop-blur-sm">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-bold text-white">{MetaData[role].title}</h1>
          <ul className="flex space-x-8 text-white font-semibold">
            <li>
              <button
                className="hover:text-gray-300 transition duration-300"
                onClick={() => navigate(MetaData[role].path)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-gray-300 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="px-4 py-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Users List</h2>
          <Link
            to="new"
            className="bg-green-500/80 backdrop-blur-sm text-white text-sm font-bold py-1 px-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add New User
          </Link>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full rounded-lg">
            <thead className="bg-blue-600/30 backdrop-blur-sm text-white">
              <tr>
                <th className="text-left py-3 px-4">User ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 backdrop-blur-sm">
              {users.length ?
                users.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="py-3 px-4">{record._id}</td>
                    <td className="py-3 px-4">{record.name}</td>
                    <td className="py-3 px-4">{record.email}</td>
                    <td className="py-3 px-4">{record.role}</td>
                    <td className="py-3 px-4">
                      <Link to={`update/${record._id}`} className="text-yellow-500 hover:text-yellow-700 mx-2">Edit</Link>
                      <button onClick={() => handleDelete(record._id)} className="text-red-500 hover:text-red-700 mx-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                )) :
                <tr>
                  <td className="py-3 px-4 text-md font-semibold text-center" colSpan={5}>Data not found</td>
                </tr>
              }
            </tbody>
          </table>
          <ConfirmationDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete this user?"
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
