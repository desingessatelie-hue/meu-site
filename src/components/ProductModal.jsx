import React, { useState } from "react";

function ProductImageCarousel({ imagens, imagem, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sources = Array.isArray(imagens) && imagens.length > 0 ? imagens : imagem ? [imagem] : [];

  if (!sources.length) return null;

  const showControls = sources.length > 1;

  return (
    <div style={{ position: "relative", marginBottom: "16px" }}>
      <div style={{ overflow: "hidden", borderRadius: "16px" }}>
        <img
          src={sources[currentIndex]}
          alt={alt}
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
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

export function ProductModal({ produto, onClose, gerarLinkWhatsApp }) {
  if (!produto) return null;

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
        zIndex: 9999,
        animation: "slideUp 0.3s ease-out"
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderTopLeftRadius: "28px",
          borderTopRightRadius: "28px",
          padding: "20px 16px 24px 16px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
          animation: "slideInUp 0.3s ease-out"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com botão fechar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px"
          }}
        >
          <div style={{ flex: 1 }} />
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#333"
            }}
          >
            ✕
          </button>
        </div>

        {/* Carrossel de imagens */}
        <ProductImageCarousel
          imagens={produto.imagens}
          imagem={produto.imagem}
          alt={produto.nome}
        />

        {/* Conteúdo do produto */}
        <div style={{ padding: "0 8px" }}>
          {/* Nome do produto */}
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

          {/* Preço */}
          {produto.preco && (
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#c8a96a",
                marginBottom: "12px"
              }}
            >
              💰 {produto.preco}
            </p>
          )}

          {/* Descrição */}
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

          {/* Badge de customização */}
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

          {/* Características adicionais */}
          {produto.materiais && (
            <div style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "6px" }}>
                📦 Materiais:
              </p>
              <p style={{ fontSize: "14px", color: "#666", marginLeft: "12px" }}>
                {produto.materiais}
              </p>
            </div>
          )}

          {produto.tempo_entrega && (
            <div style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "6px" }}>
                ⏱️ Tempo de Entrega:
              </p>
              <p style={{ fontSize: "14px", color: "#666", marginLeft: "12px" }}>
                {produto.tempo_entrega}
              </p>
            </div>
          )}

          {produto.tamanhos && Array.isArray(produto.tamanhos) && produto.tamanhos.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "6px" }}>
                📏 Tamanhos Disponíveis:
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginLeft: "12px" }}>
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

          {produto.cores && Array.isArray(produto.cores) && produto.cores.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a3e36", marginBottom: "8px" }}>
                🎨 Cores Disponíveis:
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginLeft: "12px" }}>
                {produto.cores.map((cor, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 10px",
                      backgroundColor: "#f9f7f4",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#666"
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: cor,
                        border: "1px solid rgba(0,0,0,0.1)"
                      }}
                    />
                    <span>{cor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "24px",
            padding: "0 8px"
          }}
        >
          <a
            href={gerarLinkWhatsApp(produto.nome, produto.descricao)}
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
                cursor: "pointer",
                transition: "0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0d6b5f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#128C7E";
              }}
            >
              💬 Solicitar via WhatsApp
            </button>
          </a>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "14px 16px",
              backgroundColor: "#f5f5f5",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#efefef";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
          >
            Fechar
          </button>
        </div>

        {/* Espaço para não cobrir com bottom action buttons */}
        <div style={{ height: "20px" }} />
      </div>
    </div>
  );
}
