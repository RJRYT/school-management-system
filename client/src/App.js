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
import AddStudentForm from "./components/AddStudentForm";
import StudentView from "./components/StudentView";
import LibraryHistoryForm from "./components/LibraryHistoryForm";
import FeesHistoryForm from "./components/FeesHistoryForm";
import UsersList from "./components/UsersList";
import AddUserForm from "./components/AddUserForm";

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
    path: "/dashboard/admin/student/new",
    roles: ["Admin"],
    element: <AddStudentForm />,
  },
  {
    path: "/dashboard/admin/student/update/:studentId",
    roles: ["Admin"],
    element: <AddStudentForm />,
  },
  {
    path: "/dashboard/admin/student/:studentId",
    roles: ["Admin"],
    element: <StudentView />,
  },
  {
    path: "/dashboard/admin/history/library",
    roles: ["Admin"],
    element: <LibraryHistory />,
  },
  {
    path: "/dashboard/admin/history/library/new",
    roles: ["Admin"],
    element: <LibraryHistoryForm />,
  },
  {
    path: "/dashboard/admin/history/library/update/:historyId",
    roles: ["Admin"],
    element: <LibraryHistoryForm />,
  },
  {
    path: "/dashboard/admin/history/fees",
    roles: ["Admin"],
    element: <FeesHistory />,
  },
  {
    path: "/dashboard/admin/history/fees/new",
    roles: ["Admin"],
    element: <FeesHistoryForm />,
  },
  {
    path: "/dashboard/admin/history/fees/update/:historyId",
    roles: ["Admin"],
    element: <FeesHistoryForm />,
  },
  {
    path: "/dashboard/admin/users",
    roles: ["Admin"],
    element: <UsersList />,
  },
  {
    path: "/dashboard/admin/users/new",
    roles: ["Admin"],
    element: <AddUserForm />,
  },
  {
    path: "/dashboard/admin/users/update/:userId",
    roles: ["Admin"],
    element: <AddUserForm />,
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
    path: "/dashboard/staff/student/:studentId",
    roles: ["OfficeStaff"],
    element: <StudentView />,
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
    path: "/dashboard/staff/history/fees/new",
    roles: ["OfficeStaff"],
    element: <FeesHistoryForm />,
  },
  {
    path: "/dashboard/staff/history/fees/update/:historyId",
    roles: ["OfficeStaff"],
    element: <FeesHistoryForm />,
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
    path: "/dashboard/librarian/student/:studentId",
    roles: ["Librarian"],
    element: <StudentView />,
  },
  {
    path: "/dashboard/librarian/history/library",
    roles: ["Librarian"],
    element: <LibraryHistory />,
  },
  {
    path: "/dashboard/librarian/history/library/new",
    roles: ["Librarian"],
    element: <LibraryHistoryForm />,
  },
  {
    path: "/dashboard/librarian/history/library/update/:historyId",
    roles: ["Librarian"],
    element: <LibraryHistoryForm />,
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
