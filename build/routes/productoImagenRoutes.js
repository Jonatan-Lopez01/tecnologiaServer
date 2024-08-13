"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoImagenController_1 = require("../controllers/productoImagenController");
//import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación
class ProductoImagenRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aplica el middleware de autenticación a todas las rutas
        //this.router.use(authMiddleware);
        this.router.get('/list', productoImagenController_1.productoImagenController.getAll);
        this.router.get('/listOne/:id', productoImagenController_1.productoImagenController.getById);
        this.router.post('/createProdImg', productoImagenController_1.productoImagenController.create);
        this.router.put('/updateProdImg/:id', productoImagenController_1.productoImagenController.update);
        this.router.delete('/deleteProdImg/:id', productoImagenController_1.productoImagenController.delete);
    }
}
const productoImagenRoutes = new ProductoImagenRoutes();
exports.default = productoImagenRoutes.router;
