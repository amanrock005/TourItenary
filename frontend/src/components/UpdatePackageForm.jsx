import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePackagePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the existing package details on component mount
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axiosInstance.get(`/packages/getone/${id}`);
        const { title, description, price, availableDates, image } =
          response.data;

        setFormData({
          title,
          description,
          price,
          availableDates: availableDates.join(", "), // Convert to comma-separated string
          image,
        });
      } catch (error) {
        console.error("Error fetching package:", error.message);
        setError("Failed to fetch package details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      availableDates: formData.availableDates
        .split(",")
        .map((date) => date.trim()), // Convert back to array
    };

    try {
      await axiosInstance.put(`/admin/updatepackage/${id}`, updatedData);
      alert("Package updated successfully!");
      navigate(`/package/${id}`);
    } catch (error) {
      console.error("Error updating package:", error.message);
      alert("Failed to update package.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Package</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Available Dates (comma-separated)
            </label>
            <input
              type="text"
              name="availableDates"
              value={formData.availableDates}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
          >
            Update Package
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdatePackagePage;
