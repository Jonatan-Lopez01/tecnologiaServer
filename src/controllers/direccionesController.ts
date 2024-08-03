import { Request, Response } from 'express';
import prisma from '../prismaClient'; // Importa PrismaClient

class DireccionesController {
    public async getAllDirecciones(req: Request, res: Response): Promise<void> {
        try {
            const direcciones = await prisma.direcciones.findMany();
            res.json(direcciones);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener direcciones' });
        }
    }

    public async getDireccionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const direccion = await prisma.direcciones.findUnique({
                where: { id_direccion: Number(id) }
            });
            if (direccion) {
                res.json(direccion);
            } else {
                res.status(404).json({ error: 'Dirección no encontrada' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la dirección' });
        }
    }

    public async createDireccion(req: Request, res: Response): Promise<void> {
        const { calle, num_int, num_ext, colonia, municipio, estado, cp, id_user } = req.body;
        try {
            const newDireccion = await prisma.direcciones.create({
                data: {
                    calle,
                    num_int,
                    num_ext,
                    colonia,
                    municipio,
                    estado,
                    cp,
                    id_user
                }
            });
            res.json(newDireccion);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear la dirección' });
        }
    }

    public async updateDireccion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { calle, num_int, num_ext, colonia, municipio, estado, cp, id_user } = req.body;
        try {
            const updatedDireccion = await prisma.direcciones.update({
                where: { id_direccion: Number(id) },
                data: {
                    calle,
                    num_int,
                    num_ext,
                    colonia,
                    municipio,
                    estado,
                    cp,
                    id_user
                }
            });
            res.json(updatedDireccion);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la dirección' });
        }
    }

    public async deleteDireccion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.direcciones.delete({
                where: { id_direccion: Number(id) }
            });
            res.json({ message: 'Dirección eliminada exitosamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar la dirección' });
        }
    }
}

export const direccionesController = new DireccionesController();
