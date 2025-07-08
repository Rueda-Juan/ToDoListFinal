function CrearTareaModal({ mostrar, onClose, onSubmit, titulo, setTitulo, descripcion, setDescripcion }) {
  if (!mostrar) return null;

  return (
    <div className="modal d-block fade show" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Crear nueva tarea</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Crear tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearTareaModal;
