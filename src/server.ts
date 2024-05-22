// Import the express module to create a web server.
import express from 'express';
import { connectToDatabase } from './database';
import { enviarSaludo } from './controllers/saludoController';

// Initialize an instance of the express application.
const app = express();

// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express.json());
//  Define el puerto que recibe la solicitud.
const port = 3000;

app.get('/saludo', enviarSaludo);

app.get('/', async (_req, res) => {
  let dbConnection; // Variable para almacenar la conexión a la base de datos
  try {
      // Intenta conectar a la base de datos al recibir una solicitud en la ruta raíz
      dbConnection = await connectToDatabase();
      console.log('Conexión establecida a Oracle Database');

      // Ejemplo: realiza una consulta a la base de datos
      const result = await dbConnection.execute('SELECT * usuarios');
      console.log('Resultado de la consulta:', result.rows);

      res.send('Hello World! Database connection established.');
  } catch (error: any) {
      console.error('Error al conectar a la base de datos:', error.message);
      res.status(500).send('Error al conectar a la base de datos.');
  } finally {
      // Cierra la conexión a la base de datos después de realizar la operación
      if (dbConnection) {
          await dbConnection.close();
          console.log('Conexión cerrada correctamente.');
      }
  }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://<tu-ip-local>:${port}`);
  });