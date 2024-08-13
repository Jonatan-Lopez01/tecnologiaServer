import { Router } from 'express';
import { imagenesController } from '../controllers/imagenesController';
//import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación


class ImagenesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Aplica el middleware de autenticación a todas las rutas
        //this.router.use(authMiddleware);

        this.router.get('/list', imagenesController.getAllImages);
        this.router.get('/listOne/:id', imagenesController.getImageById);
        this.router.post('/createImagen', imagenesController.createImage);
        this.router.put('/updateImagen/:id', imagenesController.updateImage);
        this.router.delete('/deleteImagen/:id', imagenesController.deleteImage);
    }
}

const imagenesRoutes = new ImagenesRoutes();
export default imagenesRoutes.router;
