import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import AppError from "../utils/error.utils.js";

const router = express.Router();

router.post('/generate-presigned-url', async (req, res, next) => {
  try {
    const uploadPreset = "imagerbac"
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'rbac', 
      },
      process.env.CAPIKEY 
    );

    const presignedUrl = `https://api.cloudinary.com/v1_1/dt5akmcnd/upload`;

    res.status(200).json({
      message: "Presigned URL generated successfully",
      url: presignedUrl,
      signature: signature,
      timestamp: timestamp,
      upload_preset: uploadPreset,  
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    next(new AppError('Failed to generate presigned URL', 500));
  }
});

export default router;