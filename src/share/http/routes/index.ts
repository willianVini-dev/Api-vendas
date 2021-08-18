import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ msg: "hellow world" });
});

export default routes;
