"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor() {
        // Define your secret key (should be stored securely in environment variables)
        this.secretKey = process.env.JWT_SECRET_KEY || 'claveCualquiera';
    }
    tokenizar(userId) {
        const token = jsonwebtoken_1.default.sign({ userId }, this.secretKey, { expiresIn: '10h' }); //Firmemente el token expira en 10 horas 
        return token;
    }
    isAuthorized(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            return decoded;
        }
        catch (error) {
            return null; // Token no válido o ha expirado
        }
    }
}
const auth = new Auth();
exports.default = auth;
