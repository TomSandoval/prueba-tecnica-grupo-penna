import { PdfResponse } from "../interfaces/PdfResponseInterface";

export async function getPdf(id: number) {
  const response = await fetch("http://localhost:3001/api/prueba/pdf");

  if (!response.ok) {
    throw new Error("Error te get images");
  } else {
    const data: PdfResponse = await response.json();
    const file = data.files.filter((image) => image.id === id);
    return file[0];
  }
}
