import mongoose, { Schema, Document } from "mongoose";

type foodDoc = Document & {
  vendorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
};

const foodSchema = new Schema(
  {
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    foodType: [{ type: String, required: true }],
    readyTime: { type: Number },
    price: { type: Number },
    rating: { type: Number },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Food = mongoose.model<foodDoc>("Food", foodSchema);

export { Food };
