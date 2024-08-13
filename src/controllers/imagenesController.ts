import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ImagenesController {
  // Crear una nueva imagen.
  async createImage(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      const newImagen = await prisma.imagenes.create({
        data: {
          url,
        },
      });
      res.status(201).json(newImagen);
    } catch (err) {
      console.error('Error al crear imagen: ', err);
      res.status(500).json({ error: 'Error al crear imagen' });
    }
  }

  // Obtener todas las imágenes
  async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const imagenes = await prisma.imagenes.findMany();
      res.json(imagenes);
    } catch (err) {
      console.error('Error al listar imagenes: ', err);
      res.status(500).json({ error: 'Error al listar imagenes' });
    }
  }

  // Obtener una imagen por id
  async getImageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const imagen = await prisma.imagenes.findUnique({
        where: { id_imagen: Number(id) }
      });
      if (!imagen) {
        res.status(400).json({ error: 'Imagen no encontrada.' });
        return;
      }
      res.json(imagen);
    } catch (err) {
      console.error('Error al listar una imagen: ', err);
      res.status(500).json({ error: 'Error al listar una imagen' });
    }
  }

  // Actualizar una imagen por id
  async updateImage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { url } = req.body;
      const updatedImagen = await prisma.imagenes.update({
        where: { id_imagen: Number(id) },
        data: {
          url,
        }
      });
      res.json(updatedImagen);
    } catch (err) {
      console.error('Error al actualizar una imagen: ', err);
      res.status(500).json({ error: 'Error al actualizar imagen' });
    }
  }

  // Eliminar una imagen por id
  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.imagenes.delete({
        where: { id_imagen: Number(id) },
      });
       res.json({ error: 'Imagen eliminada exitosamente.' });
    } catch (err) {
      console.error('Error al eliminar la imagen: ', err);
      res.status(500).json({ error: 'Error al eliminar la imagen:' });
    }
  }
}

export const imagenesController = new ImagenesController();
