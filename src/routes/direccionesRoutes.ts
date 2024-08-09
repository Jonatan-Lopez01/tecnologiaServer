import { Router } from 'express';
import { direccionesController } from '../controllers/direccionesController';
import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación

class DireccionesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.use(authMiddleware); //Autenticacion para manejar estas rutas.


        this.router.get('/list', direccionesController.getAllDirecciones);
        this.router.get('/listOne/:id', direccionesController.getDireccionById);
        this.router.post('/createDireccion', direccionesController.createDireccion);
        this.router.put('/updateDireccion/:id', direccionesController.updateDireccion);
        this.router.delete('/deleteDireccion/:id', direccionesController.deleteDireccion);
    }
}

const direccionesRoutes = new DireccionesRoutes();
export default direccionesRoutes.router;
