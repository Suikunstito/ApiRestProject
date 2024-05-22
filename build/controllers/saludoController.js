"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarSaludo = void 0;
const enviarSaludo = (_req, res) => {
    const mensaje = '¡Hola desde la API!';
    res.json({ mensaje });
};
exports.enviarSaludo = enviarSaludo;
