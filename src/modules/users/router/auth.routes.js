import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { SessionController } from "../controller/SessionController";
const routerAuth = Router();
const sessionController = new SessionController();

routerAuth.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.auth,
);
export { routerAuth };
