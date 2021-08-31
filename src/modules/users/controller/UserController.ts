import { Request, Response } from "express";
import { ListUserServices } from "../services/ListUserServices";
import { CreateUserServices } from "../services/CreateUserServices";
import appError from "../../../share/errors/appError";
import { UpdateUserServices } from "../services/UpdateUserServices";

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user = new ListUserServices();
    const list = await user.execute();
    return res.json(list);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password)
      throw new appError("Argumentos não validos");

    const user = new CreateUserServices();
    const newUser = await user.execute({ name, email, password, avatar });
    return res.json(newUser);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, email, password } = req.body;
    if (!id || !name || !email || !password)
      throw new appError("Paramentros invalidos");

    const update = new UpdateUserServices();
    const updateUser = await update.execute({ id, name, email, password });
    return res.json(updateUser);
  }
}
export { UserController };
