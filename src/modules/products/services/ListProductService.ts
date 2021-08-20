import { productRepository } from "./../../typeorm/repositories/productsRepository";
import { getCustomRepository } from "typeorm";
import product from "../../typeorm/entities/product";

export class ListProductService {
  public async execute(): Promise<product[]> {
    const productsRepository = getCustomRepository(productRepository);
    const products = await productsRepository.find();
    return products;
  }
}
