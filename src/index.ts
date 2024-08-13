import express, { Application } from 'express';
import cors from 'cors'; // Importar CORS
import rolesRoutes from './routes/rolesRoutes';
import usersRoutes from './routes/usersRoutes';
import loginRoutes from './routes/loginRoutes';
import ofertasRoutes from './routes/ofertasRoutes';
import categoriasRoutes from './routes/categoriasRoutes';
import direccionesRoutes from './routes/direccionesRoutes';
import productoImagenRoutes from './routes/productoImagenRoutes';
import productosRoutes from './routes/productosRoutes';
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
        this.app.use('/api', loginRoutes);
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/direcciones',direccionesRoutes);
        this.app.use('/api/ofertas',ofertasRoutes);
        this.app.use('/api/categorias',categoriasRoutes);
        this.app.use('/api/productoImagen', productoImagenRoutes);
        this.app.use('/api/productos', productosRoutes);
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
