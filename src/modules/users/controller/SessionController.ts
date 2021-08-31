import { Request, Response } from "express";
import { CreateSessionServices } from "../services/CreateSessionServices";

class SessionController {
  public async auth(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const createSession = new CreateSessionServices();
      const user = await createSession.execute({ email, password });
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }
}
export { SessionController };
