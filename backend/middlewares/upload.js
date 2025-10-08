import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const uploadPath = process.env.PO_UPLOAD_PATH || "uploads/po_official";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;