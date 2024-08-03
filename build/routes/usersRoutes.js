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
        this.router.get('/getAll', usersController_1.usersController.getAllUsers);
        this.router.get('/getOne/:id', usersController_1.usersController.getUserById);
        this.router.post('/createUser', usersController_1.usersController.createUser);
        this.router.put('/updateUser/:id', usersController_1.usersController.updateUser);
        this.router.delete('/deleteUser/:id', usersController_1.usersController.deleteUser);
        this.router.put('/disableUser/:id', usersController_1.usersController.disableUser);
        this.router.put('/enableUser/:id', usersController_1.usersController.enableUser);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
