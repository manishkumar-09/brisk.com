import express, { Request, Response } from "express";
import {
  createVendor,
  getVendors,
  getVendorsById,
} from "../controllers/adminController";
const router = express.Router();

router.get("/vendors", getVendors);
router.post("/add-vendor", createVendor);
router.get("/vendor/:id", getVendorsById);

export { router as adminRoute };
