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
exports.direccionesController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
class DireccionesController {
    getAllDirecciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const direcciones = yield prismaClient_1.default.direcciones.findMany();
                res.json(direcciones);
            }
            catch (err) {
                console.log("Error al obtener direcciones: ", err);
                res.status(500).json({ error: 'Error al obtener direcciones' });
            }
        });
    }
    getDireccionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const direccion = yield prismaClient_1.default.direcciones.findUnique({
                    where: { id_direccion: Number(id) }
                });
                if (direccion) {
                    res.json(direccion);
                }
                else {
                    res.status(400).json({ error: 'Dirección no encontrada' });
                }
            }
            catch (err) {
                console.log("Error al obtener la direccion: ", err);
                res.status(500).json({ error: 'Error al obtener la dirección' });
            }
        });
    }
    createDireccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { calle, num_int, num_ext, colonia, municipio, estado, cp, id_user } = req.body;
            try {
                const newDireccion = yield prismaClient_1.default.direcciones.create({
                    data: {
                        calle,
                        num_int,
                        num_ext,
                        colonia,
                        municipio,
                        estado,
                        cp,
                        id_user
                    }
                });
                res.json(newDireccion);
            }
            catch (err) {
                console.log("Error al crear la direccion: ", err);
                res.status(500).json({ error: 'Error al crear la dirección' });
            }
        });
    }
    updateDireccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { calle, num_int, num_ext, colonia, municipio, estado, cp, id_user } = req.body;
            try {
                const updatedDireccion = yield prismaClient_1.default.direcciones.update({
                    where: { id_direccion: Number(id) },
                    data: {
                        calle,
                        num_int,
                        num_ext,
                        colonia,
                        municipio,
                        estado,
                        cp,
                        id_user
                    }
                });
                res.json(updatedDireccion);
            }
            catch (err) {
                console.log("Error al actualizar la direccion: ", err);
                res.status(500).json({ error: 'Error al actualizar la dirección' });
            }
        });
    }
    deleteDireccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prismaClient_1.default.direcciones.delete({
                    where: { id_direccion: Number(id) }
                });
                res.json({ message: 'Dirección eliminada exitosamente' });
            }
            catch (err) {
                console.log("Error al eliminar la direccion: ", err);
                res.status(500).json({ error: 'Error al eliminar la dirección' });
            }
        });
    }
}
exports.direccionesController = new DireccionesController();
