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
exports.rolesController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
class RolesController {
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield prismaClient_1.default.roles.findMany();
                res.json(roles);
            }
            catch (err) {
                console.log("Error al obtener roles: ", err);
                res.status(500).json({ error: 'Error al obtener roles' });
            }
        });
    }
    getRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const role = yield prismaClient_1.default.roles.findUnique({
                    where: { id_rol: Number(id) }
                });
                if (role) {
                    res.json(role);
                }
                else {
                    res.status(400).json({ error: 'Rol no encontrado' });
                }
            }
            catch (err) {
                console.log("Error al obtener el rol: ", err);
                res.status(500).json({ error: 'Error al obtener el rol' });
            }
        });
    }
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, estatus, createdAt, updatedAt } = req.body;
            try {
                const newRole = yield prismaClient_1.default.roles.create({
                    data: {
                        nombre,
                        descripcion,
                        estatus,
                        createdAt,
                        updatedAt
                    }
                });
                res.json(newRole);
            }
            catch (err) {
                console.error('Error al crear el rol:', err); // Registrar el error en la consola
                res.status(500).json({ error: 'Error al crear el rol' });
            }
        });
    }
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, descripcion, estatus, updatedAt } = req.body;
            try {
                const updatedRole = yield prismaClient_1.default.roles.update({
                    where: { id_rol: Number(id) },
                    data: {
                        nombre,
                        descripcion,
                        estatus,
                        updatedAt
                    }
                });
                res.json(updatedRole);
            }
            catch (err) {
                console.log("Error al actualizar el rol: ", err);
                res.status(500).json({ error: 'Error al actualizar el rol' });
            }
        });
    }
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prismaClient_1.default.roles.delete({
                    where: { id_rol: Number(id) }
                });
                res.json({ message: 'Rol eliminado exitosamente' });
            }
            catch (err) {
                console.log("Error al eliminar el rol: ", err);
                res.status(500).json({ error: 'Error al eliminar el rol' });
            }
        });
    }
    disabledRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const role = yield prismaClient_1.default.roles.update({
                    where: { id_rol: Number(id) },
                    data: { estatus: 0 } // Cambiar el estatus a '0' para deshabilitar
                });
                res.json({ message: 'Rol deshabilitado', role });
            }
            catch (err) {
                console.error('Error al deshabilitar el rol:', err);
                res.status(500).json({ error: 'Error al deshabilitar el rol' });
            }
        });
    }
    enabledRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const role = yield prismaClient_1.default.roles.update({
                    where: { id_rol: Number(id) },
                    data: { estatus: 1 } // Cambiar el estatus a '0' para deshabilitar
                });
                res.json({ message: 'Rol habilitado', role });
            }
            catch (err) {
                console.error('Error al habilitar el rol:', err);
                res.status(500).json({ error: 'Error al habilitar el rol' });
            }
        });
    }
}
exports.rolesController = new RolesController();
