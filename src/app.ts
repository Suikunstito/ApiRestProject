// Import the express module to create a web server.
import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import saludoRoute from './routes/saludoRoute';
import negocioRoutes from './routes/negocioRoutes';

// Inicializa una instancia de la aplicación express.
const app = express();

// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express.json());

// Rutas
app.use('/saludo', saludoRoute);
app.use('/usuarios', usuarioRoutes);
app.use('/negocios', negocioRoutes);


export default app;
