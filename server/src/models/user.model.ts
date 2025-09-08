import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  phone: string;
  address: string;
  is_deleted: boolean;
  last_seen: Date;
  verify_otp_details: {
    expiry: Date | null | undefined;
    otp: number | null | undefined;
  };
  role: "user" | "admin";
  generateAuthToken: () => string;
  generateOTP: () => string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String },
    is_deleted: { type: Boolean, default: false },
    last_seen: { type: Date },
    verify_otp_details: {
      expiry: { type: Date, default: null },
      otp: { type: Number, default: null },
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Method to generate OTP token
UserSchema.methods.generateOTP = function (): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 5); // OTP valid for 5 minutes

  this.verify_otp_details = {
    otp: parseInt(otp, 10),
    expiry,
  };
  return otp;
};

// Method to generate auth token
UserSchema.methods.generateAuthToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string);
};

export default mongoose.model<IUser>("User", UserSchema);
