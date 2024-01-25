import { UserResponse } from "../interfaces/UserResponseInterface";

export async function getUser(id: number){
    const response = await fetch(`http://localhost:3001/api/prueba/users/${id}`);
    const userResponse : UserResponse = await response.json()

    return userResponse.user
}