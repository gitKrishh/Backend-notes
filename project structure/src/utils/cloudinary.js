import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();    


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

console.log("Cloudinary Config:", {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY ? 'present' : 'missing',
    secret: process.env.CLOUDINARY_API_SECRET ? 'present' : 'missing'
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log("Uploading to Cloudinary:", localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded:", response.url);
        return response;

    } catch (error) {
        console.error("❌ Cloudinary upload failed:", error.message);

        try {
            fs.unlinkSync(localFilePath);
            console.log("Temporary file deleted");
        } catch (err) {
            console.error("Failed to delete local file:", err.message);
        }

        return null;
    }
};




export {uploadOnCloudinary}


/*
Excellent follow-up!

When we say **“temporary”**, we mean that the file is stored **only on the server** — and usually only for **a short period** or for **further processing**.

Let me explain clearly:

---

### 🧨 Why Multer File Storage Is "Temporary"

1. **Server restarts wipe files**
   Platforms like **Render**, **Heroku**, or even many personal setups use **ephemeral file systems**, meaning:

   * Files stored using Multer will be deleted if:

     * The server restarts
     * The deployment updates
     * There's a crash

2. **Not meant for long-term storage**
   Storing files on your server’s local disk:

   * Is not scalable (limited space)
   * Is not distributed (only available on *that* server)
   * Has no backup or CDN

3. **Better solutions exist for file storage**
   After temporarily accepting the file:

   * You typically upload it to **Cloudinary**, **Amazon S3**, or **Firebase Storage**.
   * These platforms provide:

     * URLs for file access
     * Backups
     * CDNs for fast delivery

---

### 📦 Real-world flow:

| Step | What Happens                                                 |
| ---- | ------------------------------------------------------------ |
| 1    | User uploads a file via frontend form                        |
| 2    | **Multer** stores it in `uploads/` folder on server          |
| 3    | Your backend **uploads** that file to **Cloudinary/S3**      |
| 4    | You store the cloud file's **URL** in your DB                |
| 5    | Optionally delete the file from local server (to free space) |

---

### 🧹 Optional Cleanup

After uploading to Cloudinary, you might delete the file locally like this:

```js
import fs from "fs";

fs.unlinkSync(localFilePath); // deletes file from local disk
```

---

### ✅ Summary

| Local Multer Storage | Cloudinary / S3      |
| -------------------- | -------------------- |
| Temporary            | Permanent            |
| On your server only  | Globally available   |
| No backup/CDN        | Has backup + CDN     |
| Risky for production | Ideal for production |

Let me know if you want the **code for uploading to Cloudinary after Multer** — I can walk you through it line by line.


*/