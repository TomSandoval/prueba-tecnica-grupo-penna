import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserFormPage from "./pages/UserFormPage/UserFormPage.tsx";
import PdfFormPage from "./pages/PdfFormPage/PdfFormPage.tsx";
import ImageFormPage from "./pages/ImageFormPage/ImageFormPage.tsx";
import CarouselPage from "./pages/CarouselPage/CarouselPage.tsx";
import { FormProvider } from "./context/FormsContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/userform",
    element: <UserFormPage />,
  },
  {
    path: "/pdfform",
    element: <PdfFormPage />,
  },
  {
    path: "/imageform",
    element: <ImageFormPage />,
  },
  {
    path: "/carousel",
    element: <CarouselPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  </React.StrictMode>
);
