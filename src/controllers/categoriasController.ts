import { Request, Response } from 'express';
import prisma from '../prismaClient'; // Importa PrismaClient

class CategoriasController {
    // Obtener todas las categorías
    public async getAllCategorias(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await prisma.categorias.findMany();
            res.json(categorias);
        } catch (err) {
            console.log("Error al obtener las categorias: ", err);
            res.status(500).json({ error: 'Error al obtener las categorías' });
        }
    }

    // Obtener una categoría por su ID
    public async getCategoriaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const categoria = await prisma.categorias.findUnique({
                where: { id_categoria: Number(id) }
            });
            if (categoria) {
                res.json(categoria);
            } else {
                res.status(400).json({ error: 'Categoría no encontrada' });
            }
        } catch (err) {
            console.log("Error al obtener la categoria: ", err);
            res.status(500).json({ error: 'Error al obtener la categoría' });
        }
    }

    // Crear una nueva categoría
    public async createCategoria(req: Request, res: Response): Promise<void> {
        const { nombre, createdAt, updatedAt} = req.body;
        try {
            const newCategoria = await prisma.categorias.create({
                data: {
                    nombre,
                    createdAt,
                    updatedAt,
                }
            });
            res.json(newCategoria);
        } catch (err) {
            console.error('Error al crear la categoría:', err); // Registrar el error en la consola
            res.status(500).json({ error: 'Error al crear la categoría' });
        }
    }

    // Actualizar una categoría existente
    public async updateCategoria(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, updatedAt} = req.body;
        try {
            const updatedCategoria = await prisma.categorias.update({
                where: { id_categoria: Number(id) },
                data: {
                    nombre,
                    updatedAt
                }
            });
            res.json(updatedCategoria);
        } catch (err) {
            console.log("Error al actualizar la categoria: ", err);
            res.status(500).json({ error: 'Error al actualizar la categoría' });
        }
    }

    // Eliminar una categoría
    public async deleteCategoria(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.categorias.delete({
                where: { id_categoria: Number(id) }
            });
            res.json({ message: 'Categoría eliminada exitosamente' });
        } catch (err) {
            console.log("Error al eliminar la categoria: ", err);
            res.status(500).json({ error: 'Error al eliminar la categoría' });
        }
    }

    // Deshabilitar una categoría (cambiar estatus a 0)
    public async disabledCategoria(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const categoria = await prisma.categorias.update({
                where: { id_categoria: Number(id) },
                data: { estatus: 0 }
            });
            res.json({ message: 'Categoría deshabilitada', categoria });
        } catch (err) {
            console.error('Error al deshabilitar la categoría:', err);
            res.status(500).json({ error: 'Error al deshabilitar la categoría' });
        }
    }

    // Habilitar una categoría (cambiar estatus a 1)
    public async enabledCategoria(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const categoria = await prisma.categorias.update({
                where: { id_categoria: Number(id) },
                data: { estatus: 1 }
            });
            res.json({ message: 'Categoría habilitada', categoria });
        } catch (err) {
            console.error('Error al habilitar la categoría:', err);
            res.status(500).json({ error: 'Error al habilitar la categoría' });
        }
    }
}

export const categoriasController = new CategoriasController();
