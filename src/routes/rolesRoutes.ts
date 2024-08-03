import { Router } from 'express';
import { rolesController } from '../controllers/rolesController';
import authMiddleware from '../middlewares/authMiddleware'; // Importa el middleware de autenticación

class RolesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Aplica el middleware de autenticación a todas las rutas
        this.router.use(authMiddleware);

        this.router.get('/getAll', rolesController.getAllRoles);
        this.router.get('/getOne/:id', rolesController.getRoleById);
        this.router.post('/createRole', rolesController.createRole);
        this.router.put('/updateRole/:id', rolesController.updateRole);
        this.router.delete('/deleteRole/:id', rolesController.deleteRole);
        this.router.put('/disableRole/:id', rolesController.disableRole);
        this.router.put('/enableRole/:id', rolesController.enableRole);
    }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
