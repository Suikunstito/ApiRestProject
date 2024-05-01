"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the express module to create a web server.
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
// Initialize an instance of the express application.
const app = (0, express_1.default)();
// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express_1.default.json());
//  Define el puerto que recibe la solicitud.
const PORT = process.env.PORT || 3000;
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dbConnection; // Variable para almacenar la conexión a la base de datos
    try {
        // Intenta conectar a la base de datos al recibir una solicitud en la ruta raíz
        dbConnection = yield (0, database_1.connectToDatabase)();
        console.log('Conexión establecida a Oracle Database');
        // Ejemplo: realiza una consulta a la base de datos
        const result = yield dbConnection.execute('SELECT * usuarios');
        console.log('Resultado de la consulta:', result.rows);
        res.send('Hello World! Database connection established.');
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        res.status(500).send('Error al conectar a la base de datos.');
    }
    finally {
        // Cierra la conexión a la base de datos después de realizar la operación
        if (dbConnection) {
            yield dbConnection.close();
            console.log('Conexión cerrada correctamente.');
        }
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
