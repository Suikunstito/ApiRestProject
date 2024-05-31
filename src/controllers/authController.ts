import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarios';

interface CustomRequest extends Request {
    userId: string;
  }
// Generar token JWT para un usuario autenticado
export const generarToken = (usuarioId: string) => {
    return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET || '', {
        expiresIn: '1h' // El token expirará en 1 hora, puedes ajustarlo según tus necesidades
    });
};

// Controlador para iniciar sesión y generar un token JWT
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas: email no encontrado' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({ message: 'Credenciales incorrectas: contraseña incorrecta' });
        }

        // Generar token JWT
        const token = generarToken(usuario._id.toString());
        
        // Enviar el token como respuesta
        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }

    // Add this return statement to handle the case where the user is not found or the password is incorrect
    return res.status(401).json({ message: 'Credenciales incorrectas' });
};

export const logout = async (_req: Request, res: Response) => {
    try {
        // Elimina el token JWT del usuario (si estás utilizando cookies)
        res.clearCookie('token'); // Elimina una cookie llamada 'token' (si estás utilizando cookies)
        // O elimina el token almacenado en el almacenamiento local (si estás utilizando React Native)
        // AsyncStorage.removeItem('token'); // Por ejemplo, si estás usando AsyncStorage en React Native

        // Envía una respuesta exitosa al cliente
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
// Middleware para verificar el token JWT en las solicitudes protegidas
export const verificarToken = (req: CustomRequest, res: Response, next: Function) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
        req.userId = decoded.id; // Agregar el ID del usuario decodificado a la solicitud
        next(); // Continuar con la siguiente función de middleware
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }

    // Add this return statement to handle the case where the token is not provided or is invalid
    return res.status(401).json({ message: 'Token no válido' });
};