import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";

function PackageDetailsPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch package details on component mount
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/packages/getone/${id}`);
        setPkg(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error.message);
        setError("Failed to fetch package details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
      >
        Back to Packages
      </button>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {pkg && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
            <p className="text-gray-700 mb-4">{pkg.description}</p>
            <p className="text-green-600 font-bold text-xl mb-4">
              Price: ${pkg.price}
            </p>
            <div>
              <h2 className="text-xl font-semibold mb-2">Available Dates:</h2>
              <ul className="list-disc list-inside text-gray-600">
                {pkg.availableDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => navigate(`/book/${id}`)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Book Now
      </button>
    </div>
  );
}

export default PackageDetailsPage;
