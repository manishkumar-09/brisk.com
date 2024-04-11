import { Request, Response } from "express";
import { vendorLoginInput } from "../dto/vendor";
import { Vendor } from "../models/vendor";
import { comparePassword, generateToken } from "../utils/passwordHashing";

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

export { vendorLogin };
