import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./UserFormPage.css";
import { useForm } from "../../context/FormsContext";

interface FormUser {
  nombre: string;
  apellido: string;
  numero: string;
  fecha: string;
}

export default function UserFormPage() {
  const { addFormId } = useForm();
  const [formData, setFormData] = useState<FormUser>({
    nombre: "",
    apellido: "",
    numero: "",
    fecha: "",
  });

  const getActuallyDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }; // OBTENEMOS LA FECHA ACTUAL PARA PONERLA COMO MAX EN EL INPUT TYPE DATE

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitUserForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (
      // COMPROBAMOS SI EL FORMULARIO FUE COMPLETADO, DE SER ASI ENVIAMOS EL USUARIO AL BACK
      !formData.nombre ||
      !formData.apellido ||
      !formData.numero ||
      !formData.fecha
    ) {
      alert("Completar el formulario para enviar la información");
      return;
    } else {
      const response = await fetch("http://localhost:3001/api/prueba/users", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        addFormId({ id: user.id, name: "users" });
        alert("Usuario guardado con exito")
      } else {
        alert(data.error);
      }
    }
  };

  return (
    <>
      <Nav />
      <main className="user-form-page-all-container">
        <h2>Formulario de usuario</h2>
        <form onSubmit={handleSubmitUserForm}>
          <div className="user-form-two-inputs-container">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={handleChange}
                type="text"
                name="nombre"
                id="nombre"
              />
            </div>
            <div>
              <label htmlFor="apellido">Apellido</label>
              <input
                onChange={handleChange}
                type="text"
                name="apellido"
                id="apellido"
              />
            </div>
          </div>
          <div className="user-form-two-inputs-container">
            <div>
              <label htmlFor="numero">Numero de telefono</label>
              <input
                onChange={handleChange}
                type="text"
                name="numero"
                id="numero"
              />
            </div>
            <div>
              <label htmlFor="fecha">Fecha de nacimiento</label>
              <input
                onChange={handleChange}
                max={getActuallyDate()}
                type="date"
                name="fecha"
                id="fecha"
              />
            </div>
          </div>
          <input type="submit" value="Enviar datos" />
        </form>
      </main>
    </>
  );
}
