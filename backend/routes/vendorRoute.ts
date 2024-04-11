import express, { Request, Response } from "express";
import { createVendor } from "../controllers/adminController";
import { vendorLogin } from "../controllers/vendorController";

const router = express.Router();

// router.post("/vendor", createVendor);
router.post("/login", vendorLogin);

export { router as vendorRoute };
