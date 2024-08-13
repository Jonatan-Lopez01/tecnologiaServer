import { Request, Response } from 'express';
import prisma from '../prismaClient' // Importa PrismaClient

class RolesController {
    public async getAllRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await prisma.roles.findMany();
            res.json(roles);
        } catch (err) {
            console.log("Error al obtener roles: ", err);
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    }

    public async getRoleById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const role = await prisma.roles.findUnique({
                where: { id_rol: Number(id) }
            });
            if (role) {
                res.json(role);
            } else {
                res.status(400).json({ error: 'Rol no encontrado' });
            }
        } catch (err) {
            console.log("Error al obtener el rol: ", err);
            res.status(500).json({ error: 'Error al obtener el rol' });
        }
    }

    public async createRole(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, estatus, createdAt, updatedAt } = req.body;
        try {
            const newRole = await prisma.roles.create({
                data: {
                    nombre,
                    descripcion,
                    estatus,
                    createdAt,
                    updatedAt
                }
            });
            res.json(newRole);
        } catch (err) {
            console.error('Error al crear el rol:', err); // Registrar el error en la consola
            res.status(500).json({ error: 'Error al crear el rol' });
        }
    }

    public async updateRole(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, descripcion, estatus, updatedAt } = req.body;
        try {
            const updatedRole = await prisma.roles.update({
                where: { id_rol: Number(id) },
                data: {
                    nombre,
                    descripcion,
                    estatus,
                    updatedAt
                }
            });
            res.json(updatedRole);
        } catch (err) {
            console.log("Error al actualizar el rol: ", err);
            res.status(500).json({ error: 'Error al actualizar el rol' });
        }
    }

    public async deleteRole(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.roles.delete({
                where: { id_rol: Number(id) }
            });
            res.json({ message: 'Rol eliminado exitosamente' });
        } catch (err) {
            console.log("Error al eliminar el rol: ", err);
            res.status(500).json({ error: 'Error al eliminar el rol' });
        }
    }
    async disabledRole(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const role = await prisma.roles.update({
                where: { id_rol: Number(id) },
                data: { estatus: 0 }  // Cambiar el estatus a '0' para deshabilitar
            });
            res.json({ message: 'Rol deshabilitado', role });
        } catch (err) {
            console.error('Error al deshabilitar el rol:', err);
            res.status(500).json({ error: 'Error al deshabilitar el rol' });
        }
    }
    async enabledRole(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const role = await prisma.roles.update({
                where: { id_rol: Number(id) },
                data: { estatus: 1 }  // Cambiar el estatus a '0' para deshabilitar
            });
            res.json({ message: 'Rol habilitado', role });
        } catch (err) {
            console.error('Error al habilitar el rol:', err);
            res.status(500).json({ error: 'Error al habilitar el rol' });
        }
    }
}


export const rolesController = new RolesController();