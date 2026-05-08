import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export function SubcategoriasPanel({
  categoriaSelecionada,
  subcategoriaSelecionada,
  estilos,
  onBack,
  onSelectSubcategoria
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

      {categoriaSelecionada.titulo === "Festas e Lembrancinhas" ? (
        <>
          <h2
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              color: "#5a3e36",
              textAlign: "center",
              fontSize: "24px"
            }}
          >
            ✨ Festas Personalizadas
          </h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias
              .filter((sub) => sub.grupo === "festas")
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

          <h2
            style={{
              marginTop: "50px",
              marginBottom: "20px",
              color: "#5a3e36",
              textAlign: "center",
              fontSize: "24px"
            }}
          >
            🎄 Datas Comemorativas
          </h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias
              .filter((sub) => sub.grupo === "datas")
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
        </>
      ) : (
        <>
          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias.map((sub, i) => (
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
        </>
      )}
    </div>
  );
}
