import { Request, Response } from "express";
import {
  editVendorDetails,
  editVendorService,
  vendorLoginInput,
} from "../dto/vendor";
import { Vendor } from "../models/vendor";
import { comparePassword, generateToken } from "../utils/passwordHashing";
import { createFoodInput } from "../dto/food";
import { Food } from "../models/food";

const vendorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = <vendorLoginInput>req.body;
    const vendor = await Vendor.findOne({ email });
    if (vendor) {
      const validation = await comparePassword(password, vendor.password);
      if (validation) {
        const token = await generateToken({
          _id: vendor._id,
          name: vendor.name,
          foodType: vendor.foodType,
          email: vendor.email,
        });
        return res.status(200).json({
          message: "Login successfully",
          token: token,
        });
      }
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }
    return res.status(400).json({
      message: "Vendor not exist ",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

const vendorProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (user) {
      const data = await Vendor.findById({ _id: user._id });
      res.status(200).json({
        success: true,
        message: "User profile",
        profile: data,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

const editVendorDetails = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, foodType } = <editVendorDetails>req.body;
    const user = await Vendor.findByIdAndUpdate(
      req.user._id,
      {
        name,
        phone,
        address,
        foodType,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "user data updated", user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

const editVendorService = async (req: Request, res: Response) => {
  try {
    const { serviceAvailable } = <editVendorService>req.body;
    const user = await Vendor.findByIdAndUpdate(
      req.user._id,
      {
        serviceAvailable,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Service availability change", user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

// food controllers funtions
const addFood = async (req: Request, res: Response) => {
  try {
    const { name, description, category, foodType, readyTime, price } = <
      createFoodInput
    >req.body;

    const vendor = await Vendor.findById({ _id: req.user._id });

    if (vendor) {
      const files = req.files as Express.Multer.File[];
      const images = files?.map((file) => {
        file.filename;
      });

      const createFood = await Food.create({
        vendorId: vendor._id,
        name,
        description,
        images,
        category,
        foodType,
        readyTime,
        price,
        rating: 0,
      });
      vendor.foods.push(createFood);
      const result = await vendor.save();

      return res.status(201).json({ message: "food added", food: result });
    }
    return res
      .status(400)
      .json({ message: "Something is wrong in adding food" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

const getFoods = async (req: Request, res: Response) => {
  try {
    const foodData = await Food.find();
    res.status(200).json(foodData);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msessage: `Internal sever error ${err}` });
  }
};

export {
  vendorLogin,
  vendorProfile,
  editVendorDetails,
  editVendorService,
  addFood,
  getFoods,
};
