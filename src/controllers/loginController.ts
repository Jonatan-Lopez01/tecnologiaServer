import { Request, Response } from 'express';
import prisma from '../prismaClient'; // Importa PrismaClient
import auth from '../seguridad/auth'; // Importa la clase de autenticación
import encriptacion from '../seguridad/encriptacion';

class Login {
    public async logIn(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            // Buscar al usuario en la base de datos
            const userDb = await prisma.users.findUnique({
                where: { email }
            });

            if (!userDb) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            // Verificar la contraseña
            const isPasswordValid = await encriptacion.validatePassword(password, userDb.password);

            if (!isPasswordValid) {
                res.status(401).json({ error: 'Contraseña incorrecta' });
                return;
            }

            // Crear un token de acceso
            const token = auth.tokenizar(userDb.id_rol);

            // Definir maxAge basado en el rol
            const tiempoExp = userDb.id_rol === 1 || userDb.id_rol === 4 ? 36000000 : 7200000; // 10 horas o 2 horas
            // Configurar la cookie con el token
            res.cookie('access_token', token, {
                httpOnly: true, // La cookie solo será accesible desde el servidor
                secure: process.env.MODO_DESARROLLO === 'produccion', // En producción, la cookie solo se enviará a través de HTTPS
                maxAge: tiempoExp //Tiempo de expiracion de la cookie, no del token.
            });

            const { password: _, ...user } = userDb;//Eliminamos el campos de password.
            res.json({ message: 'Inicio de sesión exitoso',user
             });
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }

    public async logOut(req: Request, res: Response): Promise<void> {
        try {
            // Eliminar la cookie
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'produccion'
            });

            res.json({ message: 'Sesión cerrada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al cerrar sesión' });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { nombre, telefono, email, createdAt, updatedAt} = req.body;
        const id_rol= 3; //rol de comprador
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

            const tiempoExp = 7200000; //2 horas
            // Configurar la cookie con el token
            res.cookie('access_token', token, {
                httpOnly: true, // La cookie solo será accesible desde el servidor
                secure: process.env.MODO_DESARROLLO === 'produccion', // En producción, la cookie solo se enviará a través de HTTPS
                maxAge: tiempoExp //Tiempo de expiracion de la cookie, no del token.
            });

            // Enviar la respuesta con el nuevo usuario
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }
}

const loginController = new Login();
export default loginController;
