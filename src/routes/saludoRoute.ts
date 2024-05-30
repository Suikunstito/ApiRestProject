// src/routes/saludoRoutes.ts
import { Router } from 'express';
import { enviarSaludo } from '../controllers/saludoController';

const router = Router();

// Ruta para enviar un saludo
router.get('/', enviarSaludo);

export default router;
