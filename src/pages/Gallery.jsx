import { useState, useEffect } from "react";
import "./Gallery.css"; // Aquí puedes poner los estilos específicos para la galería

const Gallery = () => {
  const [works, setWorks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  // Cargar los trabajos desde localStorage
  const loadWorks = () => {
    const savedWorks = JSON.parse(localStorage.getItem("works")) || [];
    setWorks(savedWorks);
  };

  useEffect(() => {
    loadWorks();
  }, []);

  // Filtrar trabajos según el tipo seleccionado
  const filteredWorks = filter === "all" ? works : works.filter((work) => work.type === filter);

  return (
    <div className="gallery-container">
      {/* Botón de actualización y filtro */}
      <div className="gallery-controls">
        <button onClick={loadWorks} className="refresh-button">Actualizar</button>
        <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">Todos</option>
          <option value="IT">Imagen con Título</option>
          <option value="ITL">Imagen con Texto Lateral</option>
        </select>
      </div>

      {/* Galería de trabajos */}
      <div id="galeria">
        {filteredWorks.length > 0 ? (
          filteredWorks.map((work, index) => (
            <div key={index} className="work-item">
              <div className="work-image-container">
                <img src={work.image} alt={work.title} onClick={() => setSelectedImage(work.image)} />
                <div className="work-description">{work.description}</div>
              </div>
              <h2>{work.title}</h2>
              {work.type === "ITL" && <p>{work.lateralText}</p>}
            </div>
          ))
        ) : (
          <div className="empty-gallery">
            <img src="/assets/no-content.svg" alt="No hay trabajos" />
            <p>No hay trabajos para mostrar</p>
          </div>
        )}
      </div>

      {/* Modal para ver la imagen en grande */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
