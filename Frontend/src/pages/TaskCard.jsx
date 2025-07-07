function TaskCard({ tarea, onToggle, onDelete }) {
  return (
    <li>
      <strong style={{ textDecoration: tarea.completada ? "line-through" : "none" }}>
        {tarea.titulo}
      </strong>{" "}
      - {tarea.descripcion}
      <br />
      <button onClick={() => onToggle(tarea.id_tarea, tarea.completada)}>
        {tarea.completada ? "Desmarcar" : "Completada"}
      </button>
      <button onClick={() => onDelete(tarea.id_tarea)}>Eliminar</button>
    </li>
  );
}

export default TaskCard;