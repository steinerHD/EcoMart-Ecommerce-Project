const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-900)",
        borderTop: "1px solid rgba(165, 106, 189, 0.2)",
        padding: "1.5rem 0",
        marginTop: "auto",
      }}
    >
      <div className="container text-center">
        <p
          className="mb-1"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-300)",
          }}
        >
          🌿 EcoMart — Comercio electrónico sostenible
        </p>
        <small style={{ color: "var(--color-1000)" }}>
          © {year} EcoMart. Ingeniería de Software — UAO
        </small>
      </div>
    </footer>
  );
};

export default Footer;