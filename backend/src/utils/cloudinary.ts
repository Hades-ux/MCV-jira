import { v2 } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";
configDotenv();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const fileUpload = async (filePath: string, folder: string = "jira-clone") => {
  try {
    const response = await v2.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error uploading ${error.message}`);
  } finally {
    {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (error) {
        console.warn("Failed to delete temp file:", filePath);
      }
    }
  }
};

export const deleteUpload = async (public_id: string) => {
  try {
    const response = await v2.uploader.destroy(public_id, {
      resource_type: "image",
    });
    return response;
  } catch (error: any) {
    console.error("Cloudinary delete error:", error.message);
    return { result: "error", error: error.message };
  }
};
