import Booking from "../models/booking.model.js";
import Package from "../models/package.model.js";

export const submitBooking = async (req, res) => {
  try {
    const {
      packageId,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequest,
    } = req.body;

    // Fetch package details
    const selectedPackage = await Package.findById(packageId);
    if (!selectedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Calculate total price
    const totalPrice = selectedPackage.price * numberOfTravelers;

    // Create a new booking
    const newBooking = new Booking({
      packageId,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequest,
      totalPrice,
    });

    await newBooking.save();

    // Response with booking and invoice details
    res.status(201).json({
      message: "Booking successful!",
      bookingId: newBooking._id,
      invoice: {
        customerName,
        email,
        phoneNumber,
        packageTitle: selectedPackage.title,
        pricePerPerson: selectedPackage.price,
        numberOfTravelers,
        totalPrice,
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ message: "Failed to book the package" });
  }
};
