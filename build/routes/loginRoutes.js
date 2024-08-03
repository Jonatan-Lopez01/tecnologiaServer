"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', loginController_1.default.logIn);
        this.router.post('/logout', loginController_1.default.logOut);
        this.router.post('/register', loginController_1.default.register);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
