import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

class ListUserServices {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.find();
  }
}
export { ListUserServices };
