import jwt from 'jsonwebtoken';

class Auth {
    private secretKey: string;

    constructor() {
        // Define your secret key (should be stored securely in environment variables)
        this.secretKey = process.env.JWT_SECRET_KEY || 'claveCualquiera';
    }

        public tokenizar(userId: number): string {
            const token = jwt.sign({ userId }, this.secretKey, { expiresIn: '10h' }); //Firmemente el token expira en 10 horas 
            return token;
        }

    public isAuthorized(token: string): any {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded;
        } catch (error) {
            return null; // Token no válido o ha expirado
        }
    }
}

const auth = new Auth();
export default auth;
