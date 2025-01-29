import { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const [works, setWorks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    type: "IT",
    image: "",
    lateralText: "",
    description: "",
  });

  useEffect(() => {
    const savedWorks = JSON.parse(localStorage.getItem("works")) || [];
    setWorks(savedWorks);
  }, []);

  // Función para eliminar un trabajo
  const handleDelete = (index) => {
    const updatedWorks = works.filter((_, i) => i !== index);
    setWorks(updatedWorks);
    localStorage.setItem("works", JSON.stringify(updatedWorks));
  };

  // Función para editar un trabajo
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData(works[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedWorks = [...works];
    updatedWorks[editIndex] = editFormData;
    setWorks(updatedWorks);
    localStorage.setItem("works", JSON.stringify(updatedWorks));
    setEditIndex(null);
  };

  // Función para activar/desactivar una imagen
  const toggleActive = (index) => {
    const updatedWorks = [...works];
    updatedWorks[index].active = !updatedWorks[index].active;
    setWorks(updatedWorks);
    localStorage.setItem("works", JSON.stringify(updatedWorks));
  };

  return (
    <div className="admin-container">
      <h1>Administrador de Trabajos</h1>
      <div className="works-list">
        {works.length > 0 ? (
          works.map((work, index) => (
            <div key={index} className={`work-item ${work.active === false ? "inactive" : ""}`}>
              <img src={work.image} alt={work.title} />
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              {work.type === "ITL" && <p>{work.lateralText}</p>}

              <div className="buttons">
                <button onClick={() => handleEditClick(index)}>✏️ Editar</button>
                <button onClick={() => handleDelete(index)}>🗑 Eliminar</button>
                <button onClick={() => toggleActive(index)}>
                  {work.active === false ? "🔄 Activar" : "🚫 Desactivar"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay trabajos en la galería</p>
        )}
      </div>

      {/* Modal para editar un trabajo */}
      {editIndex !== null && (
        <div className="edit-modal">
          <h2>Editar Trabajo</h2>
          <form onSubmit={handleEditSubmit}>
            <label>Título:</label>
            <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} required />

            <label>Imagen (URL):</label>
            <input type="text" name="image" value={editFormData.image} onChange={handleEditChange} required />

            <label>Descripción:</label>
            <textarea name="description" value={editFormData.description} onChange={handleEditChange}></textarea>

            {editFormData.type === "ITL" && (
              <>
                <label>Texto Lateral:</label>
                <textarea name="lateralText" value={editFormData.lateralText} onChange={handleEditChange}></textarea>
              </>
            )}
            <br />
            <button type="submit">Guardar Cambios</button>
            <br />
            <br />
            
            <button type="button" onClick={() => setEditIndex(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
