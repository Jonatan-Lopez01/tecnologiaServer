"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importar CORS
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const ofertasRoutes_1 = __importDefault(require("./routes/ofertasRoutes"));
const categoriasRoutes_1 = __importDefault(require("./routes/categoriasRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Importa cookie-parser
const morgan_1 = __importDefault(require("morgan")); // Importa morgan
const dotenv_1 = __importDefault(require("dotenv"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        dotenv_1.default.config();
    }
    config() {
        this.app.set('port', process.env.PORTSERVER || 3000);
        this.app.use((0, cors_1.default)()); // Permite que tu servidor acepte solicitudes desde otros dominios. (Front <-> Back)
        this.app.use(express_1.default.json()); // Middleware para procesar JSON
        this.app.use((0, cookie_parser_1.default)()); // Middleware para procesar cookies
        this.app.use((0, morgan_1.default)('combined')); // Registra solicitudes HTTP usando el formato 'combined'
    }
    routes() {
        this.app.use('/api', loginRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/users', usersRoutes_1.default);
        this.app.use('/api/ofertas', ofertasRoutes_1.default);
        this.app.use('/api/ofertas', categoriasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto:', this.app.get('port'));
            console.log('Base de datos:', process.env.NAME_DATABASE);
        });
    }
}
const server = new Server();
server.start();
