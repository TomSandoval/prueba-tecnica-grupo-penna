import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { useForm } from "./context/FormsContext";
import { getUser } from "./helpers/getUser";
import { getPdf } from "./helpers/getPdf";
import { getImage } from "./helpers/getImage";

function App() {
  const { formIds } = useForm();
  const [pdfData, setPdfData] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const [imageData, setImageData] = useState<any>({});

  useEffect(() => {
    const existPdf = formIds.find((form) => form.name === "pdf");
    const existUser = formIds.find((form) => form.name === "users");
    const existImage = formIds.find((form) => form.name === "image");

    if (existPdf) {
      getPdf(existPdf.id).then((response) => setPdfData(response));
    }

    if (existUser) {
      getUser(existUser.id).then((response) => setUserData(response));
    }

    if (existImage) {
      getImage(existImage.id).then((response) => setImageData(response));
    }
  }, []);

  return (
    <>
      <Nav />
      <main className="home-all-container">
        {!pdfData.id || !userData.id || !imageData.id ? (
          <h2>Completar los formularios para ver la información</h2>
        ) : (
          <div>
            {userData.id && (
              <div>
                <div>
                  <h4>Nombre y apellido: {userData.nombre} {userData.apellido}</h4>
                </div>
                <div>
                  <h4>Telfono: {userData.numero}</h4> <h4>Fecha de nacimiento: {userData.fecha}</h4>
                </div>
              </div>
            )}
            {pdfData && (
              <div className="pdf-container">
                <h4>{pdfData.titulo}</h4>
                <iframe src={pdfData.path} width="100%" height="600px"></iframe>
              </div>
            )}
            {
              imageData && <div>
                <img className="image-home" src={imageData.imagePath} alt={imageData.titulo} />
              </div>
            }
          </div>
        )}
      </main>
    </>
  );
}

export default App;
