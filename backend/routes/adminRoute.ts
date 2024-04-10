import express, { Request, Response } from "express";
import { createVendor } from "../controllers/adminController";
const router = express.Router();

router.post("/add-vendor", createVendor);

export { router as adminRoute };
