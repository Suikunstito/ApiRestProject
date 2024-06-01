import { Request, Response } from 'express';
import Negocio from '../models/negocio';
import Usuario from '../models/usuarios';

// Crear un negocio
export const addNegocio = async (req: Request, res: Response) => {
    const { nombre, ubicacion, descripcion, propietarioId } = req.body;
    console.log('Solicitud recibida:', req.body);
    try {
        const usuario = await Usuario.findById(propietarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (usuario.negocioId) {
            return res.status(400).json({ message: 'El usuario ya tiene un negocio registrado' });
        }

        const nuevoNegocio = new Negocio({ nombre, ubicacion, descripcion, propietarioId });
        const negocioGuardado = await nuevoNegocio.save();

        (usuario as any).negocioId = negocioGuardado._id;
        await usuario.save();

        res.status(201).json(negocioGuardado);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: (error as Error).message });
    }
    return;
};

// Leer todos los negocios
export const getNegocios = async (_req: Request, res: Response) => {
    try {
        const negocios = await Negocio.find();
        res.status(200).json(negocios);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getNegocioByPropietarioId = async (req: Request, res: Response) => {
    const { propietarioId } = req.params;
    
    try {
        const negocio = await Negocio.findOne({ propietarioId: propietarioId });
        if (!negocio) {
            return res.status(200).json({ message: 'No se encontraron negocios para este propietario' });
        }
        res.status(200).json(negocio);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
    return;
};
// Leer un negocio por ID
export const getNegocioById = async (req: Request, res: Response) => {
    try {
        const negocio = await Negocio.findById(req.params.id);
        if (!negocio) {
            return res.status(404).json({ message: 'Negocio no encontrado' });
        }
        res.status(200).json(negocio);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
    return;
};

// Actualizar un negocio
export const updateNegocio = async (req: Request, res: Response) => {
    try {
        const negocioActualizado = await Negocio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!negocioActualizado) {
            return res.status(404).json({ message: 'Negocio no encontrado' });
        }
        res.status(200).json(negocioActualizado);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
    return;
};

// Eliminar un negocio
export const deleteNegocio = async (req: Request, res: Response) => {
    try {
        const negocioEliminado = await Negocio.findByIdAndDelete(req.params.id);
        if (!negocioEliminado) {
            return res.status(404).json({ message: 'Negocio no encontrado' });
        }
        res.status(200).json({ message: 'Negocio eliminado' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
    return;
};
