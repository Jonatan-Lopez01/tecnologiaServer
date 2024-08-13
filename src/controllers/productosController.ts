import { Request, Response } from "express";
import prisma from "../prismaClient";


class ProductosController
{
    public async getAllProductos(req:Request, res:Response): Promise<void> 
    {
        try
        {
            const listProductos= await prisma.productos.findMany();
            res.json(listProductos);

        }catch (err){
            console.log("Error al listar los productos");
            res.status(500).json({err: 'Error al listar los prodcutos'});
        }
    }
    public async getProductoById (req:Request, res:Response)
    {
        const {id} = req.params;
        try 
        {
            const producto = await prisma.productos.findUnique({
                where: {id_producto: Number(id)}
            });
            if(producto){
                res.json(producto);
            }else{
                res.status(400).json({error: 'Oferta no encontrada'})
            }
        }catch(err)
        {
            console.log("Error al obtener el producto: ", err);
            res.status(500).json({error: 'Error en el servidor'});
        }
    }
    public async deleteProducto (req:Request, res:Response): Promise<void>
    {
        const {id} = req.params;
        try
        {
            await prisma.productos.delete({
                where: {id_producto: Number(id)}
            });

        }catch (err){
            console.log("Error al eliminar el producto", err);
            res.status(500).json({error: 'Error al eliminar el producto'})
        }
    }
    public async createProducto(req:Request, res:Response): Promise<void>
    {
        const {nombre, cant_existencia, precio_unitario, caracteristicas, id_categoria, createdAt, updatedAt}= req.body;
        try
        {
            const newProducto = await prisma.productos.create({
                data:{
                    nombre,
                    cant_existencia,
                    precio_unitario,
                    caracteristicas,
                    id_categoria,
                    createdAt,
                    updatedAt
                }
            });
            res.json(newProducto);

        }catch(err){
            console.log("Error al crear un producto: ", err);
            res.status(500).json({error: 'Error al crear un producto'}) 
        }
    }

    public async updateProducto(req:Request, res:Response): Promise<void> 
    {
        const {id}= req.params;
        const {nombre, cant_existencia, estatus, precio_unitario,caracteristicas, id_categoria,updatedAt} = req.body;

        try
        {
            const updateProducto = await prisma.productos.update({
                where: { id_producto: Number(id)},
                data:{
                    nombre,
                    cant_existencia,
                    estatus,
                    precio_unitario,
                    caracteristicas,
                    id_categoria,
                    updatedAt   
                }
            });
            res.json(updateProducto);

        }catch(err){
            console.log("Error al actualizar el producto: ", err);
            res.status(500).json({error: 'Error al actualizar el producto'});
            
        }
    }
}

export const productosController = new ProductosController();