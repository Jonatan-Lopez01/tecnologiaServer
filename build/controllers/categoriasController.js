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
exports.categoriasController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
class CategoriasController {
    // Obtener todas las categorías
    getAllCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield prismaClient_1.default.categorias.findMany();
                res.json(categorias);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener las categorías' });
            }
        });
    }
    // Obtener una categoría por su ID
    getCategoriaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const categoria = yield prismaClient_1.default.categorias.findUnique({
                    where: { id_categoria: Number(id) }
                });
                if (categoria) {
                    res.json(categoria);
                }
                else {
                    res.status(404).json({ error: 'Categoría no encontrada' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener la categoría' });
            }
        });
    }
    // Crear una nueva categoría
    createCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, createdAt, updatedAt } = req.body;
            try {
                const newCategoria = yield prismaClient_1.default.categorias.create({
                    data: {
                        nombre,
                        createdAt,
                        updatedAt,
                    }
                });
                res.json(newCategoria);
            }
            catch (err) {
                console.error('Error al crear la categoría:', err); // Registrar el error en la consola
                res.status(500).json({ error: 'Error al crear la categoría' });
            }
        });
    }
    // Actualizar una categoría existente
    updateCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, updatedAt } = req.body;
            try {
                const updatedCategoria = yield prismaClient_1.default.categorias.update({
                    where: { id_categoria: Number(id) },
                    data: {
                        nombre,
                        updatedAt
                    }
                });
                res.json(updatedCategoria);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al actualizar la categoría' });
            }
        });
    }
    // Eliminar una categoría
    deleteCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prismaClient_1.default.categorias.delete({
                    where: { id_categoria: Number(id) }
                });
                res.json({ message: 'Categoría eliminada exitosamente' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al eliminar la categoría' });
            }
        });
    }
    // Deshabilitar una categoría (cambiar estatus a 0)
    disabledCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const categoria = yield prismaClient_1.default.categorias.update({
                    where: { id_categoria: Number(id) },
                    data: { estatus: 0 }
                });
                res.json({ message: 'Categoría deshabilitada', categoria });
            }
            catch (err) {
                console.error('Error al deshabilitar la categoría:', err);
                res.status(500).json({ error: 'Error al deshabilitar la categoría' });
            }
        });
    }
    // Habilitar una categoría (cambiar estatus a 1)
    enabledCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const categoria = yield prismaClient_1.default.categorias.update({
                    where: { id_categoria: Number(id) },
                    data: { estatus: 1 }
                });
                res.json({ message: 'Categoría habilitada', categoria });
            }
            catch (err) {
                console.error('Error al habilitar la categoría:', err);
                res.status(500).json({ error: 'Error al habilitar la categoría' });
            }
        });
    }
}
exports.categoriasController = new CategoriasController();
