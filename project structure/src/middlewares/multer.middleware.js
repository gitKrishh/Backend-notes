import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)

 /*file.fieldname: the name of the field in the HTML form (e.g., "profileImage")
Date.now(): adds a timestamp to make the filename unique
path.extname(file.originalname): gets the original file extension (e.g., .jpg, .png, .pdf) */

  }
})

export const upload = multer({ storage: storage })


/*
Great! Let's break this line down in detail:

---

### ✅ **Line:**

```js
export const upload = multer({ storage: storage })
```

---

### 🔍 **1. What is `multer`?**

`multer` is a **middleware** for handling `multipart/form-data`, which is mainly used for **uploading files** in Node.js (usually with Express).

---

### 🔍 **2. `{ storage: storage }`**

You're passing an **options object** to the `multer()` function.

Here:

* `storage: storage`
  Means: Use the **custom storage engine** you defined earlier, which specifies:

  * Where to store the file (`uploads/`)
  * How to name the file

This is the same as writing:

```js
const upload = multer({ storage })
```

(because key and value names are the same, JS allows shorthand syntax)

---

### 🔍 **3. `export const upload = ...`**

You're exporting this `upload` middleware so that you can use it in your routes like this:

```js
import { upload } from "./path/to/your/uploadFile.js";

router.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded!");
});
```

---

### 🔁 **Summary Table**

| Part                  | Meaning                                             |
| --------------------- | --------------------------------------------------- |
| `multer(...)`         | Creates a new instance of Multer with custom config |
| `storage: storage`    | Use the previously defined `diskStorage` object     |
| `export const upload` | Make the upload middleware available to other files |

---

Would you like an example of using this in a complete upload route with Express?
*/