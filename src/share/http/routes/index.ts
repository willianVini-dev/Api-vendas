import { Router } from "express";
import productRouter from "../../../modules/products/router/products.router";
import { userRouter } from "../../../modules/users/router/user.router";
import { routerAuth } from "../../../modules/users/router/auth.routes";
const routes = Router();

routes.use("/product", productRouter);
routes.use("/user", userRouter);
routes.use("/auth", routerAuth);

export default routes;
