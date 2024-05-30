import { Schema, model, Document, Types } from 'mongoose';

// Definir la interfaz con el tipo de Document para incluir automáticamente las propiedades de Mongoose
interface INegocio extends Document {
    nombre: string;
    ubicacion: string;
    descripcion: string;
    propietarioId: Types.ObjectId; // Usar Types.ObjectId de mongoose
}

// Crear el esquema del negocio
const negocioSchema = new Schema<INegocio>({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String },
    propietarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

// Crear el modelo
const Negocio = model<INegocio>('Negocio', negocioSchema);

export default Negocio;
