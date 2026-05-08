import React from "react";

export function Breadcrumb({
  categoriaSelecionada,
  subcategoriaSelecionada,
  onResetNavigation
}) {
  return (
    <div
      style={{
        marginBottom: "20px",
        fontSize: "14px",
        color: "#888",
        textAlign: "center"
      }}
    >
      <span style={{ cursor: "pointer" }} onClick={onResetNavigation}>
        Home
      </span>

      {categoriaSelecionada && (
        <>
          {" • "}
          <span style={{ cursor: "pointer" }} onClick={onResetNavigation}>
            {categoriaSelecionada.titulo}
          </span>
        </>
      )}

      {subcategoriaSelecionada && (
        <>
          {" • "}
          <span style={{ color: "#5a3e36", fontWeight: "500" }}>
            {subcategoriaSelecionada.titulo}
          </span>
        </>
      )}
    </div>
  );
}
