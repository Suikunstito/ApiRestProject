import oracledb, { ConnectionAttributes, Connection  } from 'oracledb';
// Define los parámetros de conexión a la base de datos Oracle
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: ConnectionAttributes  = {
    user: 'ADMIN',
    password: 'Fabian6129**',
    connectString: 'localhost:1521/orcl'
};

// Función para establecer la conexión a la base de datos
export async function connectToDatabase() {
    let connection: Connection;
    console.log('datos de conexion:', process.env.DB_CONNECT_STRING);

    try {
        // Intenta conectarte a la base de datos usando los parámetros de conexión
        connection = await oracledb.getConnection(dbConfig);
        
        console.log('Conexión establecida a Oracle Database');

        // Devuelve la conexión para que pueda ser utilizada en otros módulos
        return connection;
    } catch (error: any) {
        console.error('Error al conectar a la base de datos:', error.message);
        throw error; // Lanza el error para manejarlo en otro lugar de tu aplicación
    }
}
