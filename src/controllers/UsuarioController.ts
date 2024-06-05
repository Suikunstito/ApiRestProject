import { Request, Response, NextFunction } from 'express';
import Usuario from '../models/usuarios';
import bcrypt from 'bcryptjs';

// Crear un usuario
export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    const { nombre, email, password } = req.body;

    // Input validation
    if (!email ||!password) return res.status(400).json({ message: 'Email y contraseña son requeridos' });

    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Email inválido' });

    if (password.length < 6) return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El usuario con este email ya existe' });
        }

        // Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });

        // Guardar el usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (error) {
        next(error);
    }
    return;
};

// Leer todos los usuarios
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find().exec();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Leer un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
    return;
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    const { nombre, email, password } = req.body;

    // Input validation
    if (nombre === undefined && email === undefined && password === undefined) return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar' });

    if (email &&!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Email inválido' });
    
    if (password && password.length < 6) return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });


    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // If password is updated, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            usuarioActualizado.password = hashedPassword;
            await usuarioActualizado.save();
        }

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
    return;
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
    return;
};
