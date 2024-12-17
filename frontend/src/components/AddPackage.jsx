import React, { useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";

function AddPackagePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Prepare the form data to send
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append(
        "availableDates",
        JSON.stringify(formData.availableDates.split(","))
      );
      data.append("image", formData.image);

      // Send POST request to the backend
      const response = await axiosInstance.post("/admin/addpackage", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle success
      setSuccessMessage(response.data.message);
      setFormData({
        title: "",
        description: "",
        price: "",
        availableDates: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding package:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Tour Package
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Available Dates</label>
            <input
              type="text"
              name="availableDates"
              value={formData.availableDates}
              onChange={handleChange}
              placeholder="Enter dates (comma-separated)"
              className="w-full p-2 border rounded"
              required
            />
            <small className="text-gray-500">
              Example: 2024-07-10, 2024-08-15
            </small>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPackagePage;
