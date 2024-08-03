import { Request, Response, NextFunction } from 'express';
import auth from '../seguridad/auth';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el token de las cookies o del encabezado
    const token = req.cookies['access_token'] || req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verificar el token usando la clase Auth
        const decoded = auth.isAuthorized(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Token no válido' });
        }
        console.log(req);
        (req as any).user = decoded; // Agregar el usuario decodificado al objeto de solicitud
        console.log(req)
        next(); // Continuar con la siguiente función de middleware
    } catch (err) {
        res.status(401).json({ error: 'Token no válido' });
    }
};

export default authMiddleware;
