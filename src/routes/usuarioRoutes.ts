import { Router } from 'express';
import { addUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/usuarioController';

const router = Router();

// Rutas CRUD para usuarios
router.post('/', addUser);            // Crear un usuario
router.get('/', getUsers);            // Leer todos los usuarios
router.get('/:id', getUserById);      // Leer un usuario por ID
router.put('/:id', updateUser);       // Actualizar un usuario
router.delete('/:id', deleteUser);    // Eliminar un usuario

export default router;
