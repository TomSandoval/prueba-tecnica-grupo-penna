interface User {
    id: number,
    nombre: string,
    apellido: string,
    numero: string,
    fecha: string,
}

export interface UserResponse {
    user: User
}
