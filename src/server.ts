// Import the express module to create a web server.
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { enviarSaludo } from './controllers/saludoController';
import { addUser } from './controllers/UsuarioController';
import mongoose from 'mongoose';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);

// Inicializa una instancia de la aplicación express.
const app = express();

// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express.json());

// Conecta a la base de datos y arranca el servidor.
const startServer = async () => {
    await connectDB();

    // Define la ruta GET para el saludo.
    app.get('/saludo', enviarSaludo);

    // Define la ruta GET para la raíz.
    app.get('/', async (_req, res) => {
        try {
            // Realiza una consulta a la base de datos.
            const users = await mongoose.connection.db.collection('usuarios').find().toArray();
            console.log('Resultado de la consulta:', users);

            res.send('Hello World! Database connection established.');
        } catch (error: any) {
            console.error('Error al conectar a la base de datos:', error.message);
            res.status(500).send('Error al conectar a la base de datos.');
        }
    });

    // Define la ruta POST para agregar un usuario.
    app.post('/usuarios', addUser);

    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor corriendo en http://<tu-ip-local>:${port}`);
    });
};

startServer().catch((error) => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
});