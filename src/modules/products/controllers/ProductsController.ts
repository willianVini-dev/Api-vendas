import { DeleteProductService } from "./../services/DeleteProductService";
import { UpdateProductService } from "./../services/UpdateProductService";
import { createProductService } from "./../services/CreateProductService";
import { ShowProductService } from "./../services/ShowProductService";
import { ListProductService } from "./../services/ListProductService";
import { Request, Response } from "express";

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const products = new ListProductService();
      const list = await products.execute();
      return res.json(list);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showProduct = new ShowProductService();
      const list = await showProduct.execute({ id });
      return res.json(list);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, quantity } = req.body;
      const createProduct = new createProductService();
      const create = await createProduct.execute({ name, price, quantity });
      return res.json(create);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, price, quantity } = req.body;
      const updateProduct = new UpdateProductService();
      const update = await updateProduct.execute({ id, name, price, quantity });
      return res.json(update);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletProduct = new DeleteProductService();
      await deletProduct.execute({ id });
      return res.json([]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
