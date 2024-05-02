import { Request, Response } from 'express';

export const enviarSaludo = (_req: Request, res: Response) => {
    const mensaje = '¡Hola desde la API!';
    res.json({ mensaje });
};
