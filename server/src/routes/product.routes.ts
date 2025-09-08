import { Router } from "express";

import controller from "../controllers/product.controller";

const r = Router();

r.post("/", controller.addProduct); // add a new product
r.get("/", controller.getProducts); // get all products
r.get("/:id", controller.getProductById); // get product by id

export default r;
