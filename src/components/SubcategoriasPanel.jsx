import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export function SubcategoriasPanel({
  categoriaSelecionada,
  subcategoriaSelecionada,
  estilos,
  onBack,
  onSelectSubcategoria
}) {
  const grupos = Array.from(
    new Set(
      categoriaSelecionada.subcategorias.map((sub) => sub.grupo || "outros")
    )
  );

  const tituloGrupo = (grupo) => {
    if (grupo === "festas") return "✨ Festas Personalizadas";
    if (grupo === "datas") return "🎄 Datas Comemorativas";
    if (grupo === "outros") return "Outros";
    return grupo.charAt(0).toUpperCase() + grupo.slice(1);
  };

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
          marginBottom: "20px",
          fontSize: "26px",
          color: "#5a3e36"
        }}
      >
        {categoriaSelecionada.titulo}
      </h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "14px",
          color: "#777"
        }}
      >
        💛 Produtos personalizados sob encomenda. Cada peça é única e feita
        especialmente para você.
      </p>

      {grupos.map((grupo) => (
        <div key={grupo}>
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              color: "#5a3e36",
              textAlign: "center",
              fontSize: "24px"
            }}
          >
            {tituloGrupo(grupo)}
          </h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias
              .filter((sub) => (sub.grupo || "outros") === grupo)
              .map((sub, i) => (
                <div key={i} style={estilos.card}>
                  {sub.imagem && (
                    <img
                      src={sub.imagem}
                      alt=""
                      style={{
                        ...estilos.imagem,
                        cursor: "pointer"
                      }}
                      onClick={() => onSelectSubcategoria(sub.titulo)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  )}

                  <h3>{sub.titulo}</h3>

                  <button
                    style={estilos.botao}
                    onClick={() => onSelectSubcategoria(sub.titulo)}
                  >
                    Ver produtos
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
