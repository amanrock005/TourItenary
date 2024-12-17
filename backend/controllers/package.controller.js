import Package from "../models/package.model.js";

// Controller to fetch all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error.message);
    res.status(500).json({ message: "Failed to retrieve packages" });
  }
};

export const getSinglePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePackage = await Package.findById(id);

    if (!singlePackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(singlePackage);
  } catch (error) {
    console.error("Error fetching package:", error.message);
    res.status(500).json({ message: "Failed to retrieve package" });
  }
};
