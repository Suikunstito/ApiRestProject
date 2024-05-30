// src/server.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import connectDB from './config/db';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);

const startServer = async () => {
    await connectDB();

    app.get('/', async (_req, res) => {
        try {
            const users = await mongoose.connection.db.collection('usuarios').find().toArray();
            console.log('Resultado de la consulta:', users);

            res.send('Hello World! Database connection established.');
        } catch (error: any) {
            console.error('Error al conectar a la base de datos:', error.message);
            res.status(500).send('Error al conectar a la base de datos.');
        }
    });

    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor corriendo en http://<tu-ip-local>:${port}`);
    });
};

startServer().catch((error) => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
});
