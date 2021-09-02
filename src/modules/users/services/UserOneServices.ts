import { getCustomRepository } from "typeorm";
import { string } from "joi";
import User from "../typeorm/entities/User";
import { UserRespository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}

class UserOneServices {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRespository = getCustomRepository(UserRespository);
    const list = await userRespository.findById(id);
    return list;
  }
}
export { UserOneServices };
