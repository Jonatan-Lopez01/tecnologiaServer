import bcrypt from 'bcrypt';

class Encriptacion {
    /**
     * Función para crear un valor hash utilizando bcrypt.
     */
    public async createHashValue(value: string): Promise<string> {
        // Genera un salt con un factor de costo de 10
        const salt = await bcrypt.genSalt(10);

        // Hashea el valor utilizando el salt generado
        return bcrypt.hash(value, salt);
    }

    /**
     * Función para validar si una contraseña coincide con el hash almacenado.
     * passPlane - La contraseña en texto plano.
     * passDatabase - El hash almacenado en la base de datos.
     *`true` si la contraseña coincide, `false` si no.
     */
    public async validatePassword(passPlane: string, passDatabase: string): Promise<boolean> {
        // Compara la contraseña en texto plano con el hash almacenado
        return bcrypt.compare(passPlane, passDatabase);
    }
}

const encriptacion = new Encriptacion();
export default encriptacion;

