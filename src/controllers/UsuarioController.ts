    import { Request, Response } from 'express';
    import Usuario from '../models/usuarios';
    import bcrypt from 'bcryptjs';

    // Crear un usuario
    export const addUser = async (req: Request, res: Response) => {
        const { nombre, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
            const usuarioGuardado = await nuevoUsuario.save();
            res.status(201).json(usuarioGuardado);
        } catch (error) {
        res.status(400).json({ message: (error as Error).message });  
        }
    };

    // Leer todos los usuarios
    export const getUsers = async (_req: Request, res: Response) => {
        try {
            const usuarios = await Usuario.find();
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
        try {
            const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!usuarioActualizado) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
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
