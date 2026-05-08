import React, { useState } from "react";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [subcategoriaAtiva, setSubcategoriaAtiva] = useState(null);

  const numeroWhatsApp = "5547996588988";

  const gerarLinkWhatsApp = (produto) => {
    const mensagem = `Olá! Tenho interesse no produto: ${produto} do Ateliê Pequenos Encantos by Eli.`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  };

  const categorias = [
    {
      titulo: "Festas e Lembrancinhas",
      
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_festa.png",
      subcategorias: [
        {
          titulo: "Topo de Bolo",
          grupo: "festas",
           imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Bolo.png",
          produtos: [
            {
              nome: "Topo de Bolo Floral",
              preco: "A partir de R$ 30,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_3.png"
            },
            {
              nome: "Topo de Bolo Casamento",
              preco: "A partir de R$ 30,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_4.png"
            },
            {
              nome: "Topo de Bolo Personalizado",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_2.png"
            },
            {
              nome: "Topo de Bolo Infantil",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_5.png"
            }
          ]
        },
        {
          titulo: "Topo de Brigadeiro e CupCake",
          grupo: "festas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro.png",
          produtos: [
            {
              nome: "Batismo",
              preco: "A partir de R$ 1,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro02.png"
            },
            {
              nome: "Infantil",
              preco: "A partir de R$ 0,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro03.png"
            },
            {
              nome: "Personalizado",
              preco: "A partir de R$ 0,70",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro01.png"
            },
            {
              nome: "Cupcake",
              preco: "A partir de R$ 1,75",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Cupcake01.png"
            }
          ]
        },
        {
          titulo: "Caixas de lembrancinhas",
          grupo: "festas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Caixas.png",
          produtos: [
            {
              nome: "Caixa Milk",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro02.png"
            },
            {
              nome: "Caixa Sushi",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro03.png"
            },
            {
              nome: "Centro de Mesa",
              preco: "A partir de R$ 3,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro01.png"
            },
            {
              nome: "Caixa Bau",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Cupcake01.png"
            },
            {
              nome: "Caixa Alca",
              preco: "A partir de R$ 2,50",

              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Cupcake01.png"
            }
          ]
        },
        {
          titulo: "Páscoa",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa.png",
          produtos: [
            {
              nome: "Caixa Milk",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Caixa Sushi",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            }
  
          ]
        },
         {
          titulo: "Dia das Mães",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Mae-logo.png",
          produtos: [
            {
              nome: "Caixa com Sabonete",
              preco: "R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Mae-01.png"
            },
           {
              nome: "Caixa com Sabonete 2",
              preco: "R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Mae-02.png"
            },
            {
              nome: "Buque com Baton",
              preco: "A partir de R$ 6,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Mae-03.png"
            }
  
          ]
        },
      {
          titulo: "Namorados",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Namorados.png",
          produtos: [
            {
              nome: "Caixa Milk",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Caixa Sushi",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            }
  
          ]
        },
        {
          titulo: "Festa Juninas",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Festa_junina.png",
          produtos: [
            {
              nome: "Caixa Milk",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Caixa Sushi",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            }
  
          ]
        }
      ]
    },

    {
      titulo: "Cartonagem",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_Cartonagem.png",
      subcategorias: [
        {
          titulo: "Caixas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
          produtos: [
            { nome: "Caixa Livro", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Caixa Organizadora", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Álbuns",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
          produtos: [
            { nome: "Álbum Artesanal", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Álbum Fotográfico", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Cestas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
          produtos: [
            { nome: "Cesta Personalizada", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Kit Escritório",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
          produtos: [
            { nome: "Porta Lápis", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Organizador de Mesa", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        }
      ]
    },

    {
      titulo: "Papelaria Artesanal",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_Papelaria.png",
      subcategorias: [
        {
          titulo: "Agendas",
          produtos: [
            { nome: "Agenda Personalizada", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Agenda Permanente", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Planners",
          produtos: [
            { nome: "Planner Diário", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Planner Semanal", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Cadernos",
          produtos: [
            { nome: "Caderno Personalizado", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Caderno Escolar", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Blocos A6",
          produtos: [
            { nome: "Bloco de Notas A6", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Canetas Personalizadas",
          produtos: [
            { nome: "Caneta Decorada", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Caneta Personalizada", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Kits Bebê",
          produtos: [
            { nome: "Kit Bebê Personalizado", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Kits Lembrancinhas",
          produtos: [
            { nome: "Kit Lembrancinha Festa", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        },
        {
          titulo: "Datas Comemorativas",
          produtos: [
            { nome: "Lembrancinha Dia das Mães", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" },
            { nome: "Lembrancinha Natal", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png" }
          ]
        }
      ]
    },

    {
      titulo: "Kit Digital",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
      produtos: [
        { nome: "Kit Scrapbook" },
        { nome: "Papéis Digitais" }
      ]
    }
  ];

  const categoriaSelecionada = categorias.find((c) => c.titulo === categoriaAtiva);

  const subcategoriaSelecionada = categoriaSelecionada?.subcategorias?.find(
    (sub) => sub.titulo === subcategoriaAtiva
  );

  const estilos = {
    container: {
      backgroundColor: "#f7f5f2",
      minHeight: "100vh",
      padding: "50px 20px",
      fontFamily: "'Playfair Display', serif",
      color: "#3a3a3a"
    },
    titulo: {
      textAlign: "center",
      fontSize: "40px",
      marginBottom: "50px"
    },
          banner: {
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "40px"
          },
      overlay: {
          background: "rgba(255,255,255,0.15)", // mais claro
          backdropFilter: "blur(8px)", // efeito vidro premium
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          color: "#3a3a3a",
          maxWidth: "600px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)"
      },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "30px"
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "18px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      transition: "0.3s"
    },
    imagem: {
      width: "100%",
      aspectRatio: "4 / 5",
      height: "auto",
      objectFit: "cover",
      borderRadius: "14px",
      transition: "0.4s",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    },
   botao: {
        marginTop: "12px",
        padding: "12px",
        width: "100%",
        border: "none",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #c8a96a, #b8955a)",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
      },
    voltar: {
      marginBottom: "25px",
      padding: "8px 14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer"
    },
  
      subtitulo: {
        marginTop: "10px",
        fontSize: "16px"
      },
        whatsapp: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        fontSize: "26px",
        padding: "14px 16px",
        borderRadius: "50%",
        textDecoration: "none",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }
  };
const Breadcrumb = () => {
  return (
    <div style={{
      marginBottom: "20px",
      fontSize: "14px",
      color: "#888",
      textAlign: "center"
    }}>
      
      <span 
        style={{ cursor: "pointer" }}
        onClick={() => {
          setCategoriaAtiva(null);
          setSubcategoriaAtiva(null);
        }}
      >
        Home
      </span>

      {categoriaSelecionada && (
        <>
          {" • "}
          <span 
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSubcategoriaAtiva(null);
            }}
          >
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
};
return (
  <div style={estilos.container}>

    {/* BANNER */}
{!categoriaAtiva && (
  <div style={{ position: "relative", width: "100%", marginBottom: "40px" }}>

    <img 
      src="https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/banner.png"
      style={{
        width: "100%",
        height: window.innerWidth < 768 ? "220px" : "500px",
        objectFit: "cover",
        borderRadius: "20px"
      }}
    />

    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)",
      padding: window.innerWidth < 768 ? "20px" : "40px",
      borderRadius: "20px",
      textAlign: "center",
      width: window.innerWidth < 768 ? "90%" : "80%",
      maxWidth: "600px",
      marginBottom: "50px"
    }}>

      <h1>Ateliê Pequenos Encantos by Eli</h1>

      <p>Papelaria artesanal e personalizados feitos com carinho</p>

    </div>
  </div>
)}


      {/* CATEGORIAS */}
      {!categoriaAtiva && (
        <div id="produtos" style={estilos.grid}>
          {categorias.map((cat, i) => (
            <div
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
                  style={{
                    ...estilos.imagem,
                    cursor: "pointer"
                  }}
                  onClick={() => setCategoriaAtiva(cat.titulo)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              <h2>{cat.titulo}</h2>
              <button style={estilos.botao} onClick={() => setCategoriaAtiva(cat.titulo)}>
                Ver coleção
              </button>
            </div>
          ))}
        </div>
      )}


{/* SUBCATEGORIAS */}
{categoriaSelecionada && !subcategoriaAtiva && categoriaSelecionada.subcategorias && (
  <div style={{ marginTop: "20px" }}>

    <button
      style={estilos.voltar}
      onClick={() => {
        setCategoriaAtiva(null);
        setSubcategoriaAtiva(null);
      }}
    >
      ← Voltar
    </button>

    <Breadcrumb />

    {/* MINI HEADER */}
    <h2 style={{
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "26px",
      color: "#5a3e36"
    }}>
      {categoriaSelecionada.titulo}
    </h2>

    <p style={{
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "14px",
      color: "#777"
    }}>
      💛 Produtos personalizados sob encomenda.
      Cada peça é única e feita especialmente para você.
    </p>

    {/* ===================================== */}
    {/* FESTAS E LEMBRANCINHAS */}
    {/* ===================================== */}

    {categoriaSelecionada.titulo === "Festas e Lembrancinhas" ? (

      <>

        {/* FESTAS */}
        <h2 style={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "#5a3e36",
          textAlign: "center",
          fontSize: "24px"
        }}>
          ✨ Festas Personalizadas
        </h2>

        <div style={estilos.grid}>
          {categoriaSelecionada.subcategorias
            .filter(sub => sub.grupo === "festas")
            .map((sub, i) => (
              <div key={i} style={estilos.card}>

                {sub.imagem && (
                  <img
                    src={sub.imagem}
                    style={{
                      ...estilos.imagem,
                      cursor: "pointer"
                    }}
                    onClick={() => setSubcategoriaAtiva(sub.titulo)}
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
                  onClick={() => setSubcategoriaAtiva(sub.titulo)}
                >
                  Ver produtos
                </button>

              </div>
          ))}
        </div>

        {/* DATAS */}
        <h2 style={{
          marginTop: "50px",
          marginBottom: "20px",
          color: "#5a3e36",
          textAlign: "center",
          fontSize: "24px"
        }}>
          🎄 Datas Comemorativas
        </h2>

        <div style={estilos.grid}>
          {categoriaSelecionada.subcategorias
            .filter(sub => sub.grupo === "datas")
            .map((sub, i) => (
              <div key={i} style={estilos.card}>

                {sub.imagem && (
                  <img
                    src={sub.imagem}
                    style={{
                      ...estilos.imagem,
                      cursor: "pointer"
                    }}
                    onClick={() => setSubcategoriaAtiva(sub.titulo)}
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
                  onClick={() => setSubcategoriaAtiva(sub.titulo)}
                >
                  Ver produtos
                </button>

              </div>
          ))}
        </div>

      </>

    ) : (

      /* OUTRAS CATEGORIAS */
      <div style={estilos.grid}>
        {categoriaSelecionada.subcategorias.map((sub, i) => (
          <div key={i} style={estilos.card}>

            {sub.imagem && (
              <img
                src={sub.imagem}
                style={{
                  ...estilos.imagem,
                  cursor: "pointer"
                }}
                onClick={() => setSubcategoriaAtiva(sub.titulo)}
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
              onClick={() => setSubcategoriaAtiva(sub.titulo)}
            >
              Ver produtos
            </button>

          </div>
        ))}
      </div>

    )}

  </div>
)}



    
      {/* PRODUTOS */}
    {subcategoriaSelecionada && (
     <div style={{ marginTop: "20px" }}>
  <button
    style={estilos.voltar}
    onClick={() => setSubcategoriaAtiva(null)}
  >
    ← Voltar
  </button>
<Breadcrumb />
  {/* MINI HEADER */}
  <h2 style={{
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "26px",
    color: "#5a3e36"
  }}>
    {subcategoriaSelecionada.titulo}
  </h2>

          <div style={estilos.grid}>
            {subcategoriaSelecionada.produtos.map((prod, i) => (
              <div key={i} style={estilos.card}>
                <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                  <img
                    src={prod.imagem}
                    style={estilos.imagem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
                
                <p style={{ fontWeight: "600", marginTop: "10px" }}>
                  {prod.nome}
                </p>
                
                {prod.preco && (
                  <p style={{
                    fontWeight: "bold",
                    color: "#c8a96a",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}>
                     💰 {prod.preco}
                  </p>
                )}
               <p style={{
                fontSize: "13px",
                color: "#999",
                marginTop: "4px"
              }}>
                Feito sob medida para você 💛
              </p>

                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                  <button style={estilos.botao}>
                    Solicitar orçamento
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUTOS DIRETOS */}
      {categoriaSelecionada && !categoriaSelecionada.subcategorias && (
       <div style={{ marginTop: "20px" }}>
          <button
            style={estilos.voltar}
            onClick={() => {
              setCategoriaAtiva(null);
              setSubcategoriaAtiva(null);
            }}
          >
            ← Voltar
          </button>
<Breadcrumb />
   

            <h2 style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "26px",
              color: "#5a3e36"
            }}>
              {categoriaSelecionada.titulo}
            </h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.produtos.map((prod, i) => (
              <div key={i} style={estilos.card}>
                <p style={{ fontWeight: "600", marginTop: "10px" }}>
                    {prod.nome}
                  </p>

                {prod.preco && (
                 <p style={{ 
                      fontWeight: "bold", 
                      color: "#c8a96a",
                      fontSize: "15px"
                    }}>
                      {prod.preco}
                    </p>
                )}
              <p style={{
                fontSize: "13px",
                color: "#999",
                marginTop: "4px"
              }}>
                Feito sob medida para você 💛
              </p>

                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                  <button style={estilos.botao}>
                    Solicitar orçamento
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      <a
          href="https://wa.me/5547996588988"
          target="_blank"
          style={estilos.whatsapp}
        >
          💬
        </a>
    </div>
  );
}
