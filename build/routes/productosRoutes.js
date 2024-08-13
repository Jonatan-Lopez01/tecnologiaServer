"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
class ProductosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aplica el middleware de autenticación a todas las rutas
        //this.router.use(authMiddleware);
        this.router.get('/list', productosController_1.productosController.getAllProductos);
        this.router.get('/listOne/:id', productosController_1.productosController.getProductoById);
        this.router.post('/createProducto', productosController_1.productosController.createProducto);
        this.router.put('/updateProducto/:id', productosController_1.productosController.updateProducto);
        this.router.delete('/deleteProducto/:id', productosController_1.productosController.deleteProducto);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
