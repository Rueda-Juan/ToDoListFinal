function TaskCard({ tarea, onToggle, onDelete, onModificar }) {
  const fecha = new Date(tarea.fecha_creacion);
  const fechaFormateada = fecha.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card glass h-100 w-100">
      <div className="card-body d-flex flex-column justify-content-between h-100">
        <div className="mb-3">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <h5
              className={`card-title fw-semibold mb-0 ${tarea.completada ? "text-decoration-line-through text-muted" : ""
                }`}
            >
              {tarea.titulo}
            </h5>
            <p className="glass px-2 py-1 mb-0 small text-nowrap">
              {fechaFormateada}
            </p>
          </div>

          {tarea.descripcion && (
            <p className="card-text small text-secondary mt-2">
              {tarea.descripcion}
            </p>
          )}
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-auto">
          <button
            className={`btn btn-sm glass ${tarea.completada ? "btn-glass-yellow" : "btn-glass-green"
              }`}
            onClick={() => onToggle(tarea.id_tarea, tarea.completada)}
          >
            {tarea.completada ? "Desmarcar" : "Completar"}
          </button>

          <button className="btn btn-sm glass btn-glass-yellow" onClick={() => onModificar(tarea)}>
            Modificar <i className="bi bi-pencil"></i>
          </button>

          <button className="btn btn-sm glass btn-glass-red" onClick={() => onDelete(tarea.id_tarea)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
