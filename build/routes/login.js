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
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
const auth_1 = __importDefault(require("../seguridad/auth")); // Importa la clase de autenticación
const encriptacion_1 = __importDefault(require("../seguridad/encriptacion"));
class Login {
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Buscar al usuario en la base de datos
                const user = yield prismaClient_1.default.users.findUnique({
                    where: { email }
                });
                if (!user) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                // Verificar la contraseña
                const isPasswordValid = yield encriptacion_1.default.validatePassword(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ error: 'Contraseña incorrecta' });
                    return;
                }
                // Crear un token de acceso
                const token = auth_1.default.tokenizar(user.id_rol);
                // Definir maxAge basado en el rol
                const tiempoExp = user.id_rol === 1 || user.id_rol === 4 ? 36000000 : 7200000; // 10 horas o 2 horas
                // Configurar la cookie con el token
                res.cookie('access_token', token, {
                    httpOnly: true, // La cookie solo será accesible desde el servidor
                    secure: process.env.MODO_DESARROLLO === 'produccion', // En producción, la cookie solo se enviará a través de HTTPS
                    maxAge: tiempoExp //Tiempo de expiracion de la cookie, no del token.
                });
                res.json({ message: 'Inicio de sesión exitoso',
                    user
                });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al iniciar sesión' });
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Eliminar la cookie
                res.clearCookie('access_token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'
                });
                res.json({ message: 'Sesión cerrada exitosamente' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al cerrar sesión' });
            }
        });
    }
}
const login = new Login();
exports.default = login;
