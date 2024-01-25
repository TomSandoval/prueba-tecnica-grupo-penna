import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./ImageFormPage.css";
import { useForm } from "../../context/FormsContext";

interface ImageForm {
  titulo: string;
  file: string | File;
}

export default function ImageFormPage() {
  const { addFormId } = useForm();
  const [imageForm, setImageForm] = useState<ImageForm>({
    titulo: "",
    file: "",
  });

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setImageForm({
        ...imageForm,
        file,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setImageForm({
      ...imageForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (imageForm.titulo && imageForm.file) { // COMPROBAMOS SI EL FORMULARIO FUE COMPLETADO PARA ENVIAR LA INFORMACION AL BACK
      const formData = new FormData();
      formData.append("image", imageForm.file);
      formData.append("titulo", imageForm.titulo);

      const response = await fetch("http://localhost:3001/api/prueba/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const image = data.image;

        addFormId({ id: image.id, name: "image" });
        alert("Formulario completado con exito");
      } else {
        console.log(data);
        alert("Error en la solicitud");
      }
    } else {
      alert("Completar todos los campos");
    }
  };

  return (
    <>
      <Nav />
      <main className="image-form-page-all-container">
        <h2>Formulario imagen</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Titulo</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="titulo"
              id="titulo"
            />
          </div>
          <div>
            <label htmlFor="image">Imagen</label>

            <input
              onChange={handleFileInputChange}
              type="file"
              name="image"
              id="image"
              accept="image/png, image/jpeg"
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </main>
    </>
  );
}
