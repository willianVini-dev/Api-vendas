import { getCustomRepository } from "typeorm";
import { productRepository } from "../typeorm/repositories/productsRepository";
import product from "../typeorm/entities/product";
import appError from "../../../share/errors/appError";

interface IResquest {
  id: string;
}
export class ShowProductService {
  public async execute({ id }: IResquest): Promise<product | undefined> {
    const productsRepository = getCustomRepository(productRepository);

    const productId = await productsRepository.findOne(id);
    if (!productId) throw new appError("Produto não existe");
    return productId;
  }
}
