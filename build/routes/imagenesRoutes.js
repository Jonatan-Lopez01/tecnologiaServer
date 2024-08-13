"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagenesController_1 = require("../controllers/imagenesController");
//import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación
class ImagenesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aplica el middleware de autenticación a todas las rutas
        //this.router.use(authMiddleware);
        this.router.get('/list', imagenesController_1.imagenesController.getAllImages);
        this.router.get('/listOne/:id', imagenesController_1.imagenesController.getImageById);
        this.router.post('/createImagen', imagenesController_1.imagenesController.createImage);
        this.router.put('/updateImagen/:id', imagenesController_1.imagenesController.updateImage);
        this.router.delete('/deleteImagen/:id', imagenesController_1.imagenesController.deleteImage);
    }
}
const imagenesRoutes = new ImagenesRoutes();
exports.default = imagenesRoutes.router;
