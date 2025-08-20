"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegister_middleware_1 = __importDefault(require("../middlewares/userRegister.middleware"));
const userLogin_middleware_1 = __importDefault(require("../middlewares/userLogin.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const order_repository_1 = require("../repositories/order.repository");
const user_repository_1 = require("../repositories/user.repository");
const usersRouter = (0, express_1.Router)();
usersRouter.post("/register", userRegister_middleware_1.default, user_controller_1.registerUser);
usersRouter.post("/login", userLogin_middleware_1.default, user_controller_1.login);
usersRouter.get("/orders", checkLogin_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const orders = yield order_repository_1.OrderRepository.find({
        relations: ["products"],
        where: { user: { id: userId } },
    });
    res.send(orders);
}));
usersRouter.get("/me", checkLogin_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const user = yield user_repository_1.UserRepository.findOneOrFail({
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
    }
    catch (error) {
        console.error("Error al buscar usuario:", error);
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}));
exports.default = usersRouter;
