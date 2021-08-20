import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/product";

// criando a classe para fazer todo o relacionamento com o banco de dados

@EntityRepository(Product)
export class productRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({ where: { name } });
    return product;
  }
}
