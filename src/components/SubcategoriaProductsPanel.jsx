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

      {(subcategoriaSelecionada.titulo === "Páscoa" || subcategoriaSelecionada.titulo === "Dia das Mães" || subcategoriaSelecionada.titulo === "Dia das Mulheres" || subcategoriaSelecionada.titulo === "Jardim de Papel" || subcategoriaSelecionada.titulo === "Topo de Bolo") ? (
        <>
          {subcategoriaSelecionada.titulo === "Páscoa" && (
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

                  {prod.descricao && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "6px",
                        lineHeight: 1.4
                      }}
                    >
                      {prod.descricao}
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

          {subcategoriaSelecionada.titulo === "Jardim de Papel" && (
            <>
              <h2
                style={{
                  marginBottom: "20px",
                  color: "#5a3e36",
                  fontSize: "24px",
                  textAlign: "center"
                }}
              >
                🌸 Flores
              </h2>

              <div style={estilos.grid}>
                {subcategoriaSelecionada.produtos
                  .filter((prod) => prod.tipo === "Flores")
                  .map((prod, i) => (
                    <div key={i} style={estilos.card}>
                      <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                        <img src={prod.imagem} alt={prod.nome} style={estilos.imagem} />
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

                      {prod.descricao && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "6px",
                            lineHeight: 1.4
                          }}
                        >
                          {prod.descricao}
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
                🦋 Borboletas
              </h2>

              <div style={estilos.grid}>
                {subcategoriaSelecionada.produtos
                  .filter((prod) => prod.tipo === "Borboletas")
                  .map((prod, i) => (
                    <div key={i} style={estilos.card}>
                      <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                        <img src={prod.imagem} alt={prod.nome} style={estilos.imagem} />
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

                      {prod.descricao && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "6px",
                            lineHeight: 1.4
                          }}
                        >
                          {prod.descricao}
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

          {subcategoriaSelecionada.titulo === "Dia das Mães" && (
            <>
              <h2
                style={{
                  marginBottom: "20px",
                  color: "#5a3e36",
                  fontSize: "24px",
                  textAlign: "center"
                }}
              >
                🎁 Presentes Especiais
              </h2>

              <div style={estilos.grid}>
                {subcategoriaSelecionada.produtos
                  .filter((prod) => prod.tipo === "Presentes")
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
                🎂 Topos de Bolo
              </h2>

              <div style={estilos.grid}>
                {subcategoriaSelecionada.produtos
                  .filter((prod) => prod.tipo === "topo")
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
          )}

          {subcategoriaSelecionada.titulo === "Dia das Mulheres" && (
            <>
              <h2
                style={{
                  marginBottom: "20px",
                  color: "#5a3e36",
                  fontSize: "24px",
                  textAlign: "center"
                }}
              >
                🎀 Lembrancinhas
              </h2>

              <div style={estilos.grid}>
                {subcategoriaSelecionada.produtos
                  .filter((prod) => prod.tipo === "Lembrancinhas")
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
                💝 Kits
              </h2>

              <div style={estilos.grid}>
                {subcategoriaSelecionada.produtos
                  .filter((prod) => prod.tipo === "Kits")
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

                      {prod.descricao && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "6px",
                            lineHeight: 1.4
                          }}
                        >
                          {prod.descricao}
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

      {subcategoriaSelecionada.titulo === "Topo de Bolo" && (
        <>
          {["Flores", "Camadas", "Painel", "Personagens", "Religioso", "Personalizado", "Mês aniversário", "Kit + Topo"].map((tipo, idx) => {
            const temProdutos = subcategoriaSelecionada.produtos.some((prod) => prod.tipo === tipo);
            if (!temProdutos) return null;

            const emojis = {
              "Flores": "🌸",
              "Camadas": "🧁",
              "Painel": "📋",
              "Personagens": "🦸",
              "Religioso": "✝️",
              "Personalizado": "🖨️",
              "Mês aniversário": "🎂",
              "Kit + Topo": "🎁"
            };

            const sectionDescriptions = {
              "Flores": "🌺 Flores 3D feitas em papel",
              "Camadas": "🧁 Camadas estruturadas com acabamento delicado",
              "Painel": "📋 Painel com design personalizado e acabamento de luxo",
              "Personagens": "🦸 Topos temáticos com personagens sob medida",
              "Religioso": "✝️ Topos com temática religiosa e acabamento refinado",
              "Personalizado": "✨ Personalizado com nome e tema",
              "Mês aniversário": "🎂 Ideal para aniversários e ocasiões especiais",
              "Kit + Topo": "💝 Um detalhe único para tornar sua comemoração inesquecível!"
            };

            return (
              <div key={idx}>
                <h2
                  style={{
                    marginTop: idx === 0 ? "0" : "50px",
                    marginBottom: "8px",
                    color: "#5a3e36",
                    fontSize: "24px",
                    textAlign: "center"
                  }}
                >
                  {emojis[tipo]} {tipo}
                </h2>
                <p
                  style={{
                    margin: "0 auto 24px auto",
                    maxWidth: "640px",
                    color: "#7a655a",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  {sectionDescriptions[tipo]}
                </p>

                <div style={estilos.grid}>
                  {subcategoriaSelecionada.produtos
                    .filter((prod) => prod.tipo === tipo)
                    .map((prod, i) => (
                      <div key={i} style={estilos.card}>
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

                        {prod.descricao && (
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#666",
                              marginTop: "6px",
                              lineHeight: 1.4
                            }}
                          >
                            {prod.descricao}
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
          })}
        </>
      )}
    </div>
  );
}

