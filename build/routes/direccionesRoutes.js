"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const direccionesController_1 = require("../controllers/direccionesController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Importa el middleware de autenticación
class DireccionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.use(authMiddleware_1.default); //Autenticacion para manejar estas rutas.
        this.router.get('/getAll', direccionesController_1.direccionesController.getAllDirecciones);
        this.router.get('/getOne/:id', direccionesController_1.direccionesController.getDireccionById);
        this.router.post('/createDireccion', direccionesController_1.direccionesController.createDireccion);
        this.router.put('/updateDireccion/:id', direccionesController_1.direccionesController.updateDireccion);
        this.router.delete('/deleteDireccion/:id', direccionesController_1.direccionesController.deleteDireccion);
    }
}
const direccionesRoutes = new DireccionesRoutes();
exports.default = direccionesRoutes.router;
