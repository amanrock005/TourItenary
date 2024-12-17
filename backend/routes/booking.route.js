import express from "express";
import { submitBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/booktour", submitBooking);

export default router;
