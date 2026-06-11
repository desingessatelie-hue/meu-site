export const estilos = {
  container: {
    backgroundColor: "#f7f5f2",
    minHeight: "100vh",
    padding: "50px 20px",
    fontFamily: "'Playfair Display', serif",
    color: "#3a3a3a"
  },
  titulo: {
    textAlign: "center",
    fontSize: "40px",
    marginBottom: "50px"
  },
  banner: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px"
  },
  overlay: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#3a3a3a",
    maxWidth: "600px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)"
  },
  topo: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#c8a96a",
    color: "#fff",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    zIndex: 999
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "30px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "18px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    transition: "0.3s"
  },
  imagem: {
    width: "100%",
    aspectRatio: "4 / 5",
    height: "auto",
    objectFit: "cover",
    borderRadius: "14px",
    transition: "0.4s",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  botao: {
    marginTop: "12px",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #c8a96a, #b8955a)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  },
  voltar: {
    marginBottom: "25px",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer"
  },
  subtitulo: {
    marginTop: "10px",
    fontSize: "16px"
  },
  lancamentosSection: {
    background: "linear-gradient(180deg, #fffaf3 0%, #f7f3ee 100%)",
    padding: "24px",
    borderRadius: "28px",
    boxShadow: "0 14px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px"
  },
  lancamentoCard: {
    background: "linear-gradient(180deg, #fff9f0 0%, #f3e4d9 100%)",
    borderRadius: "20px",
    padding: "20px",
    textAlign: "left",
    boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
    border: "1px solid rgba(200,169,106,0.18)",
    transition: "0.3s"
  },
  lancamentoBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#f4e6d6",
    color: "#8b6b61",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "12px"
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "30px"
  },
  sectionTag: {
    fontSize: "14px",
    color: "#8b6b61",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "8px"
  },
  sectionTitle: {
    fontSize: "34px",
    color: "#5a3e36",
    marginBottom: "8px"
  },
  searchInput: {
    width: "100%",
    maxWidth: "520px",
    padding: "14px 18px",
    borderRadius: "18px",
    border: "1px solid #dbd1c7",
    backgroundColor: "#fff",
    color: "#3a3a3a",
    fontSize: "16px",
    outline: "none",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    transition: "border-color 0.2s ease"
  },
  whatsapp: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#128C7E",
    color: "#fff",
    fontSize: "26px",
    padding: "14px 16px",
    borderRadius: "50%",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
  },
  instagram: {
    position: "fixed",
    bottom: "20px",
    right: "80px",
    background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    color: "#fff",
    fontSize: "26px",
    padding: "14px 16px",
    borderRadius: "50%",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
  }
};
