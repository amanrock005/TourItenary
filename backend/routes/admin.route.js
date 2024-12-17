import express from "express";
import {
  addNewPackage,
  deletePackage,
  updatePackage,
} from "../controllers/admin.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

// Add a package
router.post("/addpackage", upload.single("image"), addNewPackage);
// update a package
router.put("/updatepackage/:id", updatePackage);
// delete a package
router.delete("/deletepackage/:id", deletePackage);

export default router;
