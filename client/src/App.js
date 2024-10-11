import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./actions/authActions";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";
import LibrarianDashboard from "./components/LibrarianDashboard";
import RoleBasedRoute from "./components/RoleBasedRoute";
import FeesHistory from "./components/FeesHistory";
import StudentList from "./components/StudentList";
import LibraryHistory from "./components/LibraryHistory";

const routes = [
  {
    path: "/dashboard",
    roles: ["Admin", "OfficeStaff", "Librarian"],
    element: <Dashboard />,
  },
  {
    path: "/dashboard/admin",
    roles: ["Admin"],
    element: <AdminDashboard />,
  },
  {
    path: "/dashboard/admin/student",
    roles: ["Admin"],
    element: <StudentList />,
  },
  {
    path: "/dashboard/admin/history/library",
    roles: ["Admin"],
    element: <LibraryHistory />,
  },
  {
    path: "/dashboard/admin/history/fees",
    roles: ["Admin"],
    element: <FeesHistory />,
  },
  {
    path: "/dashboard/admin/users",
    roles: ["Admin"],
    element: <AdminDashboard />,
  },
  {
    path: "/dashboard/staff",
    roles: ["OfficeStaff"],
    element: <StaffDashboard />,
  },
  {
    path: "/dashboard/staff/student",
    roles: ["OfficeStaff"],
    element: <StudentList />,
  },
  {
    path: "/dashboard/staff/history/library",
    roles: ["OfficeStaff"],
    element: <LibraryHistory />,
  },
  {
    path: "/dashboard/staff/history/fees",
    roles: ["OfficeStaff"],
    element: <FeesHistory />,
  },
  {
    path: "/dashboard/librarian",
    roles: ["Librarian"],
    element: <LibrarianDashboard />,
  },
  {
    path: "/dashboard/librarian/student",
    roles: ["Librarian"],
    element: <StudentList />,
  },
  {
    path: "/dashboard/librarian/history/library",
    roles: ["Librarian"],
    element: <LibraryHistory />,
  },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <RoleBasedRoute allowedRoles={route.roles}>
                  {route.element}
                </RoleBasedRoute>
              }
            />
          ))}
      </Routes>
    </Router>
  );
}

export default App;
