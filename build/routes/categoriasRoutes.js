"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriasController_1 = require("../controllers/categoriasController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Importa el middleware de autenticación
class CategoriasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aplica el middleware de autenticación a todas las rutas
        this.router.use(authMiddleware_1.default);
        this.router.get('/list', categoriasController_1.categoriasController.getAllCategorias);
        this.router.get('/listOne/:id', categoriasController_1.categoriasController.getCategoriaById);
        this.router.post('/createCategory', categoriasController_1.categoriasController.createCategoria);
        this.router.put('/updateCategory/:id', categoriasController_1.categoriasController.updateCategoria);
        this.router.delete('/deleteCategory/:id', categoriasController_1.categoriasController.deleteCategoria);
        this.router.put('/disabledCategory/:id', categoriasController_1.categoriasController.disabledCategoria);
        this.router.put('/enabledCategory/:id', categoriasController_1.categoriasController.enabledCategoria);
    }
}
const categoriasRoutes = new CategoriasRoutes();
exports.default = categoriasRoutes.router;
