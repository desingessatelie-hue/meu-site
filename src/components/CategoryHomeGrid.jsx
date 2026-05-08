import React from "react";

export function CategoryHomeGrid({ categorias, estilos, onSelectCategory }) {
  return (
    <div id="produtos" style={estilos.grid}>
      {categorias.map((cat, i) => (
        <div
          key={i}
          style={estilos.card}
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
          <button
            style={estilos.botao}
            onClick={() => onSelectCategory(cat.titulo)}
          >
            Ver coleção
          </button>
        </div>
      ))}
    </div>
  );
}
