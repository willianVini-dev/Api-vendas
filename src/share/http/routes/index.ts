import { Router } from "express";
import productRouter from "../../../modules/products/router/products.router";
import { userRouter } from "../../../modules/users/router/user.router";
const routes = Router();

routes.use("/product", productRouter);
routes.use("/user", userRouter);

export default routes;
