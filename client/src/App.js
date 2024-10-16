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
    element: <StudentList role={"admin"} />,
  },
  {
    path: "/dashboard/admin/student/new",
    roles: ["Admin"],
    element: <AddStudentForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/student/update/:studentId",
    roles: ["Admin"],
    element: <AddStudentForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/student/view/:studentId",
    roles: ["Admin"],
    element: <StudentView role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/history/library",
    roles: ["Admin"],
    element: <LibraryHistory role={"admin"} />,
  },
  {
    path: "/dashboard/admin/history/library/new",
    roles: ["Admin"],
    element: <LibraryHistoryForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/history/library/update/:historyId",
    roles: ["Admin"],
    element: <LibraryHistoryForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/history/fees",
    roles: ["Admin"],
    element: <FeesHistory role={"admin"} />,
  },
  {
    path: "/dashboard/admin/history/fees/new",
    roles: ["Admin"],
    element: <FeesHistoryForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/history/fees/update/:historyId",
    roles: ["Admin"],
    element: <FeesHistoryForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/users",
    roles: ["Admin"],
    element: <UsersList role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/users/new",
    roles: ["Admin"],
    element: <AddUserForm role={"admin"}/>,
  },
  {
    path: "/dashboard/admin/users/update/:userId",
    roles: ["Admin"],
    element: <AddUserForm role={"admin"}/>,
  },
  {
    path: "/dashboard/staff",
    roles: ["OfficeStaff"],
    element: <StaffDashboard />,
  },
  {
    path: "/dashboard/staff/student",
    roles: ["OfficeStaff"],
    element: <StudentList  role={"staff"}/>,
  },
  {
    path: "/dashboard/staff/student/new",
    roles: ["OfficeStaff"],
    element: <AddStudentForm role={"staff"}/>,
  },
  {
    path: "/dashboard/staff/student/update/:studentId",
    roles: ["OfficeStaff"],
    element: <AddStudentForm role={"staff"}/>,
  },
  {
    path: "/dashboard/staff/student/view/:studentId",
    roles: ["OfficeStaff"],
    element: <StudentView role={"staff"}/>,
  },
  {
    path: "/dashboard/staff/history/library",
    roles: ["OfficeStaff"],
    element: <LibraryHistory role={"staff"} />,
  },
  {
    path: "/dashboard/staff/history/fees",
    roles: ["OfficeStaff"],
    element: <FeesHistory role={"staff"} />,
  },
  {
    path: "/dashboard/staff/history/fees/new",
    roles: ["OfficeStaff"],
    element: <FeesHistoryForm role={"staff"}/>,
  },
  {
    path: "/dashboard/staff/history/fees/update/:historyId",
    roles: ["OfficeStaff"],
    element: <FeesHistoryForm role={"staff"}/>,
  },
  {
    path: "/dashboard/librarian",
    roles: ["Librarian"],
    element: <LibrarianDashboard />,
  },
  {
    path: "/dashboard/librarian/student",
    roles: ["Librarian"],
    element: <StudentList  role={"librarian"}/>,
  },
  {
    path: "/dashboard/librarian/student/view/:studentId",
    roles: ["Librarian"],
    element: <StudentView role={"librarian"}/>,
  },
  {
    path: "/dashboard/librarian/history/library",
    roles: ["Librarian"],
    element: <LibraryHistory role={"librarian"} />,
  },
  {
    path: "/dashboard/librarian/history/library/new",
    roles: ["Librarian"],
    element: <LibraryHistoryForm role={"librarian"}/>,
  },
  {
    path: "/dashboard/librarian/history/library/update/:historyId",
    roles: ["Librarian"],
    element: <LibraryHistoryForm role={"librarian"}/>,
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
