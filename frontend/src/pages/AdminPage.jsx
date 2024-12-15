import { useState } from "react";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "Word123!";

  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleLogin = () => {
    if (auth.username === ADMIN_USER && auth.password === ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please try again");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isAuthenticated ? (
        <AdminDashboard />
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2></h2>
        </div>
      )}
    </div>
  );
}
