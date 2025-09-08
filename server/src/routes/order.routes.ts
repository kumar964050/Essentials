import { Router } from "express";

import controller from "../controllers/order.controller";
import Authenticate from "../middlewares/authenticate";

const r = Router();

r.post("/", controller.createOrder); // Register a new user

export default r;
