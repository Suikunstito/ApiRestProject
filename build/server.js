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
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const saludoController_1 = require("./controllers/saludoController");
const UsuarioController_1 = require("./controllers/UsuarioController");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT || '3000', 10);
// Inicializa una instancia de la aplicación express.
const app = (0, express_1.default)();
// Configura express para que pueda analizar solicitudes en formato JSON.
app.use(express_1.default.json());
// Conecta a la base de datos y arranca el servidor.
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    // Define la ruta GET para el saludo.
    app.get('/saludo', saludoController_1.enviarSaludo);
    // Define la ruta GET para la raíz.
    app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Realiza una consulta a la base de datos.
            const users = yield mongoose_1.default.connection.db.collection('usuarios').find().toArray();
            console.log('Resultado de la consulta:', users);
            res.send('Hello World! Database connection established.');
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error.message);
            res.status(500).send('Error al conectar a la base de datos.');
        }
    }));
    // Define la ruta POST para agregar un usuario.
    app.post('/usuarios', UsuarioController_1.addUser);
    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor corriendo en http://<tu-ip-local>:${port}`);
    });
});
startServer().catch((error) => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
});
