import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./PdfFormPage.css";
import { useForm } from "../../context/FormsContext";

interface PDFForm {
  titulo: string;
  file: string | File;
}

export default function PdfFormPage() {
  const { addFormId } = useForm();
  const [formPDF, setFormPDF] = useState<PDFForm>({
    titulo: "",
    file: "",
  });

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setFormPDF({
        ...formPDF,
        file: file,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormPDF({
      ...formPDF,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (formPDF.file && formPDF.titulo) { // COMPROBAMOS SI EL FORMULARIO FUE COMPLETADO PARA ENVIAR LA INFORMACION AL BACK
      const formData = new FormData();
      formData.append("file", formPDF.file);
      formData.append("titulo", formPDF.titulo);

      const response = await fetch("http://localhost:3001/api/prueba/pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const file = data?.file;

        addFormId({id: file.id, name: "pdf"})

        alert("Formulario completado con exito")
      } else {
        alert("Error en la solicitud");
      }
    } else {
      alert("Completar todos los campos")
    }
  };

  return (
    <>
      <Nav />
      <main className="pdf-form-page-all-container">
        <h2>Formulario PDF</h2>
        <form onSubmit={handleFormSubmit} className="pdf-form">
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
            <label htmlFor="PDF">PDF</label>
            <input
              onChange={handleFileInputChange}
              type="file"
              name="path"
              id="PDF"
              accept="application/pdf"
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </main>
    </>
  );
}
