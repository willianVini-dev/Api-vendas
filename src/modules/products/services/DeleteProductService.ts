import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import { productRepository } from "./../../typeorm/repositories/productsRepository";
interface IRequest {
  id: string;
}
export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(productRepository);
    const productID = await productsRepository.findOne(id);
    if (!productID) throw new appError("Produto não existe");

    await productsRepository.remove(productID);
  }
}
