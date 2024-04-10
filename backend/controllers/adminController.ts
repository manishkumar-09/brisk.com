import { Request, Response } from "express";
import { createVendorInput } from "../dto/vendor";

export const createVendor = async (req: Request, res: Response) => {
  const {
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <createVendorInput>req.body;
  res
    .status(201)
    .json({
      name,
      ownerName,
      foodType,
      pincode,
      phone,
      address,
      email,
      password,
    });
};
export const getVendors = async (req: Request, res: Response) => {};
export const getVendorsById = async (req: Request, res: Response) => {};
