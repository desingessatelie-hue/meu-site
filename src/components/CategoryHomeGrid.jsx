import React from "react";

export function CategoryHomeGrid({ categorias, estilos, onSelectCategory }) {
  return (
    <div id="produtos" style={estilos.grid}>
      {categorias.map((cat, i) => (
        <div
          key={i}
          style={{ ...estilos.card, display: "flex", flexDirection: "column" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
          }}
        >
          <img
            src={cat.imagem}
            alt=""
            style={{
              ...estilos.imagem,
              cursor: "pointer"
            }}
            onClick={() => onSelectCategory(cat.titulo)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
          <h2>{cat.titulo}</h2>
          {cat.descricao && (
            <p
              style={{
                color: "#7a655a",
                fontSize: "14px",
                margin: "8px 0",
                lineHeight: 1.4,
                maxWidth: "680px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              {cat.descricao}
            </p>
          )}
          <div style={{ flex: 1 }} />
          {cat.observacao && (
            <p
              style={{
                color: "#8b6b61",
                fontSize: "14px",
                margin: "10px 0",
                padding: "10px 12px",
                borderRadius: "14px",
                backgroundColor: "#fff5e6",
                border: "1px solid rgba(200,169,106,0.3)"
              }}
            >
              🚧 <strong>{cat.observacao}</strong>
            </p>
          )}
          <button
            style={{ ...estilos.botao, marginTop: "auto" }}
            onClick={() => onSelectCategory(cat.titulo)}
          >
            Ver coleção
          </button>
          
        </div>
      ))}
    </div>
  );
}
