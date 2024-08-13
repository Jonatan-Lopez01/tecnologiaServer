import { Request, Response } from 'express';
import prisma from '../prismaClient'; // Importa PrismaClient

class OfertasController {
    // Obtener todas las ofertas
    public async getAllOfertas(req: Request, res: Response): Promise<void> {
        try {
            const ofertas = await prisma.ofertas.findMany();
            res.json(ofertas);
        } catch (err) {
            console.log("Error al obtener ofertas: ", err);
            res.status(500).json({ error: 'Error al obtener las ofertas' });
        }
    }

    // Obtener una oferta por su ID
    public async getOfertaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const oferta = await prisma.ofertas.findUnique({
                where: { id_oferta: Number(id) }
            });
            if (oferta) {
                res.json(oferta);
            } else {
                res.status(400).json({ error: 'Oferta no encontrada' });
            }
        } catch (err) {
            console.log("Error al obtener la oferta: ", err);
            res.status(500).json({ error: 'Error al obtener la oferta' });
        }
    }

    // Crear una nueva oferta
    public async createOferta(req: Request, res: Response): Promise<void> {
        const { id_producto, porc_oferta, fecha_inicio, fecha_fin, precio_original, precio_oferta, descripcion, createdAt, updatedAt } = req.body;
        try {
            const newOferta = await prisma.ofertas.create({
                data: {
                    id_producto,
                    porc_oferta,
                    fecha_inicio,
                    fecha_fin,
                    precio_original,
                    precio_oferta,
                    descripcion,
                    createdAt,
                    updatedAt
                }
            });
            res.json(newOferta);
        } catch (err) {
            console.error('Error al crear la oferta:', err); // Registrar el error en la consola
            res.status(500).json({ error: 'Error al crear la oferta' });
        }
    }

    // Actualizar una oferta existente
    public async updateOferta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { id_producto, porc_oferta, fecha_inicio, fecha_fin, precio_original, precio_oferta, descripcion, updatedAt } = req.body;
        try {
            const updatedOferta = await prisma.ofertas.update({
                where: { id_oferta: Number(id) },
                data: {
                    id_producto,
                    porc_oferta,
                    fecha_inicio,
                    fecha_fin,
                    precio_original,
                    precio_oferta,
                    descripcion,
                    updatedAt
                }
            });
            res.json(updatedOferta);
        } catch (err) {
            console.log("Error al actualizar la oferta: ", err);
            res.status(500).json({ error: 'Error al actualizar la oferta' });
        }
    }

    // Eliminar una oferta
    public async deleteOferta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.ofertas.delete({
                where: { id_oferta: Number(id) }
            });
            res.json({ message: 'Oferta eliminada exitosamente' });
        } catch (err) {
            console.log("Error al eliminar la oferta: ", err);
            res.status(500).json({ error: 'Error al eliminar la oferta' });
        }
    }

    // Deshabilitar una oferta (cambiar estatus a 0)
    public async disableOferta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const oferta = await prisma.ofertas.update({
                where: { id_oferta: Number(id) },
                data: { estatus: 0 }
            });
            res.json({ message: 'Oferta deshabilitada', oferta });
        } catch (err) {
            console.error('Error al deshabilitar la oferta:', err);
            res.status(500).json({ error: 'Error al deshabilitar la oferta' });
        }
    }

    // Habilitar una oferta (cambiar estatus a 1)
    public async enableOferta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const oferta = await prisma.ofertas.update({
                where: { id_oferta: Number(id) },
                data: { estatus: 1 }
            });
            res.json({ message: 'Oferta habilitada', oferta });
        } catch (err) {
            console.error('Error al habilitar la oferta:', err);
            res.status(500).json({ error: 'Error al habilitar la oferta' });
        }
    }
}

export const ofertasController = new OfertasController();
