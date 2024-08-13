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
exports.imagenesController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ImagenesController {
    // Crear una nueva imagen, tabajr para 
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.body;
                const newImagen = yield prisma.imagenes.create({
                    data: {
                        url,
                    },
                });
                res.status(201).json(newImagen);
            }
            catch (err) {
                console.error('Error al crear imagen: ', err);
                res.status(500).json({ error: 'Error al crear imagen' });
            }
        });
    }
    // Obtener todas las imágenes
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagenes = yield prisma.imagenes.findMany();
                res.status(200).json(imagenes);
            }
            catch (err) {
                console.error('Error al listar imagenes: ', err);
                res.status(500).json({ error: 'Error al listar imagenes' });
            }
        });
    }
    // Obtener una imagen por id
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const imagen = yield prisma.imagenes.findUnique({
                    where: { id_imagen: Number(id) }
                });
                if (!imagen) {
                    res.status(404).json({ error: 'Imagen not found' });
                    return;
                }
                res.status(200).json(imagen);
            }
            catch (err) {
                console.error('Error al listar una imagen: ', err);
                res.status(500).json({ error: 'Error al listar una imagen' });
            }
        });
    }
    // Actualizar una imagen por id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { url } = req.body;
                const updatedImagen = yield prisma.imagenes.update({
                    where: { id_imagen: Number(id) },
                    data: {
                        url,
                    }
                });
                res.status(200).json(updatedImagen);
            }
            catch (err) {
                console.error('Error al actualizar una imagen: ', err);
                res.status(500).json({ error: 'Error al actualizar imagen' });
            }
        });
    }
    // Eliminar una imagen por id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.imagenes.delete({
                    where: { id_imagen: Number(id) },
                });
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting imagen' });
            }
        });
    }
}
exports.imagenesController = new ImagenesController();
