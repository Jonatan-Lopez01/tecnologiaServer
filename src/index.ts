import express, { Application } from 'express';
import cors from 'cors'; // Importar CORS
import rolesRoutes from './routes/rolesRoutes';
import usersRoutes from './routes/usersRoutes';
import loginRoutes from './routes/loginRoutes';
import cookieParser from 'cookie-parser'; // Importa cookie-parser
import morgan from 'morgan'; // Importa morgan
import dotenv from 'dotenv';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        dotenv.config();
    }

    config(): void {
        this.app.set('port', process.env.PORTSERVER || 3000);
        this.app.use(cors());         // Permite que tu servidor acepte solicitudes desde otros dominios. (Front <-> Back)
        this.app.use(express.json()); // Middleware para procesar JSON
        this.app.use(cookieParser()); // Middleware para procesar cookies
        this.app.use(morgan('combined')); // Registra solicitudes HTTP usando el formato 'combined'
    }

    routes(): void {
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api', loginRoutes);

    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto:', this.app.get('port'));
            console.log('Base de datos:', process.env.NAME_DATABASE);
        });
    }
}

const server = new Server();
server.start();