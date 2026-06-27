import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export function SubcategoriasPanel({
  categoriaSelecionada,
  subcategoriaSelecionada,
  estilos,
  onBack,
  onSelectSubcategoria
}) {
  const descricoesPadrao = {
    "Topo de Bolo": "Topos personalizados para deixar sua festa ainda mais especial.",
    "Topo de Brigadeiro e CupCake": "Mini topos criativos para docinhos e cupcakes temáticos.",
    "Caixas de lembrancinhas": "Caixas personalizadas para presentear com charme e carinho.",
    "Dia das Mulheres": "Lembranças personalizadas para homenagear mulheres especiais.",
    "Dia das Mães": "Presentes afetivos e personalizados para celebrar as mães.",
    "Páscoa": "Coleção temática com doces, papelaria e kits personalizados.",
    "Dia dos Namorados": "Kits românticos e personalizados para surpreender quem você ama.",
    "Férias Escolares": "Itens criativos para divertir e presentear durante as férias.",
    "Festa Juninas": "Lembrancinhas e caixinhas temáticas para festas juninas.",
    "Dia dos Pais": "Presentes personalizados para tornar a data dos pais inesquecível.",
    "Dia das Crianças": "Coleção divertida e personalizada para encantar os pequenos.",
    "Dia dos Professores": "Mimos e kits para agradecer com carinho aos professores.",
    Halloween: "Produtos temáticos de Halloween para festas e lembranças criativas.",
    "Black Friday": "Coleção especial para campanhas, promoções e kits de ação.",
    Natal: "Peças natalinas personalizadas para presentear e decorar com encanto.",
    Encadernação: "Agendas, cadernos e planners artesanais feitos sob medida.",
    "Canetas Personalizadas": "Canetas e lápis personalizados para presentear e encantar.",
    Maternidade: "Itens delicados e personalizados para momentos da maternidade.",
    "Kits Presentes": "Combinações especiais de produtos para presentear em qualquer ocasião.",
    Personalizados: "Criações exclusivas feitas do jeitinho que você imaginar.",
    "Pequenos Mimos": "Lembranças criativas em formato compacto e cheio de carinho.",
    "Jardim de Papel": "Flores e peças em papel com acabamento artesanal encantador.",
    Caixas: "Caixas em cartonagem com acabamento elegante e personalizado.",
    "Álbuns": "Álbuns artesanais para guardar memórias com estilo e afeto.",
    Cestas: "Cestas personalizadas para presentear em datas especiais.",
    "Kit Escritório": "Itens coordenados para organizar e decorar seu espaço de trabalho."
  };

  const obterDescricaoColecao = (sub) =>
    sub.descricao ||
    descricoesPadrao[sub.titulo] ||
    `Coleção ${sub.titulo} com opções personalizadas feitas sob encomenda.`;

  const grupos = Array.from(
    new Set(
      categoriaSelecionada.subcategorias.map((sub) => sub.grupo || "outros")
    )
  );

  const tituloGrupo = (grupo) => {
    if (grupo === "festas") return "✨ Festas Personalizadas";
    if (grupo === "datas") return "🎄 Datas Especiais";
    if (grupo === "outros") {
      return categoriaSelecionada.titulo === "Papelaria Artesanal" ? "" : "Outros";
    }
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

      {categoriaSelecionada.descricao && (
        <p
          style={{
            textAlign: "center",
            marginBottom: "16px",
            color: "#7a655a",
            fontSize: "15px",
            maxWidth: "760px",
            margin: "0 auto 16px auto"
          }}
        >
          {categoriaSelecionada.descricao}
        </p>
      )}

      {categoriaSelecionada.observacao && (
        <p
          style={{
            textAlign: "center",
            marginBottom: "15px",
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
          {tituloGrupo(grupo) && (
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
          )}

          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias
              .filter((sub) => (sub.grupo || "outros") === grupo)
              .map((sub, i) => (
                <div
                  key={i}
                  style={{
                    ...estilos.card,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
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
                  <p
                    style={{
                      color: "#7a655a",
                      fontSize: "14px",
                      margin: "10px 0",
                      lineHeight: 1.5
                    }}
                  >
                    {obterDescricaoColecao(sub)}
                  </p>

                  <div style={{ flex: 1 }} />

                  <button
                    style={{ ...estilos.botao, marginTop: "auto" }}
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
