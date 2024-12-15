import express from "express";
import {
  getAllPackages,
  getSinglePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

router.get("/", getAllPackages);
router.get("/:id", getSinglePackage);

export default router;
