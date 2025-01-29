import { useState } from "react";
import "./Home.css"; // Importamos los estilos en CSS puro

const Home = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "IT", // Por defecto: Imagen con Título
    image: "",
    file: null,
    lateralText: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en el archivo de imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
    }
  };

  // Validaciones antes de subir contenido
  const validateForm = () => {
    if (!formData.title.trim()) return "El título es obligatorio.";
    if (!formData.image.trim()) return "Debes proporcionar una imagen o subir un archivo.";
    if (formData.type === "ITL" && !formData.lateralText.trim()) return "El texto lateral es obligatorio.";
    return "";
  };

  // Subir contenido
  const handleUpload = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    
    const newWork = {
      title: formData.title,
      type: formData.type,
      image: formData.image,
      lateralText: formData.lateralText || "",
      description: formData.description,
    };

    // Obtener trabajos previos de localStorage o usar un array vacío si no existen.
    const savedWorks = JSON.parse(localStorage.getItem("works")) || [];
    localStorage.setItem("works", JSON.stringify([...savedWorks, newWork]));

    alert("Contenido subido con éxito");
    setFormData({ title: "", type: "IT", image: "", lateralText: "", description: "" });
  };

  return (
    <div className="home-container">
      <h1>Portal de Arte & Yeso</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpload} className="upload-form">
        <div>
          <label>Título:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Tipo de contenido:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="IT">Imagen con Título</option>
            <option value="ITL">Imagen con Texto Lateral</option>
          </select>
        </div>

        <div>
          <label>Imagen (URL o archivo):</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="URL de la imagen" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción del trabajo" />
        </div>

        {formData.type === "ITL" && (
          <div>
            <label>Texto Lateral:</label>
            <textarea name="lateralText" value={formData.lateralText} onChange={handleChange} />
          </div>
        )}

        <button type="submit">Subir Trabajo</button>
      </form>
    </div>
  );
};

export default Home;
