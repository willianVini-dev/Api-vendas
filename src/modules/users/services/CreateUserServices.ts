import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

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
    const userRepository = getCustomRepository(UserRepository);
    const emailExist = await userRepository.findByEmail(email);
    if (emailExist) throw new appError("email já existe");

    const hashed = await hash(password, 8);
    const newUser = userRepository.create({
      name,
      email,
      password: hashed,
      avatar,
    });
    await userRepository.save(newUser);
    return newUser;
  }
}
export { CreateUserServices };
