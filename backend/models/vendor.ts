import mongoose, { Schema, Model, Document } from "mongoose";

type vendorDoc = Document & {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  // foods: any;
  rating: number;
  serviceAvailable: boolean;
  coverImages: [string];
};
const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: [{ type: String, required: true }],
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
    rating: { type: Number },
    serviceAvailable: { type: Boolean },
    coverImages: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Vendor = mongoose.model<vendorDoc>("Vendor", vendorSchema);

export { Vendor };
