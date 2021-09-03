import { getCustomRepository } from "typeorm";
import { string } from "joi";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}

class UserOneServices {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const list = await userRepository.findById(id);
    return list;
  }
}
export { UserOneServices };
