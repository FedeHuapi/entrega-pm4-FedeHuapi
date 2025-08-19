import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { login, registerUser } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import { OrderRepository } from "../repositories/order.repository";
import { UserRepository } from "../repositories/user.repository";

const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.get("/orders", checkLogin, async (req: Request, res: Response) => {
  const { userId } = req.body;
  const orders = await OrderRepository.find({
    relations: ["products"],
    where: { user: { id: userId } },
  });

  res.send(orders);
});

usersRouter.get("/me", checkLogin, async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await UserRepository.findOneOrFail({
      where: { id: userId },
      select: ["id", "name", "email", "address", "phone", "role"],
      relations: ["orders", "orders.products"], 
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address || '',
      phone: user.phone || '',
      role: user.role,
      orders: user.orders ? user.orders.map((order) => ({
        id: order.id,
        status: order.status,
        date: order.date.toISOString(),
        products: order.products ? order.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
        })) : [],
      })) : [], // Maneja el caso donde orders o products sea undefined
    };

    res.json(userResponse);
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

export default usersRouter;