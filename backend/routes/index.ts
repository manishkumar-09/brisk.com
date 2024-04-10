import express from "express";
import { adminRoute } from "./adminRoute";
import { vendorRoute } from "./vendorRoute";
const commonRoute = express.Router();

commonRoute.use("/admin", adminRoute);
commonRoute.use("/vendor", vendorRoute);

export default commonRoute;
