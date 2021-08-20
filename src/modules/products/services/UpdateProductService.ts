import { productRepository } from "./../../typeorm/repositories/productsRepository";
import { getCustomRepository } from "typeorm";
import appError from "../../../share/errors/appError";
import product from "../../typeorm/entities/product";
interface IResquest {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
export class UpdateProductService {
  public async execute({
    id,
    name,
    quantity,
    price,
  }: IResquest): Promise<product> {
    const productsRepository = getCustomRepository(productRepository);

    const productID = await productsRepository.findOne(id);
    if (!productID) throw new appError("Produto não existe");

    const productName = await productsRepository.findByName(name);
    if (productName) throw new appError("Nome do produto já existe");

    productID.name = name;
    productID.price = price;
    productID.quantity = quantity;

    await productsRepository.save(productID);
    return productID;
  }
}
