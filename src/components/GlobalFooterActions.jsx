import React from "react";

const whatsappIcon = new URL("../../imagens/social/whatsapp.png", import.meta.url).href;
const instagramIcon = new URL("../../imagens/social/instagram.png", import.meta.url).href;

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
        style={{ ...estilos.socialButton, ...estilos.whatsapp }}
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          style={{
            width: "24px",
            height: "24px",
            objectFit: "contain",
            display: "block"
          }}
        />
      </a>
      <a
        href="https://www.instagram.com/ellen_ess"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...estilos.socialButton, ...estilos.instagram }}
      >
        <img
          src={instagramIcon}
          alt="Instagram"
          style={{
            width: "24px",
            height: "24px",
            objectFit: "contain",
            display: "block"
          }}
        />
      </a>
      <button style={estilos.topo} onClick={onScrollTop}>
        ↑
      </button>
    </div>
  );
}
