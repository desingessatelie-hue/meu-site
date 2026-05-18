import React, { useState } from "react";
import { categorias } from "./data/categorias.js";
import { estilos } from "./styles/appStyles.js";
import { gerarLinkWhatsApp, WHATSAPP_NUMBER } from "./utils/whatsapp.js";
import { voltarAoTopo } from "./utils/scroll.js";
import { isMobileViewport } from "./utils/viewport.js";
import { AppBanner } from "./components/AppBanner.jsx";
import { CategoryHomeGrid } from "./components/CategoryHomeGrid.jsx";
import { SubcategoriasPanel } from "./components/SubcategoriasPanel.jsx";
import { SubcategoriaProductsPanel } from "./components/SubcategoriaProductsPanel.jsx";
import { DirectCategoryProductsPanel } from "./components/DirectCategoryProductsPanel.jsx";
import { GlobalFooterActions } from "./components/GlobalFooterActions.jsx";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [subcategoriaAtiva, setSubcategoriaAtiva] = useState(null);
  const isMobile = isMobileViewport();

  const categoriaSelecionada = categorias.find((c) => c.titulo === categoriaAtiva);
  const subcategoriaSelecionada = categoriaSelecionada?.subcategorias?.find(
    (sub) => sub.titulo === subcategoriaAtiva
  );

  const produtosLancamentos = [
    {
      nome: "Buquê de flores 01",
      descricao: "Flores de papel tamanho 18 x 20, Kits com mais de uma unidade preços especiais",
      tipo: "Flores",
      preco: "A partir de R$ 25,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
    },
    {
      nome: "Topos Com flores",
      descricao: "Topos com flores de papel e detalhes em dourado",
      tipo: "Topos",
      preco: "A partir de R$ 35,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Religioso_10.png"
    },
    {
      nome: "Topo de Bolo Batismo",
      descricao: "Topo de bolo Feito em camadas com Pais metalizados e dourados. (18 cm)",
      tipo: "Topo de bolo",
      preco: "A partir de R$ 25,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Religioso_08.png"
    },
    {
      nome: "Caixa Envelope 3 Bis",
      descricao: "Lembrança prática em embalagem personalizada",
      tipo: "Doces",
      preco: "A partir de R$ 6,50",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Caixa_Envelope_3biz.png"
    }
  ];

  const renderLancamentos = () => (
    <section style={estilos.lancamentosSection}>
      <div style={estilos.sectionHeader}>
        <p
          style={{
            fontSize: "14px",
            color: "#8b6b61",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "8px"
          }}
        >
          Destaque
        </p>
        <h2
          style={{
            fontSize: "34px",
            color: "#5a3e36",
            marginBottom: "8px"
          }}
        >
          Lançamentos
        </h2>
        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#7a655a",
            fontSize: "15px"
          }}
        >
          Novidades artesanais direto da nossa papelaria para você.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px"
        }}
      >
        {produtosLancamentos.map((prod, i) => (
          <div
            key={i}
            style={estilos.lancamentoCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 22px 48px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            }}
          >
            <span style={estilos.lancamentoBadge}>{prod.tipo}</span>
            <div style={{ overflow: "hidden", borderRadius: "14px" }}>
              <img
                src={prod.imagem}
                alt={prod.nome}
                style={estilos.imagem}
              />
            </div>
            <p style={{ fontWeight: 600, marginTop: "16px", fontSize: "18px" }}>
              {prod.nome}
            </p>
            {prod.descricao && (
              <p
                style={{
                  color: "#8b6b61",
                  fontSize: "14px",
                  margin: "10px 0 0 0",
                  lineHeight: 1.6
                }}
              >
                {prod.descricao}
              </p>
            )}
            <p
              style={{
                fontWeight: "bold",
                color: "#c8a96a",
                marginTop: "10px"
              }}
            >
              {prod.preco}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#999",
                marginTop: "6px"
              }}
            >
              {prod.tipo}
            </p>
            <a
              href={gerarLinkWhatsApp(prod.nome)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button style={{ ...estilos.botao, marginTop: "14px" }}>
                Solicitar orçamento
              </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );

  const resetNavigation = () => {
    setCategoriaAtiva(null);
    setSubcategoriaAtiva(null);
  };

  const voltarParaSubcategoria = () => {
    setSubcategoriaAtiva(null);
    voltarAoTopo();
  };

  const handleFooterBack = () => {
    if (subcategoriaAtiva) {
      voltarParaSubcategoria();
    } else {
      resetNavigation();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={estilos.container}>
      {!categoriaAtiva && <AppBanner isMobile={isMobile} />}

      {!categoriaAtiva && renderLancamentos()}

      {!categoriaAtiva && (
        <section style={{ marginTop: "50px" }}>
          <div style={estilos.sectionHeader}>
            <p style={estilos.sectionTag}>Categorias</p>
            <h2 style={estilos.sectionTitle}>Escolha a Coleção !</h2>
          </div>

          <CategoryHomeGrid
            categorias={categorias}
            estilos={estilos}
            onSelectCategory={(titulo) => {
              setCategoriaAtiva(titulo);
              voltarAoTopo();
            }}
          />
        </section>
      )}

      {categoriaSelecionada &&
        !subcategoriaAtiva &&
        categoriaSelecionada.subcategorias && (
          <SubcategoriasPanel
            categoriaSelecionada={categoriaSelecionada}
            subcategoriaSelecionada={subcategoriaSelecionada}
            estilos={estilos}
            onBack={resetNavigation}
            onSelectSubcategoria={(titulo) => {
              setSubcategoriaAtiva(titulo);
              voltarAoTopo();
            }}
          />
        )}

      {subcategoriaSelecionada && (
        <SubcategoriaProductsPanel
          categoriaSelecionada={categoriaSelecionada}
          subcategoriaSelecionada={subcategoriaSelecionada}
          estilos={estilos}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
          onResetNavigation={resetNavigation}
          onBack={voltarParaSubcategoria}
        />
      )}

      {categoriaSelecionada && !categoriaSelecionada.subcategorias && (
        <DirectCategoryProductsPanel
          categoriaSelecionada={categoriaSelecionada}
          subcategoriaSelecionada={subcategoriaSelecionada}
          estilos={estilos}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
          onBack={resetNavigation}
        />
      )}

      <GlobalFooterActions
        estilos={estilos}
        whatsappNumber={WHATSAPP_NUMBER}
        showBackButton={Boolean(categoriaSelecionada)}
        onBackToCollection={handleFooterBack}
        onScrollTop={voltarAoTopo}
      />
    </div>
  );
}
