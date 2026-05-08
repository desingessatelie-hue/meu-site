import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export function SubcategoriaProductsPanel({
  categoriaSelecionada,
  subcategoriaSelecionada,
  estilos,
  gerarLinkWhatsApp,
  onResetNavigation,
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
        onResetNavigation={onResetNavigation}
      />

      <h2
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "26px",
          color: "#5a3e36"
        }}
      >
        {subcategoriaSelecionada.titulo}
      </h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "35px",
          color: "#8b6b61",
          fontSize: "14px"
        }}
      >
        ✨ Produtos personalizados feitos artesanalmente com carinho
      </p>

      {subcategoriaSelecionada.titulo === "Páscoa" ? (
        <>
          <h2
            style={{
              marginBottom: "20px",
              color: "#5a3e36",
              fontSize: "24px",
              textAlign: "center"
            }}
          >
            🍫 Doces e Lembrancinhas
          </h2>

          <div style={estilos.grid}>
            {subcategoriaSelecionada.produtos
              .filter((prod) => prod.tipo === "doces")
              .map((prod, i) => (
                <div
                  key={i}
                  style={estilos.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.06)";
                  }}
                >
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

                  <p
                    style={{
                      fontWeight: "600",
                      marginTop: "10px"
                    }}
                  >
                    {prod.nome}
                  </p>

                  {prod.preco && (
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#c8a96a",
                        fontSize: "16px",
                        marginTop: "5px"
                      }}
                    >
                      💰 {prod.preco}
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

          <h2
            style={{
              marginTop: "50px",
              marginBottom: "20px",
              color: "#5a3e36",
              fontSize: "24px",
              textAlign: "center"
            }}
          >
            🎨 Papelaria Criativa
          </h2>

          <div style={estilos.grid}>
            {subcategoriaSelecionada.produtos
              .filter((prod) => prod.tipo === "papelaria")
              .map((prod, i) => (
                <div key={i} style={estilos.card}>
                  <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                    <img
                      src={prod.imagem}
                      alt={prod.nome}
                      style={estilos.imagem}
                    />
                  </div>

                  <p
                    style={{
                      fontWeight: "600",
                      marginTop: "10px"
                    }}
                  >
                    {prod.nome}
                  </p>

                  {prod.preco && (
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#c8a96a",
                        fontSize: "16px",
                        marginTop: "5px"
                      }}
                    >
                      💰 {prod.preco}
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

          <h2
            style={{
              marginTop: "50px",
              marginBottom: "20px",
              color: "#5a3e36",
              fontSize: "24px",
              textAlign: "center"
            }}
          >
            🎁 Kits Presente
          </h2>

          <div style={estilos.grid}>
            {subcategoriaSelecionada.produtos
              .filter((prod) => prod.tipo === "kits")
              .map((prod, i) => (
                <div key={i} style={estilos.card}>
                  <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                    <img
                      src={prod.imagem}
                      alt={prod.nome}
                      style={estilos.imagem}
                    />
                  </div>

                  <p
                    style={{
                      fontWeight: "600",
                      marginTop: "10px"
                    }}
                  >
                    {prod.nome}
                  </p>

                  {prod.preco && (
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#c8a96a",
                        fontSize: "16px",
                        marginTop: "5px"
                      }}
                    >
                      💰 {prod.preco}
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
        </>
      ) : (
        <>
          <div style={estilos.grid}>
            {subcategoriaSelecionada.produtos.map((prod, i) => (
              <div
                key={i}
                style={estilos.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.06)";
                }}
              >
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

                <p
                  style={{
                    fontWeight: "600",
                    marginTop: "10px"
                  }}
                >
                  {prod.nome}
                </p>

                {prod.preco && (
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#c8a96a",
                      fontSize: "16px",
                      marginTop: "5px"
                    }}
                  >
                    💰 {prod.preco}
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
        </>
      )}
    </div>
  );
}
