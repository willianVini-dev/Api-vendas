import { Request, Response } from "express";
import { ListUserServices } from "../services/ListUserServices";
import { CreateUserServices } from "../services/CreateUserServices";
import appError from "../../../share/errors/appError";
import { UpdateUserServices } from "../services/UpdateUserServices";
import { UserOneServices } from "../services/UserOneServices";

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user = new ListUserServices();
    const list = await user.execute();
    return res.json(list);
  }

  public async one(req: Request, res: Response): Promise<Response> {
    const id = req.user.id;
    const user = new UserOneServices();
    const list = await user.execute({ id });
    return res.json(list);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, avatar } = req.body;
      if (!name || !email || !password)
        throw new appError("Argumentos não validos");

      const user = new CreateUserServices();
      const newUser = await user.execute({ name, email, password, avatar });
      return res.json(newUser);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, email, password } = req.body;
      if (!id || !name || !email || !password)
        throw new appError("Paramentros invalidos");

      const update = new UpdateUserServices();
      const updateUser = await update.execute({ id, name, email, password });
      return res.json(updateUser);
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}
export { UserController };
