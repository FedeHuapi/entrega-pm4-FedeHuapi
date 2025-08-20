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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const catchedController_1 = require("../utils/catchedController");
const products_service_1 = require("../services/products.service");
exports.getProducts = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, products_service_1.getProductsService)();
    res.json(products);
}));
exports.getProductById = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productId = parseInt(id, 10); // Convierte el id a numero
    if (isNaN(productId)) {
        return res.status(400).json({ message: "ID invalido" });
    }
    const product = yield (0, products_service_1.getProductByIdService)(productId);
    if (!product) {
        return res.status(400).json({ message: "Producto no encontrado" });
    }
    res.json(product);
}));
