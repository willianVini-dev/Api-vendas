import { Router } from "express";
import productRouter from "../../../modules/products/router/products.routes";
const routes = Router();

routes.use("/product", productRouter);

export default routes;
