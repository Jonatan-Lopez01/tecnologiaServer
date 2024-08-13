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
exports.productosController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
class ProductosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                console.log("Error al listar los productos");
            }
        });
    }
    creatProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, cant_existencia, precio_unitario, caracteristicas, id_categoria, createdAt, updatedAt } = req.body;
            try {
                const newProducto = yield prismaClient_1.default.productos.create({
                    data: {
                        nombre,
                        cant_existencia,
                        precio_unitario,
                        caracteristicas,
                        id_categoria,
                        createdAt,
                        updatedAt
                    }
                });
                res.json(newProducto);
            }
            catch (err) {
                console.log("Error al crear un producto: ", err);
                res.status(500).json({ error: 'Error al crear un producto' });
            }
        });
    }
    updateProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, cant_existencia, estatus, precio_unitario, caracteristicas, id_categoria, updatedAt } = req.body;
            try {
                const updatedProducto = yield prismaClient_1.default.productos.update({
                    where: { id_producto: Number(id) },
                    data: {
                        nombre,
                        cant_existencia,
                        estatus,
                        precio_unitario,
                        caracteristicas,
                        id_categoria,
                        updatedAt
                    }
                });
                res.json(updatedProducto);
            }
            catch (err) {
                console.log("Error al actualizar el producto: ", err);
                res.status(500).json({ error: 'Error al actualizar el producto' });
            }
        });
    }
}
exports.productosController = new ProductosController();
