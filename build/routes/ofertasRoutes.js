"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ofertasController_1 = require("../controllers/ofertasController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Importa el middleware de autenticación
class OfertasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aplica el middleware de autenticación a todas las rutas
        this.router.use(authMiddleware_1.default);
        this.router.get('/list', ofertasController_1.ofertasController.getAllOfertas);
        this.router.get('/listOne/:id', ofertasController_1.ofertasController.getOfertaById);
        this.router.post('/createOffer', ofertasController_1.ofertasController.createOferta);
        this.router.put('/updateOffer/:id', ofertasController_1.ofertasController.updateOferta);
        this.router.delete('/deleteOffer/:id', ofertasController_1.ofertasController.deleteOferta);
        this.router.put('/disableOffer/:id', ofertasController_1.ofertasController.disableOferta);
        this.router.put('/enableOffer/:id', ofertasController_1.ofertasController.enableOferta);
    }
}
const ofertasRoutes = new OfertasRoutes();
exports.default = ofertasRoutes.router;
