import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../http/routes/index";
import appError from "../errors/appError";
import swaggerUI from "swagger-ui-express";
import { swagger } from "../../../swagger";
import "../typeorm";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swagger));
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    msg: "Internal server error",
  });
});
app.listen(3000, () => {
  console.log("API IS RUNNING");
});
