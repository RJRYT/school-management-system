import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import backgroundImage from '../assets/background-image.jpg'; 

const Dashboard = () => {
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth.user);

  const getDashboardPath = (role) => {
    switch (role) {
      case "Admin":
        return "/dashboard/admin";
      case "OfficeStaff":
        return "/dashboard/staff";
      case "Librarian":
        return "/dashboard/librarian";
      default:
        return "/"; 
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(getDashboardPath(role));
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [role, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="backdrop-blur-sm bg-[#8a88af4d] border border-[#3831bd4d] p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-white mb-4">Dashboard</h1>
        <p className="text-lg text-gray-200 mb-4">
          Welcome to the School Management System Dashboard!
        </p>
        <p className="text-md text-gray-300 mb-6">
          Redirecting to your {role} dashboard in a few seconds...
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => navigate(getDashboardPath(role))}
        >
          Go to {role} Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
