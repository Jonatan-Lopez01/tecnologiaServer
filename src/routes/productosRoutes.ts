import { Router } from 'express';
import { productosController } from '../controllers/productosController';
import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación



class ProductosRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Aplica el middleware de autenticación a todas las rutas
        //this.router.use(authMiddleware);

        this.router.get('/list', productosController.getAllProductos);
        this.router.get('/listOne/:id', productosController.getProductoById);
        this.router.post('/createProducto', productosController.createProducto);
        this.router.put('/updateProducto/:id', productosController.updateProducto);
        this.router.delete('/deleteProducto/:id', productosController.deleteProducto);
    }
}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;
