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
import { ProductModal } from "./components/ProductModal.jsx";

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
  const [showSobreModal, setShowSobreModal] = useState(false);

  const abrirProduto = (produto) => {
    const colecao =
      produto.colecao ||
      produto.subcategoria ||
      subcategoriaSelecionada?.titulo ||
      categoriaSelecionada?.titulo ||
      null;

    const tamanhos =
      Array.isArray(produto.tamanhos) && produto.tamanhos.length > 0
        ? produto.tamanhos
        : produto.tamanho
        ? [produto.tamanho]
        : [];

    const tamanho = produto.tamanho || null;

    const composicao =
      produto.composicao ||
      produto["composição"] ||
      produto.kit_composicao ||
      produto.kitComposicao ||
      produto.conteudo_kit ||
      (String(produto.tipo || "").toLowerCase().includes("kit")
        ? "Composição personalizada sob consulta."
        : null);

    setProdutoAtivo({
      ...produto,
      categoria: produto.categoria || categoriaSelecionada?.titulo,
      subcategoria: produto.subcategoria || subcategoriaSelecionada?.titulo,
      colecao,
      tamanho,
      tamanhos,
      composicao
    });
  };

  const sobreImage1 = new URL("../imagens/Sobre/Bancada.png", import.meta.url).href;
  const sobreImage2 = new URL("../imagens/Sobre/Ellen.png", import.meta.url).href;

  const navigateByTipo = (tipo) => {
    const t = String(tipo || "").toLowerCase().trim();
    if (t.includes("namor")) {
      setCategoriaAtiva("Datas Especiais");
      setSubcategoriaAtiva("Dia dos Namorados");
      return;
    }
    if (t.includes("bloco") || t.includes("blocos_a6") || t.includes("blocos a6") || t.includes("agenda") || t.includes("planner") || t.includes("caderno")) {
      setCategoriaAtiva("Papelaria Artesanal");
      setSubcategoriaAtiva("Encadernação");
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
              onClick={() => abrirProduto(prod)}
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
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
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
            <div style={{ flex: 1 }} />
              <a
                href={gerarLinkWhatsApp(prod.nome)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <button style={{ ...estilos.botao, marginTop: "auto" }}>
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
            style={{ ...estilos.lancamentoCard, display: "flex", flexDirection: "column" }}
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
            <div style={{ overflow: "hidden", borderRadius: "14px", cursor: "pointer" }} onClick={() => abrirProduto(prod)}>
              <img
                src={prod.imagem}
                alt={prod.nome}
                style={estilos.imagem}
              />
            </div>
            <p style={{ fontWeight: 600, marginTop: "16px", fontSize: "18px", cursor: "pointer" }} onClick={() => abrirProduto(prod)}>
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
            <div style={{ flex: 1 }} />
            <a
              href={gerarLinkWhatsApp(prod.nome)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <button style={{ ...estilos.botao, marginTop: "auto" }}>
                Solicitar orçamento
              </button>
            </a>
          </div>
        ))}
      </div>
  </section>
  );

  const renderSobre = () => (
    <section
      style={{
        marginTop: "60px",
        marginBottom: "60px",
        padding: "50px",
        background: "linear-gradient(135deg, #fff9f0 0%, #fef5e7 100%)",
        borderRadius: "28px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        maxWidth: "1000px",
        margin: "60px auto"
      }}
    >
      <div style={estilos.sectionHeader}>
        <p style={estilos.sectionTag}>Conheça Pequenos Encantos by Eli</p>
        <h2 style={estilos.sectionTitle}>Nossa História</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "24px" : "40px",
          alignItems: isMobile ? "start" : "center",
          marginTop: "30px"
        }}
      >
        <div>
          <p
            style={{
              color: "#7a655a",
              fontSize: "16px",
              lineHeight: 1.8,
              marginBottom: "20px"
            }}
          >
            Há mais de 10 anos transformando papel, criatividade e carinho em peças únicas e personalizadas. Sou apaixonada pelo artesanato e pela papelaria criativa, desenvolvendo produtos que tornam cada momento ainda mais especial.
          </p>
          <p
            style={{
              color: "#7a655a",
              fontSize: "16px",
              lineHeight: 1.8,
              marginBottom: "20px"
            }}
          >
            Cada peça é feita com dedicação, carinho e atenção aos detalhes. Acreditamos que os presentes mais especiais são aqueles que carregam um toque pessoal e uma história única.
          </p>

        </div>

        <div>
          <div
            style={{
              background: "#fff",
              padding: isMobile ? "22px" : "30px",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "32px" }}>🎨</span>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#5a3e36" }}>100% Artesanal</h3>
                  <p style={{ margin: 0, color: "#8b6b61", fontSize: "14px" }}>
                    Produtos feitos à mão com dedicação
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "32px" }}>✨</span>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#5a3e36" }}>Personalizados</h3>
                  <p style={{ margin: 0, color: "#8b6b61", fontSize: "14px" }}>
                    Cada projeto pensado especialmente para você
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "32px" }}>💝</span>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#5a3e36" }}>Com Qualidade</h3>
                  <p style={{ margin: 0, color: "#8b6b61", fontSize: "14px" }}>
                    Materiais selecionados e acabamento perfeito
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "32px" }}>🌟</span>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#5a3e36" }}>Único</h3>
                  <p style={{ margin: 0, color: "#8b6b61", fontSize: "14px" }}>
                    Cada criação é uma obra de arte exclusiva
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          paddingTop: "40px",
          borderTop: "1px solid rgba(200,169,106,0.2)",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <button
          style={{
            padding: "14px 28px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #f7b8d8 0%, #f17fa3 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
          }}
          onClick={() => setShowSobreModal(true)}
        >
          📝 Sobre mim ...
        </button>
        <a href={gerarLinkWhatsApp("Gostaria de saber mais sobre seus produtos!")} target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              border: "none",
              backgroundColor: "#128C7E",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
            }}
          >
            📞 Conversar no WhatsApp
          </button>
        </a>
        <a href="https://www.instagram.com/ellen_ess" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
            }}
          >
            📷 Seguir no Instagram
          </button>
        </a>
      </div>
    </section>
  );

  const renderSobreModal = () => {
    if (!showSobreModal) return null;

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 1400
        }}
        onClick={() => setShowSobreModal(false)}
      >
        <div
          style={{
            width: "min(960px, 100%)",
            background: "#fff",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 26px 70px rgba(0,0,0,0.25)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: "20px",
                minHeight: "280px"
              }}
            >
              <div style={{ display: "grid", gap: "14px", minHeight: "280px" }}>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", minHeight: "180px" }}>
                  <img
                    src={sobreImage1}
                    alt="Bancada do ateliê"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", minHeight: "120px" }}>
                  <img
                    src={sobreImage2}
                    alt="Ellen no ateliê"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>
              </div>
              <div style={{ padding: "38px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between", maxHeight: "calc(100vh - 120px)" }}>
                <div style={{ overflowY: "auto", paddingRight: "8px", maxHeight: "calc(100vh - 240px)" }}>
                  <h2 style={{ marginTop: 0, marginBottom: "18px", fontSize: "32px", color: "#5a3e36" }}>
                    Sobre Mim
                  </h2>
                  <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Seja muito bem-vindo(a) ao Ateliê Pequenos Encantos by Eli!
                  </p>
                  <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Meu nome é Ellen, sou esposa, mãe de dois meninos incríveis, Matheus e Emmanuel, e a artesã responsável por cada criação que nasce neste ateliê.
                  </p>
                  <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Minha formação acadêmica é na área de tecnologia. Sou graduada em Sistemas de Informação e pós-graduada em Qualidade de Software, profissão que exerci durante muitos anos. No entanto, a maternidade transformou minha forma de enxergar a vida e minhas prioridades.
                  </p>
                  <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Quando meus filhos cresceram, compreendi que cada criança possui sua própria forma de enxergar e sentir o mundo. Em nossa jornada familiar, enfrentamos desafios que exigiram mais presença, atenção e cuidado, especialmente no acompanhamento do desenvolvimento e bem-estar emocional de um dos meus filhos.
                  </p>
                  <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Essa experiência me fez reavaliar prioridades e entender que alguns momentos da vida são preciosos demais para serem vividos à distância. Foi então que decidi deixar minha carreira na área de tecnologia para estar mais próxima da minha família, acompanhando de forma mais ativa o crescimento dos meus filhos e oferecendo o suporte que eles precisavam.
                  </p>
                                    <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    O amor pelas artes manuais começou muito cedo. Cresci acompanhando minha mãe em diversos cursos e atividades artesanais, aprendendo técnicas como Bauer Malerei, macramê, tricô, crochê, pintura campestre e muitas outras formas de expressão criativa. Essas experiências despertaram em mim o encantamento pelo trabalho feito à mão e pelo cuidado presente em cada detalhe.
                  </p>
                                    <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Anos depois, encontrei no Scrapbook, na papelaria artesanal e na cartonagem uma verdadeira paixão. Descobri no papel um universo de possibilidades para criar produtos únicos, capazes de transformar momentos especiais em lembranças inesquecíveis.
                  </p>
                                    <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Assim nasceu o Ateliê Pequenos Encantos by Eli, um espaço dedicado à criação de peças artesanais personalizadas, desenvolvidas com carinho, dedicação e atenção aos mínimos detalhes.
                  </p>
                                    <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Aqui, cada agenda, planner, caderno, lembrancinha, caixa, kit presenteável ou projeto personalizado carrega muito mais do que papel e materiais: carrega histórias, sonhos, emoções e o amor de quem acredita que os pequenos detalhes fazem toda a diferença.
                  </p>
                                    <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Nossa missão é criar produtos que encantem, emocionem e ajudem a eternizar momentos especiais, levando beleza, delicadeza e significado para a vida de cada cliente.
                  </p>
                 <p style={{ color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                    Agradeço por sua visita e por valorizar o trabalho artesanal. Será uma alegria fazer parte da sua história.
                  </p>
                  <p style={{ color: "#2c2927", fontSize: "16px", lineHeight: 1.8, marginBottom: "25px" }}>
                    Nossa missão:
                  </p>
                  <ul style={{ paddingLeft: "22px", color: "#5d4a3d", fontSize: "16px", lineHeight: 1.8 }}>
                    <li>Atendimento personalizado.</li>
                    <li>Produtos feitos sob medida.</li>
                    <li>Entregas cuidadosas e embalagens especiais.</li>
                    <li>Peças únicas com acabamento impecável.</li>
                  </ul>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
                  <button
                    style={{
                      ...estilos.botao,
                      flex: "1 1 180px",
                      maxWidth: "220px",
                      padding: "14px 24px"
                    }}
                    onClick={() => setShowSobreModal(false)}
                  >
                    Fechar
                  </button>
                  <a
                    href={gerarLinkWhatsApp("Gostaria de mais informações sobre a Ellen Ess e seus produtos!")}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: "1 1 180px", maxWidth: "220px", textDecoration: "none" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      style={{
                        ...estilos.botao,
                        backgroundColor: "#128C7E",
                        padding: "14px 24px"
                      }}
                    >
                      WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      <ProductModal
        produto={produtoAtivo}
        onClose={() => setProdutoAtivo(null)}
        gerarLinkWhatsApp={gerarLinkWhatsApp}
        variant={isMobile ? "mobile" : "desktop"}
      />
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

          {!categoriaAtiva && renderSobre()}
          {renderSobreModal()}
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
          onProdutoClick={abrirProduto}
        />
      )}

      {categoriaSelecionada && !categoriaSelecionada.subcategorias && (
        <DirectCategoryProductsPanel
          categoriaSelecionada={categoriaSelecionada}
          subcategoriaSelecionada={subcategoriaSelecionada}
          estilos={estilos}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
          onBack={resetNavigation}
          onProdutoClick={abrirProduto}
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
