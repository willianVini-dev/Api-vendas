import path from "path";
import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import uploadConfig from "../../../config/upload";
import { promises } from "fs";

interface IRequest {
  userID: string;
  avatarFile: string;
}

class UploadAvatarServices {
  public async execute({ userID, avatarFile }: IRequest): Promise<User> {
    console.log(userID);
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userID);

    if (!user) throw new appError("Usúario não encontrado");

    // verificando se existe avatar já cadastrado
    if (user.avatar) {
      // pegando o caminho completo do arquivo de avatar
      const userAvatarFile = path.join(uploadConfig.directory, user.avatar);
      // verificando se o arquivo realmente existe
      const userAvatarExists = await promises.stat(userAvatarFile);
      // se o arquivo existir, tem que removelo
      if (userAvatarExists) {
        await promises.unlink(userAvatarFile);
      }
    }

    // se o arquivo não existir, basta subistituir o nome do arquivo
    user.avatar = avatarFile;
    await userRepository.save(user);
    return user;
  }
}
export { UploadAvatarServices };
