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
exports.usersController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
const encriptacion_1 = __importDefault(require("../seguridad/encriptacion"));
const auth_1 = __importDefault(require("../seguridad/auth"));
class UsersController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prismaClient_1.default.users.findMany();
                res.json(users);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener usuarios' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield prismaClient_1.default.users.findUnique({
                    where: { id_user: Number(id) }
                });
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener el usuario' });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, telefono, email, createdAt, updatedAt, id_rol } = req.body;
            let password = req.body.password;
            password = yield encriptacion_1.default.createHashValue(password);
            try {
                const newUser = yield prismaClient_1.default.users.create({
                    data: {
                        nombre,
                        telefono,
                        email,
                        password,
                        createdAt,
                        updatedAt,
                        id_rol
                    }
                });
                // Generar el token
                const token = auth_1.default.tokenizar(newUser.id_user);
                // Definir maxAge basado en el rol
                const tiempoExp = newUser.id_rol === 1 || newUser.id_rol === 4 ? 36000000 : 7200000; // 10 horas o 2 horas
                // Configurar la cookie con el token
                res.cookie('access_token', token, {
                    httpOnly: true, // La cookie solo será accesible desde el servidor
                    secure: process.env.MODO_DESARROLLO === 'produccion', // En producción, la cookie solo se enviará a través de HTTPS
                    maxAge: tiempoExp //Tiempo de expiracion de la cookie, no del token.
                });
                // Enviar la respuesta con el nuevo usuario
                res.json(newUser);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al crear el usuario' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, telefono, email, password, estatus, updatedAt, id_rol } = req.body;
            try {
                const updatedUser = yield prismaClient_1.default.users.update({
                    where: { id_user: Number(id) },
                    data: {
                        nombre,
                        telefono,
                        email,
                        password,
                        estatus,
                        updatedAt,
                        id_rol
                    }
                });
                res.json(updatedUser);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prismaClient_1.default.users.delete({
                    where: { id_user: Number(id) }
                });
                res.json({ message: 'Usuario eliminado exitosamente' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al eliminar el usuario' });
            }
        });
    }
    disableUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield prismaClient_1.default.users.update({
                    where: { id_user: Number(id) },
                    data: { estatus: 0 } // Cambiar el estatus a '0' para deshabilitar
                });
                res.json({ message: 'User deshabilitado', user });
            }
            catch (err) {
                console.error('Error al deshabilitar el user:', err);
                res.status(500).json({ error: 'Error al deshabilitar el user' });
            }
        });
    }
    enableUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield prismaClient_1.default.users.update({
                    where: { id_user: Number(id) },
                    data: { estatus: 1 } // Cambiar el estatus a '0' para deshabilitar
                });
                res.json({ message: 'User habilitado', user });
            }
            catch (err) {
                console.error('Error al habilitar el user:', err);
                res.status(500).json({ error: 'Error al habilitar el user' });
            }
        });
    }
}
exports.usersController = new UsersController();
