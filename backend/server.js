import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import path from "path";

import packageRoutes from "./routes/package.route.js";
import bookingRoutes from "./routes/booking.route.js";
import adminRoutes from "./routes/admin.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  connectDB();
});

// future scope
// 1. pagination to implement while fetching all packages
// 2. filter option to sort through the available packages
// 3. using skelton to show while fetching all packages and single package
