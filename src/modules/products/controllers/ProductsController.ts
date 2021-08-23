import { DeleteProductService } from "./../services/DeleteProductService";
import { UpdateProductService } from "./../services/UpdateProductService";
import { createProductService } from "./../services/CreateProductService";
import { ShowProductService } from "./../services/ShowProductService";
import { ListProductService } from "./../services/ListProductService";
import { Request, Response } from "express";

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const products = await new ListProductService();
    const list = products.execute();
    return res.status(200).json(list);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = await new ShowProductService();
    const list = showProduct.execute({ id });
    return res.json(list);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProduct = new createProductService();
    const create = createProduct.execute({ name, price, quantity });
    return res.json(create);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProduct = new UpdateProductService();
    const update = await updateProduct.execute({ id, name, price, quantity });
    return res.json(update);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletProduct = new DeleteProductService();
    await deletProduct.execute({ id });
    return res.json([]);
  }
}
