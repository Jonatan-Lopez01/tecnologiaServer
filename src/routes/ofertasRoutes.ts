import { Router } from 'express';
import { ofertasController } from '../controllers/ofertasController';
import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación

class OfertasRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Aplica el middleware de autenticación a todas las rutas
        this.router.use(authMiddleware);

        this.router.get('/list', ofertasController.getAllOfertas);
        this.router.get('/listOne/:id', ofertasController.getOfertaById);
        this.router.post('/createOffer', ofertasController.createOferta);
        this.router.put('/updateOffer/:id', ofertasController.updateOferta);
        this.router.delete('/deleteOffer/:id', ofertasController.deleteOferta);
        this.router.put('/disableOffer/:id', ofertasController.disableOferta);
        this.router.put('/enableOffer/:id', ofertasController.enableOferta);
    }
}

const ofertasRoutes = new OfertasRoutes();
export default ofertasRoutes.router;
