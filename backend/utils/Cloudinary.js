import dotenv from "dotenv";
dotenv.config();

console.log("Cloud:", process.env.CLOUD_NAME);
console.log("Key:", process.env.CLOUD_API_KEY);
console.log("Secret:", process.env.CLOUD_API_SECRET);

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configured:", cloudinary.config().cloud_name);

export default cloudinary;
