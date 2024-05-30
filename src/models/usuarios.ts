import { Schema, model } from 'mongoose';

interface IUsuario {
    nombre: string;
    email: string;
    password: string;
    negocioId?: Schema.Types.ObjectId;
}

const usuarioSchema = new Schema<IUsuario>({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    negocioId: { type: Schema.Types.ObjectId, ref: 'Negocio' }
});

const Usuario = model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;
