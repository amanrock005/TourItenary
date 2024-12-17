import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";

function BookingFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    numberOfTravelers: 1,
    specialRequest: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/bookings/booktour", {
        packageId: id,
        ...formData,
      });

      // Redirect to Invoice Page with booking details
      navigate(`/invoice`, { state: response.data.invoice });
    } catch (err) {
      console.error("Booking failed:", err.message);
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Tour</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Number of Travelers
          </label>
          <input
            type="number"
            name="numberOfTravelers"
            value={formData.numberOfTravelers}
            onChange={handleChange}
            min="1"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Special Requests</label>
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default BookingFormPage;
