import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export function DirectCategoryProductsPanel({
  categoriaSelecionada,
  subcategoriaSelecionada,
  estilos,
  gerarLinkWhatsApp,
  onBack
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
          <div key={i} style={estilos.card}>
            <p style={{ fontWeight: "600", marginTop: "10px" }}>{prod.nome}</p>

            {prod.preco && (
              <p
                style={{
                  fontWeight: "bold",
                  color: "#c8a96a",
                  fontSize: "15px"
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
            >
              <button style={estilos.botao}>Solicitar orçamento</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
