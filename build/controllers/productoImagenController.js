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
exports.productoImagenController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductoImagenController {
    // Crear un nuevo producto_imagen
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_producto, id_imagen } = req.body;
                const newProductoImagen = yield prisma.producto_imagen.create({
                    data: {
                        id_producto,
                        id_imagen,
                    },
                });
                res.json(newProductoImagen);
            }
            catch (err) {
                console.error('Error al crear producto_imagen: ', err);
                res.status(500).json({ error: 'Error al crear producto_imagen' });
            }
        });
    }
    // Obtener todos los producto_imagen
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productoImagenes = yield prisma.producto_imagen.findMany();
                res.json(productoImagenes);
            }
            catch (err) {
                console.error('Error al listar producto_imagenes: ', err);
                res.status(500).json({ error: 'Error al listar producto_imagenes' });
            }
        });
    }
    // Obtener un producto_imagen por id
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const productoImagen = yield prisma.producto_imagen.findUnique({
                    where: { id_producto_imagen: Number(id) }
                });
                if (!productoImagen) {
                    res.status(400).json({ error: 'ProductoImagen no encontrado' });
                    return;
                }
                res.json(productoImagen);
            }
            catch (err) {
                console.error('Error al buscar producto_imagen', err);
                res.status(500).json({ error: 'Error al buscar producto_imagen' });
            }
        });
    }
    // Actualizar un producto_imagen por id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_producto, id_imagen } = req.body;
                const updatedProductoImagen = yield prisma.producto_imagen.update({
                    where: { id_producto_imagen: Number(id) },
                    data: {
                        id_producto,
                        id_imagen,
                    }
                });
                res.json(updatedProductoImagen);
            }
            catch (err) {
                console.error('Error al actualizar producto_imagenes: ', err);
                res.status(500).json({ error: 'Error al actualizar producto_imagen' });
            }
        });
    }
    // Eliminar un producto_imagen por id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.producto_imagen.delete({
                    where: { id_producto_imagen: Number(id) },
                });
                res.json({ message: 'Rol eliminado exitosamente' });
            }
            catch (err) {
                console.error('Error al borrar producto_imagenes: ', err);
                res.status(500).json({ error: 'Error al borrar producto_imagen' });
            }
        });
    }
}
exports.productoImagenController = new ProductoImagenController();
