import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export function DirectCategoryProductsPanel({
  categoriaSelecionada,
  subcategoriaSelecionada,
  estilos,
  gerarLinkWhatsApp,
  onBack,
  onProdutoClick
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button style={estilos.voltar} onClick={onBack}>
        ← Voltar
      </button>

      <Breadcrumb
        categoriaSelecionada={categoriaSelecionada}
        subcategoriaSelecionada={subcategoriaSelecionada}
        onResetNavigation={onBack}
      />

      <h2
        style={{
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "26px",
          color: "#5a3e36"
        }}
      >
        {categoriaSelecionada.titulo}
      </h2>
      {categoriaSelecionada.descricao && (
        <p
          style={{
            textAlign: "center",
            marginBottom: "12px",
            color: "#7a655a",
            fontSize: "14px",
            maxWidth: "760px",
            margin: "0 auto 12px auto"
          }}
        >
          {categoriaSelecionada.descricao}
        </p>
      )}
      {categoriaSelecionada.observacao && (
        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#8b6b61",
            fontSize: "14px",
            padding: "12px 16px",
            borderRadius: "16px",
            backgroundColor: "#fff5e6",
            border: "1px solid rgba(200,169,106,0.35)",
            display: "inline-block"
          }}
        >
          🚧 <strong>{categoriaSelecionada.observacao}</strong>
        </p>
      )}

      <div style={estilos.grid}>
        {categoriaSelecionada.produtos.map((prod, i) => (
          <div 
            key={i} 
            style={{ ...estilos.card, cursor: "pointer" }}
            onClick={() => onProdutoClick && onProdutoClick(prod)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
            }}
          >
            {prod.imagem && (
              <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                <img 
                  src={prod.imagem} 
                  alt={prod.nome} 
                  style={estilos.imagem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            )}

            <p style={{ fontWeight: "600", marginTop: "10px" }}>{prod.nome}</p>

            {prod.descricao && (
              <p
                style={{
                  color: "#8b6b61",
                  fontSize: "14px",
                  margin: "10px 0 0 0",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {prod.descricao}
              </p>
            )}

            {prod.preco && (
              <p
                style={{
                  fontWeight: "bold",
                  color: "#c8a96a",
                  fontSize: "15px",
                  marginTop: prod.descricao ? "10px" : "6px"
                }}
              >
                {prod.preco}
              </p>
            )}

            <p
              style={{
                fontSize: "13px",
                color: "#999",
                marginTop: "4px"
              }}
            >
              Feito sob medida para você 💛
            </p>

            <a
              href={gerarLinkWhatsApp(prod.nome)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <button style={estilos.botao}>Solicitar orçamento</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
