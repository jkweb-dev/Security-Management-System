import { upload } from "./multer.js";

// reusable upload middleware
export const uploadGuardFiles = (req, res, next) => {
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "cnicFront", maxCount: 1 },
    { name: "cnicBack", maxCount: 1 }
  ])(req, res, (err) => {
    
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "Upload Failed"
      });
    }

    next(); // continue to controller
  });
};