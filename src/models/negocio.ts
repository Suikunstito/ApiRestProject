import { Schema, model, Document, Types } from 'mongoose';

// Definir la interfaz con el tipo de Document para incluir automáticamente las propiedades de Mongoose
interface INegocio extends Document {
    nombre: string;
    ubicacion: {
        type: string;
        coordinates: [number, number];
    };
    descripcion: string;
    propietarioId: Types.ObjectId; // Usar Types.ObjectId de mongoose
}

// Crear el esquema del negocio
const negocioSchema = new Schema<INegocio>({
    nombre: { type: String, required: true },
    ubicacion: {
        type: {
            type: String,
            enum: ['Point'], // Permitir solo el tipo 'Point' para coordenadas geoespaciales
            required: true,
            default: 'Point', // Valor por defecto para el tipo
        },
        coordinates: {
            type: [Number], // Arreglo de dos números para latitud y longitud
            required: true,
        },
    },
    descripcion: { type: String },
    propietarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

// Índice especial para consultas geoespaciales
negocioSchema.index({ ubicacion: '2dsphere' });

// Crear el modelo
const Negocio = model<INegocio>('Negocio', negocioSchema);

export default Negocio;
