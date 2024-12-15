import express from "express";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { filesSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed! "), false);
    }
  },
});

router.post("/packages", upload.single("image"), addNewPackage);
router.put("/packages/:id", upload.single("image"), updatePackage);
router.delete("/packages/:id", deletePackage);

export default router;
