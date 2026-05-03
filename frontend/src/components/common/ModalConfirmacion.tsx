interface ModalConfirmacionProps {
  show: boolean;
  titulo: string;
  mensaje: string;
  labelConfirmar?: string;
  labelCancelar?: string;
  loading?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalConfirmacion = ({
  show,
  titulo,
  mensaje,
  labelConfirmar = "Confirmar",
  labelCancelar = "Cancelar",
  loading = false,
  onConfirmar,
  onCancelar,
}: ModalConfirmacionProps) => {
  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCancelar}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
          width: "100%",
          maxWidth: "460px",
          padding: "0 1rem",
        }}
      >
        <div
          className="card shadow-lg"
          style={{ borderRadius: "var(--radius-lg)" }}
        >

          {/* Header */}
          <div className="card-header">
            <h5 className="mb-0">{titulo}</h5>
          </div>

          {/* Body */}
          <div
            className="card-body"
            style={{ backgroundColor: "var(--color-50)" }}
          >
            <p
              style={{
                color: "var(--color-900)",
                fontSize: "var(--text-base)",
                margin: 0,
              }}
            >
              {mensaje}
            </p>
          </div>

          {/* Footer */}
          <div
            className="card-footer d-flex justify-content-end gap-2"
            style={{ backgroundColor: "var(--color-100)" }}
          >
            <button
              className="btn btn-outline-light"
              onClick={onCancelar}
              disabled={loading}
            >
              {labelCancelar}
            </button>
            <button
              className="btn btn-primary"
              onClick={onConfirmar}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Procesando...
                </>
              ) : (
                labelConfirmar
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ModalConfirmacion;