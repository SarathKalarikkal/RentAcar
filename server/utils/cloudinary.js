import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const imageUploadCloudinary = async (path) => {
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path);
        return uploadResult.url;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        throw new Error("Cloudinary upload failed");
    }
};