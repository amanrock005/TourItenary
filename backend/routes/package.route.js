import express from "express";
import {
  getAllPackages,
  getSinglePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

router.get("/getall", getAllPackages);
router.get("/getone/:id", getSinglePackage);

export default router;
