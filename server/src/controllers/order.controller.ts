import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import User, { IUser } from "../models/user.model";
import Razorpay from "razorpay";
import Orders from "../models/order.model";

interface AuthRequest extends Request {
  user?: IUser | null;
}

// creating a new order
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
const getOrdersList = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new CustomError("UnAuthorization error", 401));
  }

  const orders = await Orders.find({ user: req.user._id }).populate(
    "orderItems.product"
  );

  res.json({
    status: "success",
    message: "fetched orders list successfully",
    orders,
  });
};
const getOrderById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new CustomError("UnAuthorization error", 401));
  }

  const order = await Orders.findById(req.params.id).populate(
    "orderItems.product"
  );

  res.json({
    status: "success",
    message: "fetched orders list successfully",
    order,
  });
};

export default { createOrder, getOrdersList, getOrderById };
