import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const nameUser = await this.findOne({ where: { name } });
    return nameUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const userId = await this.findOne({ where: { id } });
    return userId;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = await this.findOne({ where: { email } });
    return userEmail;
  }
}
export { UserRepository };
