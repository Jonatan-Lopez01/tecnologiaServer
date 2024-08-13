import { Request, Response } from 'express';
import prisma from '../prismaClient'; // Importa PrismaClient
import encriptacion from '../seguridad/encriptacion'
import auth from '../seguridad/auth';

class UsersController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await prisma.users.findMany();
            res.json(users);
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await prisma.users.findUnique({
                where: { id_user: Number(id) }
            });
            if (user) {
                res.json(user);
            } else {
                res.status(400).json({ error: 'Usuario no encontrado' });
            }
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const { nombre, telefono, email, createdAt, updatedAt, id_rol } = req.body;
        let password = req.body.password;
        password = await encriptacion.createHashValue(password);

        try {
            const newUser = await prisma.users.create({
                data: {
                    nombre,
                    telefono,
                    email,
                    password,
                    createdAt,
                    updatedAt,
                    id_rol
                }
            });

            // Generar el token
            const token = auth.tokenizar(newUser.id_user);

            // Definir maxAge basado en el rol
            const tiempoExp = newUser.id_rol === 1 || newUser.id_rol === 4 ? 36000000 : 7200000; // 10 horas o 2 horas
            // Configurar la cookie con el token
            res.cookie('access_token', token, {
                httpOnly: true, // La cookie solo será accesible desde el servidor
                secure: process.env.MODO_DESARROLLO === 'produccion', // En producción, la cookie solo se enviará a través de HTTPS
                maxAge: tiempoExp //Tiempo de expiracion de la cookie, no del token.
            });

            // Enviar la respuesta con el nuevo usuario
            res.json(newUser);
        } catch (err) {
            console.error('Error al crear un usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, telefono, email, password, estatus, updatedAt, id_rol } = req.body;
        try {
            const updatedUser = await prisma.users.update({
                where: { id_user: Number(id) },
                data: {
                    nombre,
                    telefono,
                    email,
                    password,
                    estatus,
                    updatedAt,
                    id_rol
                }
            });
            res.json(updatedUser);
        } catch (err) {
            console.error('Error al actualizar el:', err);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.users.delete({
                where: { id_user: Number(id) }
            });
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }
    async disabledUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await prisma.users.update({
                where: { id_user: Number(id) },
                data: { estatus: 0 }  // Cambiar el estatus a '0' para deshabilitar
            });
            res.json({ message: 'User deshabilitado', user });
        } catch (err) {
            console.error('Error al deshabilitar el user:', err);
            res.status(500).json({ error: 'Error al deshabilitar el user' });
        }
    }
    async enabledUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await prisma.users.update({
                where: { id_user: Number(id) },
                data: { estatus: 1 }  // Cambiar el estatus a '0' para deshabilitar
            });
            res.json({ message: 'User habilitado', user });
        } catch (err) {
            console.error('Error al habilitar el user:', err);
            res.status(500).json({ error: 'Error al habilitar el user' });
        }
    }
}

export const usersController = new UsersController();
