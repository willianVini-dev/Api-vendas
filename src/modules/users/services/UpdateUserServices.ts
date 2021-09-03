import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}
class UpdateUserServices {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExist = await userRepository.findByEmail(email);
    if (emailExist) throw new appError("Email já existe");

    const userId = await userRepository.findById(id);
    if (!userId) throw new appError("Usuario não existe");

    userId.name = name;
    userId.email = email;
    userId.password = password;

    await userRepository.save(userId);
    return userId;
  }
}

export { UpdateUserServices };
