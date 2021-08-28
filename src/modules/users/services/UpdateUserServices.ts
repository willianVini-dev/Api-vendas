import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import User from "../typeorm/entities/User";
import { UserRespository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}
class UpdateUserServices {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRespository = getCustomRepository(UserRespository);
    const emailExist = await userRespository.findByEmail(email);
    if (emailExist) throw new appError("Email já existe");

    const userId = await userRespository.findById(id);
    if (!userId) throw new appError("Usuario não existe");

    userId.name = name;
    userId.email = email;
    userId.password = password;

    await userRespository.save(userId);
    return userId;
  }
}

export { UpdateUserServices };
