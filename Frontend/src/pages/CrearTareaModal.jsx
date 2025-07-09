function CrearTareaModal({ mostrar, onClose, onSubmit, titulo, setTitulo, descripcion, setDescripcion }) {
  if (!mostrar) return null;

  return (
    <div className="modal d-block fade show" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass">
          <div className="modal-header">
            <h5 className="modal-title">Crear nueva tarea</h5>
            <button type="button" className="btn-close glass btn-glass-red" onClick={onClose}><i class="bi bi-x"></i></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control glass"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control glass"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn glass btn-glass-red" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn glass btn-glass-green">
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
