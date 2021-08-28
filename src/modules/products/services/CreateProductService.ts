import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import product from "../typeorm/entities/product";
import { productRepository } from "../typeorm/repositories/productsRepository";
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class createProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<product> {
    const productsRepository = getCustomRepository(productRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) throw new appError("Produto já existente");

    const newProduct = productsRepository.create({
      name,
      price,
      quantity,
    });
    await productsRepository.save(newProduct);
    return newProduct;
  }
}
