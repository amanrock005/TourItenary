

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if the user is an admin
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Fetch all packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/packages/getall"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error.message);
        setError("Failed to fetch packages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Handler for delete button
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/deletepackage/${id}`
        );
        // Remove the deleted package from the state
        setPackages(packages.filter((pkg) => pkg._id !== id));
        alert("Package deleted successfully!");
      } catch (error) {
        console.error("Error deleting package:", error.message);
        alert("Failed to delete package.");
      }
    }
  };

  // Handler for update button
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tour Packages</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{pkg.title}</h2>
                <p className="text-gray-700 mb-2 line-clamp-3 overflow-hidden">
                  {pkg.description}
                </p>
                <p className="text-green-600 font-bold mb-2">
                  Price: ${pkg.price}
                </p>
                <div className="flex space-x-2 mt-3 justify-between items-center">
                  <button
                    onClick={() => navigate(`/package/${pkg._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                  <div>
                    {/* Render Update and Delete buttons only if the user is an admin */}
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleUpdate(pkg._id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mr-5"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && packages.length === 0 && (
        <p className="text-center text-gray-600">No packages available.</p>
      )}
    </div>
  );
}

export default AllPackagesPage;
