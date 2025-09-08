import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import User, { IUser } from "../models/user.model";
import SMSService from "../services/smsService";
import Razorpay from "razorpay";
import Orders from "../models/order.model";

const smsService = new SMSService();

interface AuthRequest extends Request {
  user?: IUser | null;
}

// SignUp
const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new CustomError("UnAuthorization error", 401));
  }

  const newOrder = await Orders.create({
    ...req.body,
    user: req.user._id,
  });

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  var options = {
    amount: newOrder.totalAmount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  res.json(order);
};

export default { createOrder };
