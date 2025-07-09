function TaskCard({ tarea, onToggle, onDelete }) {
  return (
    <div
      className="card glass h-100"
      style={{ minWidth: "60vh" }}
    >
      <div className="card-body d-flex flex-column justify-content-between h-100">
        <div className="mb-3">
          <h5
            className={`card-title fw-semibold ${tarea.completada ? "text-decoration-line-through text-muted" : ""
              }`}
          >
            {tarea.titulo}
          </h5>
          {tarea.descripcion && (
            <p className="card-text small text-secondary mb-0">
              {tarea.descripcion}
            </p>
          )}
        </div>

        <div className="d-flex justify-content-between mt-auto">
          <button
            className={`btn btn-sm ${tarea.completada ? "glass btn-glass-yellow" : "glass btn-glass-green"
              }`}
            onClick={() => onToggle(tarea.id_tarea, tarea.completada)}
          >
            {tarea.completada ? "Desmarcar" : "Completar"}
          </button>
          <button
            className="btn glass btn-glass-red"
            onClick={() => onDelete(tarea.id_tarea)}
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
