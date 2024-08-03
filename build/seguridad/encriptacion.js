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
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encriptacion {
    /**
     * Función para crear un valor hash utilizando bcrypt.
     */
    createHashValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            // Genera un salt con un factor de costo de 10
            const salt = yield bcrypt_1.default.genSalt(10);
            // Hashea el valor utilizando el salt generado
            return bcrypt_1.default.hash(value, salt);
        });
    }
    /**
     * Función para validar si una contraseña coincide con el hash almacenado.
     * passPlane - La contraseña en texto plano.
     * passDatabase - El hash almacenado en la base de datos.
     *`true` si la contraseña coincide, `false` si no.
     */
    validatePassword(passPlane, passDatabase) {
        return __awaiter(this, void 0, void 0, function* () {
            // Compara la contraseña en texto plano con el hash almacenado
            return bcrypt_1.default.compare(passPlane, passDatabase);
        });
    }
}
const encriptacion = new Encriptacion();
exports.default = encriptacion;
