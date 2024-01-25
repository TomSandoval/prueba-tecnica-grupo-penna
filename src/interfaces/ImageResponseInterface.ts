export interface ImageResponse {
    images: Image[]
}

export interface Image{
    id: number,
    titulo: string,
    imagePath: string,
}