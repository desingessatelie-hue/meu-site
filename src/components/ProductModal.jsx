import React, { useState } from "react";

function ProductImageCarousel({ imagens, imagem, alt, compact }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sources = Array.isArray(imagens) && imagens.length > 0 ? imagens : imagem ? [imagem] : [];

  if (!sources.length) return null;

  const showControls = sources.length > 1;

  return (
    <div style={{ position: "relative", marginBottom: compact ? 0 : "16px" }}>
      <div style={{ overflow: "hidden", borderRadius: compact ? "12px" : "16px" }}>
        <img
          src={sources[currentIndex]}
          alt={alt}
          style={{
            width: "100%",
            aspectRatio: compact ? "4 / 5" : "1 / 1",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>

      {showControls && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex((prev) => (prev - 1 + sources.length) % sources.length);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.95)",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
              padding: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % sources.length);
            }}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.95)",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
              padding: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            ›
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "14px",
              flexWrap: "wrap"
            }}
          >
            {sources.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentIndex(index);
                }}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "none",
                  background: index === currentIndex ? "#c8a96a" : "#ddd",
                  cursor: "pointer",
                  padding: 0
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProductDetails({ produto }) {
  const contexto =
    produto.categoria && produto.subcategoria
      ? `${produto.categoria} • ${produto.subcategoria}`
      : produto.categoria || null;

  return (
    <div style={{ padding: "0 8px" }}>
      {contexto && (
        <p
          style={{
            fontSize: "13px",
            color: "#999",
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}
        >
          {contexto}
        </p>
      )}

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#5a3e36",
          marginBottom: "8px",
          lineHeight: 1.3
        }}
      >
        {produto.nome}
      </h2>

      {produto.tipo && (
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            backgroundColor: "#f0e8de",
            borderRadius: "999px",
            fontSize: "13px",
            color: "#5a3e36",
            marginBottom: "12px",
            fontWeight: 600
          }}
        >
          {produto.tipo}
        </span>
      )}

      {produto.preco && (
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#c8a96a",
            marginBottom: "12px",
            marginTop: produto.tipo ? 0 : "4px"
          }}
        >
          💰 {produto.preco}
        </p>
      )}

      {produto.descricao && (
        <p
          style={{
            fontSize: "15px",
            color: "#666",
            lineHeight: 1.6,
            marginBottom: "14px"
          }}
        >
          {produto.descricao}
        </p>
      )}

      <p
        style={{
          fontSize: "14px",
          color: "#8b6b61",
          marginBottom: "18px",
          padding: "10px 12px",
          backgroundColor: "#f9f7f4",
          borderRadius: "10px",
          borderLeft: "3px solid #c8a96a"
        }}
      >
        ✨ Feito sob medida para você! Este produto é personalizado de acordo com suas preferências.
      </p>

      {produto.materiais && (
        <div style={{ marginBottom: "14px" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "6px" }}>
            📦 Materiais
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginLeft: "4px", lineHeight: 1.5 }}>
            {produto.materiais}
          </p>
        </div>
      )}

      {produto.tempo_entrega && (
        <div style={{ marginBottom: "14px" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "6px" }}>
            ⏱️ Prazo de produção
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginLeft: "4px" }}>
            {produto.tempo_entrega}
          </p>
        </div>
      )}

      {produto.tamanhos?.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "6px" }}>
            📏 Tamanhos disponíveis
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {produto.tamanhos.map((tamanho, idx) => (
              <span
                key={idx}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#f0e8de",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#5a3e36"
                }}
              >
                {tamanho}
              </span>
            ))}
          </div>
        </div>
      )}

      {produto.cores?.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "8px" }}>
            🎨 Cores disponíveis
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            {produto.cores.map((cor, idx) => (
              <div
                key={idx}
                title={cor}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: cor,
                  border: "2px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModalActions({ produto, onClose, gerarLinkWhatsApp, compact }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: compact ? "20px" : "24px",
        padding: compact ? 0 : "0 8px"
      }}
    >
      <a
        href={gerarLinkWhatsApp(produto)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ flex: 1 }}
      >
        <button
          style={{
            width: "100%",
            padding: "14px 16px",
            backgroundColor: "#128C7E",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          💬 Solicitar via WhatsApp
        </button>
      </a>
      <button
        onClick={onClose}
        style={{
          flex: compact ? 1 : "0 0 auto",
          minWidth: compact ? undefined : "120px",
          padding: "14px 16px",
          backgroundColor: "#f5f5f5",
          color: "#333",
          border: "1px solid #ddd",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Fechar
      </button>
    </div>
  );
}

export function ProductModal({ produto, onClose, gerarLinkWhatsApp, variant = "mobile" }) {
  if (!produto) return null;

  const isDesktop = variant === "desktop";

  if (isDesktop) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 9999
        }}
        onClick={onClose}
      >
        <div
          style={{
            width: "min(960px, 100%)",
            maxHeight: "90vh",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "28px",
            overflowY: "auto",
            boxShadow: "0 24px 70px rgba(0,0,0,0.25)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
            <button
              onClick={onClose}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
                fontSize: "18px",
                color: "#333"
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(260px, 340px) 1fr",
              gap: "28px",
              alignItems: "start"
            }}
          >
            <ProductImageCarousel
              imagens={produto.imagens}
              imagem={produto.imagem}
              alt={produto.nome}
              compact
            />
            <div>
              <ProductDetails produto={produto} />
              <ModalActions
                produto={produto}
                onClose={onClose}
                gerarLinkWhatsApp={gerarLinkWhatsApp}
                compact
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderTopLeftRadius: "28px",
          borderTopRightRadius: "28px",
          padding: "20px 16px 24px 16px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px"
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              fontSize: "20px",
              color: "#333"
            }}
          >
            ✕
          </button>
        </div>

        <ProductImageCarousel
          imagens={produto.imagens}
          imagem={produto.imagem}
          alt={produto.nome}
        />

        <ProductDetails produto={produto} />

        <ModalActions
          produto={produto}
          onClose={onClose}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
        />

        <div style={{ height: "20px" }} />
      </div>
    </div>
  );
}
