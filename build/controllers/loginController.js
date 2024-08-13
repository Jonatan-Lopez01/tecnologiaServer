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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient")); // Importa PrismaClient
const auth_1 = __importDefault(require("../seguridad/auth")); // Importa la clase de autenticación
const encriptacion_1 = __importDefault(require("../seguridad/encriptacion"));
class Login {
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Buscar al usuario en la base de datos
                const userDb = yield prismaClient_1.default.users.findUnique({
                    where: { email }
                });
                if (!userDb) {
                    res.status(400).json({ error: 'Credenciales invalidas' });
                    return;
                }
                // Verificar la contraseña
                const isPasswordValid = yield encriptacion_1.default.validatePassword(password, userDb.password);
                if (!isPasswordValid) {
                    res.status(400).json({ error: 'Credenciales invalidas' });
                    return;
                }
                // Crear un token de acceso
                const token = auth_1.default.tokenizar(userDb.id_rol);
                // Definir maxAge basado en el rol
                const tiempoExp = userDb.id_rol === 1 || userDb.id_rol === 4 ? 36000000 : 7200000; // 10 horas o 2 horas
                // Configurar la cookie con el token
                res.cookie('access_token', token, {
                    httpOnly: true, // La cookie solo será accesible desde el servidor
                    secure: process.env.MODO_DESARROLLO === 'produccion', // En producción, la cookie solo se enviará a través de HTTPS
                    maxAge: tiempoExp //Tiempo de expiracion de la cookie, no del token.
                });
                const { password: _ } = userDb, user = __rest(userDb, ["password"]); //Eliminamos el campos de password.
                res.json({ message: 'Inicio de sesión exitoso', user
                });
            }
            catch (err) {
                console.log("Error al iniciar sesión:", err);
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
                    secure: process.env.NODE_ENV === 'produccion'
                });
                res.json({ message: 'Sesión cerrada exitosamente' });
            }
            catch (err) {
                console.log("Error al cerrar sesión: ", err);
                res.status(500).json({ error: 'Error al cerrar sesión' });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, telefono, email, createdAt, updatedAt } = req.body;
            const id_rol = 3; //rol de comprador
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
                const tiempoExp = 7200000; //2 horas
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
                console.log("Error al registrarse:", err);
                res.status(500).json({ error: 'Error al registrarse:' });
            }
        });
    }
}
exports.loginController = new Login();
