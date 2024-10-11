import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";
import LibrarianDashboard from "./components/LibrarianDashboard";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute
                allowedRoles={["Admin", "OfficeStaff", "Librarian"]}
              >
                <Dashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={["OfficeStaff"]}>
                <StaffDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/librarian"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={["Librarian"]}>
                <LibrarianDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
