import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import User from "../typeorm/entities/User";
import { UserRespository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}
class UserServices {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRespository = getCustomRepository(UserRespository);
    const emailExist = await userRespository.findByEmail(email);
    if (emailExist) throw new appError("email já existe");

    const newUser = userRespository.create({ name, email, password });
    await userRespository.save(newUser);
    return newUser;
  }
}
export { UserServices };
