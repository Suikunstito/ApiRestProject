import express from 'express';
import { login, logout } from '../controllers/authController';

const router = express.Router();

// Ruta para iniciar sesión (login)
router.post('/login', login);

// Ruta para cerrar sesión (logout) - Si tu aplicación lo requiere
router.post('/logout', logout);

export default router;
