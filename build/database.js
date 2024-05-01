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
exports.connectToDatabase = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
// Define los parámetros de conexión a la base de datos Oracle
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
};
// Función para establecer la conexión a la base de datos
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        console.log('datos de conexion:', process.env.DB_CONNECT_STRING);
        try {
            // Intenta conectarte a la base de datos usando los parámetros de conexión
            connection = yield oracledb_1.default.getConnection(dbConfig);
            console.log('Conexión establecida a Oracle Database');
            // Devuelve la conexión para que pueda ser utilizada en otros módulos
            return connection;
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error.message);
            throw error; // Lanza el error para manejarlo en otro lugar de tu aplicación
        }
    });
}
exports.connectToDatabase = connectToDatabase;
