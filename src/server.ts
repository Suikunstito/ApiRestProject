import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/mongodb';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);

const startServer = async () => {
    await connectDB();
    
    app.get('/', async (_req, res) => {
        try {
            console.log('Raiz consultada');
            res.send('Hello World! Database connection established.');
        } catch (error: any) {
            console.error('Error al conectar a la base de datos:', error.message);
            res.status(500).send('Error al conectar a la base de datos.');
        }
    });

    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
};

startServer().catch((error) => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
});
