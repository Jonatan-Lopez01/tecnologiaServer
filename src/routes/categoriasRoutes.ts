import { Router } from 'express';
import { categoriasController } from '../controllers/categoriasController';
import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación

class CategoriasRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Aplica el middleware de autenticación a todas las rutas
        this.router.use(authMiddleware);

        this.router.get('/list', categoriasController.getAllCategorias);
        this.router.get('/listOne/:id', categoriasController.getCategoriaById);
        this.router.post('/createCategory', categoriasController.createCategoria);
        this.router.put('/updateCategory/:id', categoriasController.updateCategoria);
        this.router.delete('/deleteCategory/:id', categoriasController.deleteCategoria);
        this.router.put('/disabledCategory/:id', categoriasController.disabledCategoria);
        this.router.put('/enabledCategory/:id', categoriasController.enabledCategoria);
    }
}

const categoriasRoutes = new CategoriasRoutes();
export default categoriasRoutes.router;
