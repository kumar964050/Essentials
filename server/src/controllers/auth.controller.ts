import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import User from "../models/user.model";
import SMSService from "../services/smsService";
import { AuthRequest } from "../types";

const smsService = new SMSService();

// SignUp
const register = async (req: Request, res: Response, next: NextFunction) => {
  const findUser = await User.findOne({ phone: req.body.phone });

  if (findUser) {
    return next(
      new CustomError("Already User exist with this Phone number", 400)
    );
  }

  const newUser = await User.create(req.body);
  //  send OTP details to user phone number
  const otp = newUser.generateOTP();
  await newUser.save();
  await smsService.sendOtp(newUser.phone, otp);

  res.status(201).json({
    status: "success",
    message: "send OTP details to user phone number",
  });
};
// Sign In
const login = async (req: Request, res: Response, next: NextFunction) => {
  const findUser = await User.findOne({ phone: req.body.phone });

  if (!findUser) {
    return next(new CustomError("User not found", 404));
  }

  //  send OTP details to user phone number
  const otp = findUser.generateOTP();
  await findUser.save();
  await smsService.sendOtp(findUser.phone, otp);

  res.json({
    status: "success",
    message: "send OTP details to user phone number",
  });
};
//
const VerifyOTPDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findUser = await User.findOne({ phone: req.body.phone });
  if (!findUser) {
    return next(new CustomError("User not found", 404));
  }

  //  verify OTP details
  const { otp } = req.body;
  if (!findUser.verify_otp_details.expiry || !findUser.verify_otp_details.otp) {
    return next(new CustomError("OTP details expired", 400));
  }
  // expiry check
  if (findUser.verify_otp_details.expiry < new Date()) {
    return next(new CustomError("OTP details expired", 400));
  }

  // otp check
  if (findUser.verify_otp_details.otp !== req.body.otp) {
    return next(new CustomError("Invalid OTP details", 400));
  }

  const token = findUser.generateAuthToken();
  // clear otp details
  findUser.verify_otp_details = { otp: null, expiry: null };
  await findUser.save();

  res.json({
    status: "success",
    message: "Success",
    token,
    user: { id: findUser._id, name: findUser.name, phone: findUser.phone },
  });
};

const user = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new CustomError("User not found", 404));
  }

  res.json({
    status: "success",
    message: "Success",
    user: { id: req.user._id, name: req.user.name, phone: req.user.phone },
  });
};

export default { register, login, VerifyOTPDetails, user };
