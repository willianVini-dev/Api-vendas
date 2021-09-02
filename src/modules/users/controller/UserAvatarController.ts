import { Request, Response } from "express";
import { UploadAvatarServices } from "../services/UpdateAvatarServices";

class UserAvatarController {
  public async upload(req: Request, res: Response): Promise<Response> {
    const upload = new UploadAvatarServices();
    const user = upload.execute({
      userID: req.user.id,
      avatarFile: req.file.filename,
    });
    return res.json(user);
  }
}
export { UserAvatarController };
