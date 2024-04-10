import express, { Request, Response } from "express";
import { createVendor } from "../controllers/adminController";

const router = express.Router();

// router.post("/vendor", createVendor);
router.get("/create", createVendor);

export { router as vendorRoute };
