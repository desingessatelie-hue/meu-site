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
  const [busca, setBusca] = useState("");
  const isMobile = isMobileViewport();

  const categoriaSelecionada = categorias.find((c) => c.titulo === categoriaAtiva);
  const subcategoriaSelecionada = categoriaSelecionada?.subcategorias?.find(
    (sub) => sub.titulo === subcategoriaAtiva
  );
  const [produtoAtivo, setProdutoAtivo] = useState(null);

  const navigateByTipo = (tipo) => {
    const t = String(tipo || "").toLowerCase().trim();
    if (t.includes("namor")) {
      setCategoriaAtiva("Datas Comemorativas");
      setSubcategoriaAtiva("Dia dos Namorados");
      return;
    }
    if (t.includes("bloco") || t.includes("blocos_a6") || t.includes("blocos a6")) {
      setCategoriaAtiva("Papelaria Artesanal");
      setSubcategoriaAtiva("Blocos A6");
      return;
    }
    if (t.includes("flores")) {
      setCategoriaAtiva("Papelaria Artesanal");
      setSubcategoriaAtiva("Jardim de Papel");
      return;
    }
    if (t.includes("pequenos")) {
      setCategoriaAtiva("Papelaria Artesanal");
      setSubcategoriaAtiva("Pequenos Mimos");
      return;
    }
    if (t.includes("topo")) {
      setCategoriaAtiva("Festas e Lembrancinhas");
      setSubcategoriaAtiva("Topo de Bolo");
      return;
    }
    if (t.includes("personaliz")) {
      setCategoriaAtiva("Papelaria Artesanal");
      setSubcategoriaAtiva("Personalizados");
      return;
    }
    // fallback
    setCategoriaAtiva("Papelaria Artesanal");
    setSubcategoriaAtiva("Canetas Personalizadas");
  };

  const produtosLancamentos = [
    {
      nome: "Lápis Personalizados",
      descricao: "🌸 Doce Jardim de Inverno, Lápis hb com ponteira ",
      tipo: "Lápis",
      preco: "A partir de R$ 7,50",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Canetas_01.png"
    },
        {
      nome: "Buquê de Chocolates - Dia dos Namorados",
      descricao: "Caixas personalizada com nome, recheada de chocolates(Ouro Branco).",
      tipo: "Namorados",
      preco: "A partir de R$ 35,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_04.png"
    },
        {
      nome: "🌸 Doce Jardim de Inverno ",
      descricao: "Bloquinho encantador mais lápis floral.",
      tipo: "Blocos_A6",
      preco: "A partir de R$ 15,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Blocos_A6/Bloco_01.png"
    },
    {
      nome: "Buquê de flores 01",
      descricao: "Flores de papel tamanho 18 x 20, Kits com mais de uma unidade preços especiais",
      tipo: "Flores",
      preco: "A partir de R$ 25,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
    },
    {
      nome: "Pequenos Mimos - Pirulito de coração",
      descricao: "Um pequeno Mimo para um Grande Momento, Personalizaveis em diversos Temas",
      tipo: "Pequenos Mimos",
      preco: "A partir de R$ 1,50",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Pirulito_coração.png"
    },
    {
      nome: "Topo de Bolo Batismo",
      descricao: "Topo de bolo Feito em camadas com Pais metalizados e dourados. (18 cm)",
      tipo: "Topo de bolo",
      preco: "A partir de R$ 25,00",
      imagem:
        "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_08.png"
    },
    {
      nome: "Personalização de Embalagem",
      descricao: "Embalagem para sabonete Artezanal, Personalizada com nome ou mensagem",
      tipo: "Personalização",
      preco: "A partir de R$ 1,50",
      imagem:"https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Personalizacao/Personalizacao_01.png"
    }
  ];

  const categoriasFiltradas = categorias.filter((cat) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;

    const tituloMatch = cat.titulo.toLowerCase().includes(termo);

    const produtoMatch = (prod) =>
      prod.nome?.toLowerCase().includes(termo) ||
      prod.tipo?.toLowerCase().includes(termo) ||
      prod.descricao?.toLowerCase().includes(termo);

    const subcategoriaMatch = cat.subcategorias?.some((sub) => {
      const subMatch = sub.titulo.toLowerCase().includes(termo);
      const produtoSubMatch = sub.produtos?.some(produtoMatch);
      return subMatch || produtoSubMatch;
    });

    const produtosDiretosMatch = cat.produtos?.some(produtoMatch);

    return tituloMatch || subcategoriaMatch || produtosDiretosMatch;
  });

  const categoriasParaHome = categoriasFiltradas;

  const produtosEncontrados = busca.trim()
    ? categorias.reduce((acc, cat) => {
        const categoriaMatch = cat.titulo.toLowerCase().includes(busca.trim().toLowerCase());

        cat.subcategorias?.forEach((sub) => {
          const subMatch = sub.titulo.toLowerCase().includes(busca.trim().toLowerCase());
          if (categoriaMatch || subMatch) {
            sub.produtos?.forEach((prod) =>
              acc.push({ ...prod, categoria: cat.titulo, subcategoria: sub.titulo })
            );
          } else {
            sub.produtos?.forEach((prod) => {
              if (
                prod.nome?.toLowerCase().includes(busca.trim().toLowerCase()) ||
                prod.tipo?.toLowerCase().includes(busca.trim().toLowerCase()) ||
                prod.descricao?.toLowerCase().includes(busca.trim().toLowerCase())
              ) {
                acc.push({ ...prod, categoria: cat.titulo, subcategoria: sub.titulo });
              }
            });
          }
        });

        if (cat.produtos) {
          if (categoriaMatch) {
            cat.produtos.forEach((prod) => acc.push({ ...prod, categoria: cat.titulo }));
          } else {
            cat.produtos.forEach((prod) => {
              if (
                prod.nome?.toLowerCase().includes(busca.trim().toLowerCase()) ||
                prod.tipo?.toLowerCase().includes(busca.trim().toLowerCase()) ||
                prod.descricao?.toLowerCase().includes(busca.trim().toLowerCase())
              ) {
                acc.push({ ...prod, categoria: cat.titulo });
              }
            });
          }
        }

        return acc;
      }, [])
    : [];

  const renderSearchResults = () => (
    <section style={{ marginTop: "50px" }}>
      <div style={estilos.sectionHeader}>
        <p style={estilos.sectionTag}>Resultados da busca</p>
        <h2 style={estilos.sectionTitle}>Produtos encontrados</h2>
      </div>

      {produtosEncontrados.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "24px"
          }}
        >
          {produtosEncontrados.map((prod, index) => (
            <div
              key={`${prod.nome}-${index}`}
              style={{ ...estilos.card, cursor: "pointer" }}
              onClick={() => setProdutoAtivo(prod)}
            >
              {prod.imagem && (
                <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                  <img src={prod.imagem} alt={prod.nome} style={estilos.imagem} />
                </div>
              )}
              <h3 style={{ marginTop: "16px" }}>{prod.nome}</h3>
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
              {prod.preco && (
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#c8a96a",
                    marginTop: "10px"
                  }}
                >
                  {prod.preco}
                </p>
              )}
              <p style={{ fontSize: "13px", color: "#999", marginTop: "6px" }}>
                {prod.subcategoria ? `${prod.categoria} • ${prod.subcategoria}` : prod.categoria}
              </p>
              <a
                href={gerarLinkWhatsApp(prod.nome)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <button style={{ ...estilos.botao, marginTop: "14px" }}>
                  Solicitar orçamento
                </button>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#7a655a", fontSize: "16px" }}>
          Nenhum produto encontrado para "{busca}".
        </p>
      )}
    </section>
  );

  const renderLancamentos = () => (
    <section style={estilos.lancamentosSection}>
      <div style={estilos.sectionHeader}>
        <p
          style={{
            fontSize: "13px",
            color: "#8b6b61",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "6px"
          }}
        >
          Destaque
        </p>
        <h2
          style={{
            fontSize: "28px",
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
            fontSize: "14px"
          }}
        >
          Novidades artesanais direto da nossa papelaria para você.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          margin: "24px 0 16px 0"
        }}
      >
        {[
          { icon: "🚀", label: "Lançamentos quentes" },
          { icon: "✨", label: "Novidades exclusivas" },
          { icon: "🔥", label: "Oferta imperdível" }
        ].map((item, index) => (
          <span
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 242, 225, 0.9)",
              color: "#8b6b61",
              fontSize: "14px",
              fontWeight: 600,
              border: "1px solid rgba(200,169,106,0.25)"
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
            <span
              style={{ ...estilos.lancamentoBadge, cursor: "pointer" }}
              onClick={() => {
                navigateByTipo(prod.tipo);
                setProdutoAtivo(null);
                voltarAoTopo();
              }}
            >
              {prod.tipo}
            </span>
            <div style={{ overflow: "hidden", borderRadius: "14px", cursor: "pointer" }} onClick={() => setProdutoAtivo(prod)}>
              <img
                src={prod.imagem}
                alt={prod.nome}
                style={estilos.imagem}
              />
            </div>
            <p style={{ fontWeight: 600, marginTop: "16px", fontSize: "18px", cursor: "pointer" }} onClick={() => setProdutoAtivo(prod)}>
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
                marginTop: "6px",
                cursor: "pointer"
              }}
              onClick={() => {
                navigateByTipo(prod.tipo);
                setProdutoAtivo(null);
                voltarAoTopo();
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

  const renderProdutoDetalhe = () => {
    if (!produtoAtivo) return null;

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1200
        }}
        onClick={() => setProdutoAtivo(null)}
      >
        <div
          style={{
            width: "min(920px, 96%)",
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ flex: "0 0 320px", overflow: "hidden", borderRadius: 12 }}>
              <img src={produtoAtivo.imagem} alt={produtoAtivo.nome} style={{ width: "100%" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ marginTop: 0 }}>{produtoAtivo.nome}</h2>
              {produtoAtivo.descricao && (
                <p style={{ color: "#7a655a" }}>{produtoAtivo.descricao}</p>
              )}
              {produtoAtivo.preco && (
                <p style={{ fontWeight: 700, color: "#c8a96a" }}>{produtoAtivo.preco}</p>
              )}

              <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
                <a href={gerarLinkWhatsApp(produtoAtivo.nome)} target="_blank" rel="noopener noreferrer">
                  <button style={estilos.botao}>Solicitar orçamento</button>
                </a>
                <button style={{ ...estilos.botao, backgroundColor: "#eee", color: "#333" }} onClick={() => setProdutoAtivo(null)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

      {!categoriaAtiva && (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px 0 10px 0" }}>
          <input
            type="search"
            placeholder="Buscar coleção, subcategoria ou produto..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            style={estilos.searchInput}
          />
        </div>
      )}

      {!categoriaAtiva && busca.trim() ? (
        renderSearchResults()
      ) : (
        <>
          {!categoriaAtiva && (
            <section style={{ marginTop: "50px" }}>
              <div style={estilos.sectionHeader}>
                <p style={estilos.sectionTag}>Categorias</p>
                <h2 style={estilos.sectionTitle}>Escolha a Coleção !</h2>
              </div>

              {categoriasParaHome.length > 0 ? (
                <CategoryHomeGrid
                  categorias={categoriasParaHome}
                  estilos={estilos}
                  onSelectCategory={(titulo) => {
                    setCategoriaAtiva(titulo);
                    voltarAoTopo();
                  }}
                />
              ) : (
                <p style={{ textAlign: "center", color: "#7a655a", fontSize: "16px" }}>
                  Nenhuma coleção encontrada para "{busca}".
                </p>
              )}
            </section>
          )}

          {!categoriaAtiva && renderLancamentos()}
        </>
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
          onProdutoClick={(produto) => setProdutoAtivo(produto)}
        />
      )}

      {categoriaSelecionada && !categoriaSelecionada.subcategorias && (
        <DirectCategoryProductsPanel
          categoriaSelecionada={categoriaSelecionada}
          subcategoriaSelecionada={subcategoriaSelecionada}
          estilos={estilos}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
          onBack={resetNavigation}
          onProdutoClick={(produto) => setProdutoAtivo(produto)}
        />
      )}

      {renderProdutoDetalhe()}

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
