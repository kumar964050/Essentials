import { Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { AuthRequest } from "../types";
import Product from "../models/product.model";
import { uploadMultipleFile } from "../config/cloudinary";

//  add product
const addProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !req.files.images) {
    return next(new CustomError("Please provide product images", 400));
  }

  const images = await uploadMultipleFile(req.files.images as any);
  const product = await Product.create({
    ...req.body,
    photos: images,
    user: req.user?._id,
  });

  res.status(201).json({
    status: "success",
    message: "product added successfully",
    product,
  });
};

//
const getProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find();

  res.json({
    status: "success",
    message: "product added successfully",
    results: products.length,
    products,
  });
};

//
const getProductById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  res.json({
    status: "success",
    message: "product added successfully",
    product,
  });
};

export default { addProduct, getProducts, getProductById };
