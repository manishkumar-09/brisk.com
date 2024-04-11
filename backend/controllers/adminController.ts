import { Request, Response } from "express";
import { createVendorInput } from "../dto/vendor";
import { Vendor } from "../models/vendor";
import { hashedPassword } from "../utils/passwordHashing";

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
  const isVendor = await Vendor.findOne({ email });
  if (!isVendor) {
    const hashPassword = await hashedPassword(password);
    const vendor = await Vendor.create({
      name,
      ownerName,
      foodType,
      pincode,
      address,
      phone,
      email,
      password: hashPassword,
      rating: 0,
      serviceAvailable: true,
      coverImages: ["image"],
    });

    return res.status(201).json({
      vendor,
    });
  } else {
    return res.status(400).json({ msg: "Email already exits" });
  }
};

//admin get vendors
export const getVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find({});
    if (vendors !== null) {
      return res.status(200).json({
        success: true,
        message: "Vendors data fetched ",
        vendors: vendors,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Vendors data not present",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

export const getVendorsById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const vendor = await Vendor.findById({ _id: id });
    if (vendor !== null) {
      return res
        .status(200)
        .json({ success: true, message: "Vendor data", vendor: vendor });
    }
    return res.status(404).json({ msg: "Datg Not Found" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};
