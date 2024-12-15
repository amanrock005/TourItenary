import cloudinary from "../lib/cloudinary.js";
import Package from "../models/package.model.js";

const parseAvailableDates = (availableDates) => {
  try {
    const parsedDates = JSON.parse(availableDates);
    if (!Array.isArray(parsedDates)) throw new Error();
    return parsedDates;
  } catch (err) {
    throw new Error("Invalid available format");
  }
};

export const addNewPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    if (!title || !description || !price || !availableDates) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const parsedDates = parseAvailableDates(availableDates);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${req.file.buffer.toString("base64")}`
    );

    const newPackage = new Package({
      title,
      description,
      price,
      availableDates: parsedDates,
      image: cloudinaryResponse.secure_url,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    console.error("error in addNewPackage controller ", err.message);
    const statusCode = err.message.includes("availalbeDates") ? 400 : 500;
    res
      .status(statusCode)
      .json({ message: err.message || "Internal server error" });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.avalialbeDates) {
      updatePackage.availableDates = parseAvailableDates(
        updatePackage.availableDates
      );
    }

    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${req.file.buffer.toString("base64")}`
      );
      updates.image = cloudinary.secure_url;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(updatedPackage);
  } catch (err) {
    console.error("error in update Package controller ", err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "package not found" });
    }
    res.status(200).json({ message: "package deleted successfully" });
  } catch (err) {
    console.error("error deleting package ", err.message);
    res.status(500).json({ message: "internal server error" });
  }
};
