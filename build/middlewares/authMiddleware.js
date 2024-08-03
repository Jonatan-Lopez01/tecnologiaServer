"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../seguridad/auth"));
const authMiddleware = (req, res, next) => {
    var _a;
    // Obtener el token de las cookies o del encabezado
    const token = req.cookies['access_token'] || ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''));
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    try {
        // Verificar el token usando la clase Auth
        const decoded = auth_1.default.isAuthorized(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Token no válido' });
        }
        console.log(req);
        req.user = decoded; // Agregar el usuario decodificado al objeto de solicitud
        console.log(req);
        next(); // Continuar con la siguiente función de middleware
    }
    catch (err) {
        res.status(401).json({ error: 'Token no válido' });
    }
};
exports.default = authMiddleware;
