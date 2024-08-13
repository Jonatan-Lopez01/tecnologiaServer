import { Router } from 'express';
import { productoImagenController } from '../controllers/productoImagenController';
//import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación

class ProductoImagenRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Aplica el middleware de autenticación a todas las rutas
        //this.router.use(authMiddleware);

        this.router.get('/list', productoImagenController.getAll);
        this.router.get('/listOne/:id', productoImagenController.getById);
        this.router.post('/createProdImg', productoImagenController.create);
        this.router.put('/updateProdImg/:id', productoImagenController.update);
        this.router.delete('/deleteProdImg/:id', productoImagenController.delete);
    }
}

const productoImagenRoutes = new ProductoImagenRoutes();
export default productoImagenRoutes.router;
