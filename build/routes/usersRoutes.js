"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.use(authMiddleware_1.default); //Autenticacion para manejar estas rutas.
        this.router.get('/list', usersController_1.usersController.getAllUsers);
        this.router.get('/listOne/:id', usersController_1.usersController.getUserById);
        this.router.post('/createUser', usersController_1.usersController.createUser);
        this.router.put('/updateUser/:id', usersController_1.usersController.updateUser);
        this.router.delete('/deleteUser/:id', usersController_1.usersController.deleteUser);
        this.router.put('/disabledUser/:id', usersController_1.usersController.disabledUser);
        this.router.put('/enabledUser/:id', usersController_1.usersController.enabledUser);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
