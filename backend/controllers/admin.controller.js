import Package from "../models/package.model.js";
import cloudinary from "../lib/cloudinary.js";

// Add a new tour package
//http://localhost:5000/api/admin/packages -- POST Request
export const addNewPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates } = req.body;

    // Check if an image file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "tour_packages", // Cloudinary folder
      resource_type: "image",
    });

    // Create a new package document
    const newPackage = await Package.create({
      title,
      description,
      price,
      availableDates: JSON.parse(availableDates), // Convert to array if sent as JSON string
      image: result.secure_url, // Cloudinary image URL
    });

    res
      .status(201)
      .json({ message: "Package added successfully", data: newPackage });
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params; // Extract package ID from request parameters

    // Validate ID
    if (!id) {
      return res.status(400).json({ message: "Package ID is required." });
    }

    // Find and delete the package
    const deletedPackage = await Package.findByIdAndDelete(id);

    // If package is not found
    if (!deletedPackage) {
      return res
        .status(404)
        .json({ message: "Package not found or already deleted." });
    }

    // Send success response
    res.status(200).json({
      message: "Package deleted successfully!",
      deletedPackage,
    });
  } catch (error) {
    console.error("Error deleting package:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, availableDates, image } = req.body;

  try {
    // Check if the package exists
    const existingPackage = await Package.findById(id);
    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Update package details
    existingPackage.title = title || existingPackage.title;
    existingPackage.description = description || existingPackage.description;
    existingPackage.price = price || existingPackage.price;
    existingPackage.availableDates =
      availableDates || existingPackage.availableDates;
    existingPackage.image = image || existingPackage.image;

    // Save the updated package
    const updatedPackage = await existingPackage.save();
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error.message);
    res.status(500).json({ message: "Failed to update package" });
  }
};
