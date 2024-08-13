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
    // Crear una nueva imagen.
    createImage(req, res) {
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
    getAllImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagenes = yield prisma.imagenes.findMany();
                res.json(imagenes);
            }
            catch (err) {
                console.error('Error al listar imagenes: ', err);
                res.status(500).json({ error: 'Error al listar imagenes' });
            }
        });
    }
    // Obtener una imagen por id
    getImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const imagen = yield prisma.imagenes.findUnique({
                    where: { id_imagen: Number(id) }
                });
                if (!imagen) {
                    res.status(400).json({ error: 'Imagen no encontrada.' });
                    return;
                }
                res.json(imagen);
            }
            catch (err) {
                console.error('Error al listar una imagen: ', err);
                res.status(500).json({ error: 'Error al listar una imagen' });
            }
        });
    }
    // Actualizar una imagen por id
    updateImage(req, res) {
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
                res.json(updatedImagen);
            }
            catch (err) {
                console.error('Error al actualizar una imagen: ', err);
                res.status(500).json({ error: 'Error al actualizar imagen' });
            }
        });
    }
    // Eliminar una imagen por id
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.imagenes.delete({
                    where: { id_imagen: Number(id) },
                });
                res.json({ error: 'Imagen eliminada exitosamente.' });
            }
            catch (err) {
                console.error('Error al eliminar la imagen: ', err);
                res.status(500).json({ error: 'Error al eliminar la imagen:' });
            }
        });
    }
}
exports.imagenesController = new ImagenesController();
