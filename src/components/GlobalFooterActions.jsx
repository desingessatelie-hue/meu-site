import React from "react";

export function GlobalFooterActions({
  estilos,
  whatsappNumber,
  onBackToCollection,
  onScrollTop,
  showBackButton = false
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px"
      }}
    >
      {showBackButton && (
        <button
          style={{
            padding: "14px 28px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #c8a96a, #b8955a)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
          }}
          onClick={onBackToCollection}
        >
          ← Voltar
        </button>
      )}

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        style={estilos.whatsapp}
      >
        💬
      </a>
      <button style={estilos.topo} onClick={onScrollTop}>
        ↑
      </button>
    </div>
  );
}
