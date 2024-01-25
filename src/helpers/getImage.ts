import { ImageResponse } from "../interfaces/ImageResponseInterface";

export async function getImage(id: number) {
  const response = await fetch("http://localhost:3001/api/prueba/image");

  if (!response.ok) {
    throw new Error("Error te get images");
  } else {
    const data: ImageResponse = await response.json();
    const image = data.images.filter((image) => image.id === id);
    return image[0];
  }
}
