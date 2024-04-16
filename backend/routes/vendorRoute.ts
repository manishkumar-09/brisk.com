import express from "express";
import {
  editVendorDetails,
  vendorLogin,
  vendorProfile,
  editVendorService,
  addFood,
  getFoods,
} from "../controllers/vendorController";
import { auth } from "../middlewares/authToken";
import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});
const images = multer({ storage: imageStorage }).array("images", 10);

const router = express.Router();

router.post("/login", vendorLogin);
router.use(auth);
router.get("/profile", vendorProfile);
router.patch("/edit", auth, editVendorDetails);
router.patch("/service", auth, editVendorService);

// food apis
router.post("/food", images, addFood);
router.get("/foods", getFoods);
export { router as vendorRoute };
