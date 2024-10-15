import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import backgroundImage from '../assets/background-image.jpg';
import { logout } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    path: "student",
    title: "View Student Details",
    description: "View student records."
  },
  {
    path: "history/library",
    title: "Manage Library History",
    description: "Review and update library records."
  },
];

const LibrarianDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >

      <nav className="w-full bg-blue-600/30 py-4 backdrop-blur-sm">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4">

          <h1 className="text-2xl font-bold text-white">Librarian Dashboard</h1>

          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>

          <ul className={`lg:flex space-x-8 text-white font-semibold hidden ${menuOpen ? 'block' : 'hidden'} lg:block`}>
            {navLinks.map((navlink, index) => (
              <li key={index}>
                <Link
                  to={navlink.path}
                  className="hover:text-gray-300 transition duration-300"
                >
                  {navlink.title}
                </Link>
              </li>
            ))}
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

        {menuOpen && (
          <ul className="lg:hidden flex flex-col items-start py-2 px-4">
            {navLinks.map((navlink, index) => (
              <li className="w-full py-2" key={index}>
                <Link
                  to={navlink.path}
                  className="block text-white hover:text-gray-300 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {navlink.title}
                </Link>
              </li>
            ))}
            <li className="w-full py-2">
              <button
                onClick={handleLogout}
                className="flex items-center block text-white hover:text-gray-300 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-10">
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl w-full">
          {navLinks.map((navlink, index) => (
            <Link
              to={navlink.path}
              key={index}
              className="bg-[#8a88af4d] w-full sm:w-2/5 flex items-center justify-center flex-col backdrop-blur-sm p-6 rounded-lg shadow-lg text-center hover:opacity-90 border border-[#3831bd4d] transition duration-300"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {navlink.title}
              </h2>
              <p className="text-gray-300">{navlink.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
