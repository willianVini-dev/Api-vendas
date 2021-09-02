import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { UserController } from "../controller/UserController";
import { isAuthenticated } from "../../../share/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "../../../config/upload";
import { UserAvatarController } from "../controller/UserAvatarController";

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.get("/", isAuthenticated, userController.index);
userRouter.get("/:id", isAuthenticated, userController.one);

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

userRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  userAvatarController.upload,
);

export { userRouter };
