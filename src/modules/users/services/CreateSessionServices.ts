import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../../config/auth";
interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
class CreateSessionServices {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new appError("Não cadastrado", 401);

    const passwordCorrect = await compare(password, user.password);
    if (!passwordCorrect) throw new appError("Senha incorreta", 401);

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export { CreateSessionServices };
