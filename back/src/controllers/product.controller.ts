import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getProductsService, getProductByIdService } from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const getProductById = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const productId = parseInt(id, 10)// Convierte el id a numero

    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID invalido"});
    }

    const product = await getProductByIdService(productId);

    if (!product) {
      return res.status(400).json({ message: "Producto no encontrado"});
    }

    res.json(product);
  }
)
