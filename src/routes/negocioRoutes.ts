import { Router } from 'express';
import { addNegocio, getNegocios, getNegocioById, updateNegocio, deleteNegocio } from '../controllers/negocioController';

const router = Router();

// Rutas CRUD para negocios
router.post('/', addNegocio);           // Crear un negocio
router.get('/', getNegocios);           // Leer todos los negocios
router.get('/:id', getNegocioById);     // Leer un negocio por ID
router.put('/:id', updateNegocio);      // Actualizar un negocio
router.delete('/:id', deleteNegocio);   // Eliminar un negocio

export default router;
