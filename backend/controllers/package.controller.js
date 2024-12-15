import Package from "../models/package.model.js";

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    console.error("error in getAllPackages controller ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSinglePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "package not found" });
    }
    res.json(pkg);
  } catch (err) {
    console.error("error in getSinglePackage controller ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
