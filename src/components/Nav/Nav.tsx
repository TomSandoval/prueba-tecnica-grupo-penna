import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav(){
    return (
        <nav className="nav-all-container">
            <ul>
                <li>
                    <Link className="nav-link" to={"/"}>Home</Link>
                </li>
                <li>
                    <Link className="nav-link" to={"/userform"}>Formulario de usuario</Link>
                </li>
                <li>
                    <Link className="nav-link" to={"/pdfform"}>Formulario PDF</Link>
                </li>
                <li>
                    <Link className="nav-link" to={"/imageform"}>Formulario imagen</Link>
                </li>
                <li>
                    <Link className="nav-link" to={"/carousel"}>Carrusel de imagenes</Link>
                </li>
            </ul>
        </nav>
    )
}