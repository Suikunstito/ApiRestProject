import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/mongodb';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);

const startServer = async () => {
    try {
        await connectDB(); 

        app.get('/', async (_req, res) => {
            console.log('Raiz consultada');
            res.send('Hello World! Database connection established.');
        });

        app.listen(port, '0.0.0.0', () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error); 
        process.exit(1); // Exit on critical errors
    }
};

startServer(); 