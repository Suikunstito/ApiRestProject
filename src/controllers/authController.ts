
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarios';

interface CustomRequest extends Request {
    userId: string;
}
// Generar token JWT para un usuario autenticado
export const generarToken = (usuarioId: string) => 
    jwt.sign({ id: usuarioId }, process.env.JWT_SECRET || '',
    { expiresIn: '1h' }
);


// Controlador para iniciar sesión y generar un token JWT
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ email });

            if (!usuario) return res.status(401).json({ message: 'Credenciales incorrectas: email no encontrado' });

            const passwordValido = await bcrypt.compare(password, usuario.password);

            if (!passwordValido) return res.status(401).json({ message: 'Credenciales incorrectas: contraseña incorrecta' });
            // Generate JWT token
            const token = generarToken(usuario.id);

            return res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                token,
                userId: usuario.id,
            });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }

        return res.status(401).json({ message: 'Credenciales incorrectas' });
    } catch (error) {
        next(error);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        // Elimina el token JWT del usuario (si estás utilizando cookies)
        res.clearCookie('token'); // Elimina una cookie llamada 'token' (si estás utilizando cookies)
        // O elimina el token almacenado en el almacenamiento local (si estás utilizando React Native)
        // AsyncStorage.removeItem('token'); // Por ejemplo, si estás usando AsyncStorage en React Native

        // Envía una respuesta exitosa al cliente
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        next(error);
    }
};
// Middleware para verificar el token JWT en las solicitudes protegidas
export const verificarToken = (req: CustomRequest, _res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');

        if (!token) throw new Error('Token no proporcionado');

        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
        req.userId = decoded.id;
    } catch (error) {
        next(error);
    }
};
