import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductoImagenController {
  // Crear un nuevo producto_imagen
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { id_producto, id_imagen } = req.body;
      const newProductoImagen = await prisma.producto_imagen.create({
        data: {
          id_producto,
          id_imagen,
        },
      });
      res.json(newProductoImagen);
    } catch (err) {
      console.error('Error al crear producto_imagen: ', err);
      res.status(500).json({ error: 'Error al crear producto_imagen' });
    }
  }

  // Obtener todos los producto_imagen
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const productoImagenes = await prisma.producto_imagen.findMany();
      res.json(productoImagenes);
    } catch (err) {
      console.error('Error al listar producto_imagenes: ', err);
      res.status(500).json({ error: 'Error al listar producto_imagenes' });
    }
  }

  // Obtener un producto_imagen por id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productoImagen = await prisma.producto_imagen.findUnique({
        where: { id_producto_imagen: Number(id) }
      });
      if (!productoImagen) {
        res.status(400).json({ error: 'ProductoImagen no encontrado' });
        return;
      }
      res.json(productoImagen);
    } catch (err) {
      console.error('Error al buscar producto_imagen', err);
      res.status(500).json({ error: 'Error al buscar producto_imagen' });
    }
  }

  // Actualizar un producto_imagen por id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { id_producto, id_imagen } = req.body;
      const updatedProductoImagen = await prisma.producto_imagen.update({
        where: { id_producto_imagen: Number(id) },
        data: {
          id_producto,
          id_imagen,
        }
      });
      res.json(updatedProductoImagen);
    } catch (err) {
      console.error('Error al actualizar producto_imagenes: ', err);
      res.status(500).json({ error: 'Error al actualizar producto_imagen' });
    }
  }

  // Eliminar un producto_imagen por id
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.producto_imagen.delete({
        where: { id_producto_imagen: Number(id) },
      });
      res.json({ message: 'Rol eliminado exitosamente' });
    } catch (err) {
      console.error('Error al borrar producto_imagenes: ', err);
      res.status(500).json({ error: 'Error al borrar producto_imagen' });
    }
  }
}

export const productoImagenController = new ProductoImagenController();
