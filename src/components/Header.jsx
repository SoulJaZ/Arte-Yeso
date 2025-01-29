import { Link } from "react-router-dom";
import "../App.css"; // Asegúrate de importar el CSS

const Header = () => {
  return (
    <header>
      <div className="container">
        <h1>Arte & Yeso</h1>
        <nav>
          <ul>
            <li><Link to="/">Galería</Link></li>
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/admin">Administrar</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
