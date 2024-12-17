import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [adID, setAdID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (adID === "2231" && password === "Admin123!") {
      localStorage.setItem("isAdmin", "true"); // Save admin auth status
      navigate("/add"); // Redirect to the Add Package page
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Admin ID:</label>
          <input
            type="text"
            value={adID}
            onChange={(e) => setAdID(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter Admin ID"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
