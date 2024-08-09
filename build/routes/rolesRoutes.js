"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("../controllers/rolesController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Importa el middleware de autenticación
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Aplica el middleware de autenticación a todas las rutas
        this.router.use(authMiddleware_1.default);
        this.router.get('/list', rolesController_1.rolesController.getAllRoles);
        this.router.get('/listOne/:id', rolesController_1.rolesController.getRoleById);
        this.router.post('/createRole', rolesController_1.rolesController.createRole);
        this.router.put('/updateRole/:id', rolesController_1.rolesController.updateRole);
        this.router.delete('/deleteRole/:id', rolesController_1.rolesController.deleteRole);
        this.router.put('/disableRole/:id', rolesController_1.rolesController.disableRole);
        this.router.put('/enableRole/:id', rolesController_1.rolesController.enableRole);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
