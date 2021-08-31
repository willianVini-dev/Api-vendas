import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { UserController } from "../controller/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const userController = new UserController();
const userRouter = Router();

userRouter.get("/", isAuthenticated, userController.index);
userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string(),
    },
  }),
  userController.create,
);

userRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  userController.update,
);

export { userRouter };
