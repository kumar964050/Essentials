import { Router } from "express";

import controller from "../controllers/auth.controller";

import Authenticate from "../middlewares/authenticate";

const r = Router();

r.post("/register", controller.register); // Register a new user
r.post("/login", controller.login); // Login  a user
r.post("/verify-otp", controller.VerifyOTPDetails); // Verify OTP and get auth token
r.get("/user", Authenticate, controller.user); // get user details

export default r;
