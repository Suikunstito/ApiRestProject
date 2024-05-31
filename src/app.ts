import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import saludoRoute from './routes/saludoRoute';
import negocioRoutes from './routes/negocioRoutes';
import authRoutes from './routes/authRoutes';

// Inicializa una instancia de la aplicación express.
const app = express();

// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express.json());

// Rutas
app.use('/saludo', saludoRoute);
app.use('/usuarios', usuarioRoutes);
app.use('/negocios', negocioRoutes);
app.use('/auth', authRoutes);

export default app;
