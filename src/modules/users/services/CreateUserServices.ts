import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import User from "../typeorm/entities/User";
import { UserRespository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
class CreateUserServices {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const userRespository = getCustomRepository(UserRespository);
    const emailExist = await userRespository.findByEmail(email);
    if (emailExist) throw new appError("email já existe");

    const hashed = await hash(password, 8);
    const newUser = userRespository.create({
      name,
      email,
      password: hashed,
      avatar,
    });
    await userRespository.save(newUser);
    return newUser;
  }
}
export { CreateUserServices };
