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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const database_1 = require("../database");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, password } = req.body;
    if (!id || !email || !password) {
        res.status(400).send('Missing user attributes');
        return;
    }
    let dbConnection;
    try {
        dbConnection = yield (0, database_1.connectToDatabase)();
        console.log('Connected to Oracle Database');
        const query = 'INSERT INTO Usuarios (id, email, password) VALUES (:id, :email, :password)';
        const binds = { id, email, password };
        yield dbConnection.execute(query, binds, { autoCommit: true });
        res.status(201).send('User added successfully');
    }
    catch (error) {
        console.error('Error adding user to the database:', error.message);
        res.status(500).send('Error adding user to the database');
    }
    finally {
        if (dbConnection) {
            yield dbConnection.close();
            console.log('Database connection closed');
        }
    }
});
exports.addUser = addUser;
