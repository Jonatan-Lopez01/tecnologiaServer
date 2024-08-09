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
exports.ofertasController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
class OfertasController {
    // Obtener todas las ofertas
    getAllOfertas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ofertas = yield prismaClient_1.default.ofertas.findMany();
                res.json(ofertas);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener las ofertas' });
            }
        });
    }
    // Obtener una oferta por su ID
    getOfertaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const oferta = yield prismaClient_1.default.ofertas.findUnique({
                    where: { id_oferta: Number(id) }
                });
                if (oferta) {
                    res.json(oferta);
                }
                else {
                    res.status(404).json({ error: 'Oferta no encontrada' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener la oferta' });
            }
        });
    }
    // Crear una nueva oferta
    createOferta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_producto, porc_oferta, fecha_inicio, fecha_fin, precio_original, precio_oferta, descripcion, createdAt, updatedAt } = req.body;
            try {
                const newOferta = yield prismaClient_1.default.ofertas.create({
                    data: {
                        id_producto,
                        porc_oferta,
                        fecha_inicio,
                        fecha_fin,
                        precio_original,
                        precio_oferta,
                        descripcion,
                        createdAt,
                        updatedAt
                    }
                });
                res.json(newOferta);
            }
            catch (err) {
                console.error('Error al crear la oferta:', err); // Registrar el error en la consola
                res.status(500).json({ error: 'Error al crear la oferta' });
            }
        });
    }
    // Actualizar una oferta existente
    updateOferta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id_producto, porc_oferta, fecha_inicio, fecha_fin, precio_original, precio_oferta, descripcion, updatedAt } = req.body;
            try {
                const updatedOferta = yield prismaClient_1.default.ofertas.update({
                    where: { id_oferta: Number(id) },
                    data: {
                        id_producto,
                        porc_oferta,
                        fecha_inicio,
                        fecha_fin,
                        precio_original,
                        precio_oferta,
                        descripcion,
                        updatedAt
                    }
                });
                res.json(updatedOferta);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al actualizar la oferta' });
            }
        });
    }
    // Eliminar una oferta
    deleteOferta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prismaClient_1.default.ofertas.delete({
                    where: { id_oferta: Number(id) }
                });
                res.json({ message: 'Oferta eliminada exitosamente' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al eliminar la oferta' });
            }
        });
    }
    // Deshabilitar una oferta (cambiar estatus a 0)
    disableOferta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const oferta = yield prismaClient_1.default.ofertas.update({
                    where: { id_oferta: Number(id) },
                    data: { estatus: 0 }
                });
                res.json({ message: 'Oferta deshabilitada', oferta });
            }
            catch (err) {
                console.error('Error al deshabilitar la oferta:', err);
                res.status(500).json({ error: 'Error al deshabilitar la oferta' });
            }
        });
    }
    // Habilitar una oferta (cambiar estatus a 1)
    enableOferta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const oferta = yield prismaClient_1.default.ofertas.update({
                    where: { id_oferta: Number(id) },
                    data: { estatus: 1 }
                });
                res.json({ message: 'Oferta habilitada', oferta });
            }
            catch (err) {
                console.error('Error al habilitar la oferta:', err);
                res.status(500).json({ error: 'Error al habilitar la oferta' });
            }
        });
    }
}
exports.ofertasController = new OfertasController();
