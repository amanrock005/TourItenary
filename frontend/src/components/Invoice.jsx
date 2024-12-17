import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const invoice = location.state;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Booking Invoice</h1>
        <p className="mb-2">
          <strong>Customer Name:</strong> {invoice.customerName}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {invoice.email}
        </p>
        <p className="mb-2">
          <strong>Phone Number:</strong> {invoice.phoneNumber}
        </p>
        <p className="mb-2">
          <strong>Package:</strong> {invoice.packageTitle}
        </p>
        <p className="mb-2">
          <strong>Price Per Person:</strong> ${invoice.pricePerPerson}
        </p>
        <p className="mb-2">
          <strong>Number of Travelers:</strong> {invoice.numberOfTravelers}
        </p>
        <p className="mb-2 font-bold text-green-600">
          <strong>Total Price:</strong> ${invoice.totalPrice}
        </p>

        {/* Go Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-center"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default Invoice;
