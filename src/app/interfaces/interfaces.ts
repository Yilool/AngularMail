//jwt despues del login
export interface DatosConJwt {
    jwt: string;
}

export interface ListadoMensajes {
    mensajes: Mensaje[];
    totalMensajes: number;
}

export interface Mensaje {
    id: number;
    remitente: UsuarioMinimo,
    destinatarios: UsuarioMinimo[],
    fecha: Date;
    asunto: string;
    cuerpo: string;
    leido: boolean;
    archivado: boolean;
    fechaEliminacion: Date;
    spam: boolean;
}

// export interface Mensaje {
//     id: number;
//     asunto: string;
//     cuerpo: string;
//     fecha: Date;
// }

export interface Usuario {
    id: number;
    nombre: string;
    usuario: string;
    password: string;
    email: string;
    fechaNacimiento: Date;
    fechaEliminacion: Date;
    nacionalidad: number;
    sexo: number;
    imagen: string;
}

//datos minimo usuario
export interface UsuarioMinimo {
    id: number;
    nombre: string;
}

export interface Nacionalidad {
    id: number;
    descripcion: string;
}

export interface TipoSexo {
    id: number;
    descripcion: string;
}