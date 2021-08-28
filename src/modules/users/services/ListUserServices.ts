import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRespository } from "../typeorm/repositories/UsersRepository";

class ListUserServices {
  public async execute(): Promise<User[]> {
    const userRespository = getCustomRepository(UserRespository);
    return userRespository.find();
  }
}
export { ListUserServices };
