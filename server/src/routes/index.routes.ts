import { Router } from "express";

// // import all routes here
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";

//
import Authenticate from "../middlewares/authenticate";

const api = Router();

// // Authentication routes
api.use("/auth", authRoutes);
api.use("/products", productRoutes);
api.use("/orders", Authenticate, orderRoutes);

export default api;
