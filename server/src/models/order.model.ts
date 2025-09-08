import mongoose, { Document, Schema } from "mongoose";

// --- Interfaces ---
interface IShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  instructions?: string;
}

interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
  product: mongoose.Types.ObjectId;
}

interface IPaymentInfo {
  id?: string;
}

export interface IOrder extends Document {
  shippingInfo: IShippingInfo;
  orderItems: IOrderItem[];
  paymentInfo?: IPaymentInfo;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatus: string;
  deliveredAt?: Date;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// --- Schema ---
const orderSchema = new Schema<IOrder>(
  {
    shippingInfo: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      instructions: { type: String },
    },

    orderItems: [
      {
        // name: { type: String, required: true },
        quantity: { type: Number, required: true },
        // price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    paymentInfo: {
      id: { type: String },
    },

    taxAmount: { type: Number, required: true },
    shippingAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    orderStatus: {
      type: String,
      required: true,
      default: "processing",
    },

    deliveredAt: { type: Date },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// --- Model ---
const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
