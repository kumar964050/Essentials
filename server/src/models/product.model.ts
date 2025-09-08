import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPhoto {
  id: string;
  url: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  photos: IPhoto[];
  category: "shirts" | "pants";
  stock: number;
  brand: string;
  ratings: number;
  user: mongoose.Types.ObjectId; // reference to User
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, maxLength: 120 },
    price: { type: Number, required: true, maxLength: 6 },
    description: { type: String, required: true },
    photos: [
      {
        id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: { type: String, required: true, enum: ["shirts", "pants"] },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
