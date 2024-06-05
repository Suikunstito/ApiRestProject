import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import saludoRoute from './routes/saludoRoute';
import negocioRoutes from './routes/negocioRoutes';
import authRoutes from './routes/authRoutes';
import errorHandler from './middleware/errorHandler';
// import { adminRouter, adminJs } from './config/adminjs';

// Inicializa una instancia de la aplicación express.
const app = express();

// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express.json());

// Apply error handler middleware
app.use(errorHandler);

// Rutas de AdminJS
// app.use(adminJs.options.rootPath, adminRouter); // Agrega el router de AdminJS

// Rutas de tu aplicación
app.use('/saludo', saludoRoute);
app.use('/usuarios', usuarioRoutes);
app.use('/negocios', negocioRoutes);
app.use('/auth', authRoutes);

export default app;
