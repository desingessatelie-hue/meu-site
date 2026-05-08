import React, { useState } from "react";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [subcategoriaAtiva, setSubcategoriaAtiva] = useState(null);

  const numeroWhatsApp = "5547996588988";

  const gerarLinkWhatsApp = (produto) => {
    const mensagem = `Olá! Tenho interesse no produto: ${produto} do Ateliê Pequenos Encantos by Eli.`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  };
const voltarAoTopo = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
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
              nome: "Caixa Envelope 3 Bis",
              tipo: "doces",
              preco: "A partir de R$ 6,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Caixa_Envelope_3biz.png"
              
            },
            {
              nome: "Caixa Envelope 4 Bis",
              tipo: "doces",
              preco: "A partir de R$ 8,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Caixa_Envelope_4biz.png"
            },
              {
              nome: "Caixa com tampa 4 Bis",
                tipo: "doces",
              preco: "A partir de R$ 9,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Caixa_Tampa_4biz.png"
            },
                        {
              nome: "Caixa Luz",
              tipo: "doces",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Caixa_luz.png"
            },
                        {
              nome: "Caixa Talento",
              tipo: "doces",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Caixa_Talento.png"
            },
                        {
              nome: "Card Bombom com Sonho de Valsa ou Outro Branco",
              tipo: "doces",
              preco: "A partir de R$ 3,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_bombom.png"
            },
            {
              nome: "Card Coelho com Biz ou Baton",
              tipo: "doces",
              preco: "A partir de R$ 3,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
            {
              nome: "Bloquinho Esperança A6",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
             {
              nome: "Bloquinho Esperança A6",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
             {
              nome: "Bloquinho Esperança A6",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
             {
              nome: "Bloquinho Esperança A6",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
            {
              nome: "Kit bloquinho 01",
              tipo: "kits",
              preco: "A partir de R$ 15,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
            {
              nome: "Kit bloquinho 01",
              tipo: "kits",
              preco: "A partir de R$ 15,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
            {
              nome: "Kit bloquinho 01",
              tipo: "kits",
              preco: "A partir de R$ 15,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
            },
           {
              nome: "Kit bloquinho 01",
              tipo: "kits",
              preco: "A partir de R$ 15,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Pascoa/Card_Coelho.png"
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
    topo: {
              position: "fixed",
              bottom: "90px",
              right: "20px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#c8a96a",
              color: "#fff",
              border: "none",
              fontSize: "22px",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              zIndex: 999
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
              setCategoriaAtiva(null);
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
        height: isMobile ? "220px" : "500px",
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
      padding: isMobile ? "20px" : "40px",
      borderRadius: "20px",
      textAlign: "center",
      width :isMobile ? "90%" : "80%",
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
                   key={i}
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
                  onClick={() => {
                        setCategoriaAtiva(cat.titulo);
                        voltarAoTopo();
                      }}
                
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              <h2>{cat.titulo}</h2>
              <button style={estilos.botao} onClick={() => {
                                                                  setCategoriaAtiva(cat.titulo);
                                                                  voltarAoTopo();
                                                                }}>
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
                    onClick={() => {
                                        setSubcategoriaAtiva(sub.titulo);
                                        voltarAoTopo();
                                      }}
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
                 onClick={() => {
                                          setSubcategoriaAtiva(sub.titulo);
                                          voltarAoTopo();
                                        }}
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
                    onClick={() => {
                                        setSubcategoriaAtiva(sub.titulo);
                                        voltarAoTopo();
                                      }}
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
                  onClick={() => {setSubcategoriaAtiva(sub.titulo);
                                          voltarAoTopo();
                                        }}
                >
                  Ver produtos
                </button>

              </div>
          ))}
        </div>

      
      </>

    ) : (
<>
    {/* OUTRAS CATEGORIAS 2*/}
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
                onClick={() => {
                                    setSubcategoriaAtiva(sub.titulo);
                                    voltarAoTopo();
                                  }}
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
              onClick={() => {
                                  setSubcategoriaAtiva(sub.titulo);
                                  voltarAoTopo();
                                }}
            >
              Ver produtos
            </button>

          </div>
        ))}
      </div>
</>
    )}
  </div>
)}



    
{/* PRODUTOS */}
{subcategoriaSelecionada && (
  <div style={{ marginTop: "20px" }}>

    <button
      style={estilos.voltar}
      onClick={() => {
                setCategoriaAtiva(null);
                setSubcategoriaAtiva(null);
                voltarAoTopo();
              }}
    >
      ← Voltar
    </button>

    <Breadcrumb />

    {/* MINI HEADER */}
    <h2 style={{
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "26px",
      color: "#5a3e36"
    }}>
      {subcategoriaSelecionada.titulo}
    </h2>

    <p style={{
      textAlign: "center",
      marginBottom: "35px",
      color: "#8b6b61",
      fontSize: "14px"
    }}>
      ✨ Produtos personalizados feitos artesanalmente com carinho
    </p>

    {/* ================================================= */}
    {/* PÁSCOA COM DIVISÕES */}
    {/* ================================================= */}

    {subcategoriaSelecionada.titulo === "Páscoa" ? (

      <>

        {/* DOCES */}
        <h2 style={{
          marginBottom: "20px",
          color: "#5a3e36",
          fontSize: "24px",
          textAlign: "center"
        }}>
          🍫 Doces e Lembrancinhas
        </h2>

        <div style={estilos.grid}>
          {subcategoriaSelecionada.produtos
            .filter(prod => prod.tipo === "doces")
            .map((prod, i) => (
              <div
                key={i}
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

                <p style={{
                  fontWeight: "600",
                  marginTop: "10px"
                }}>
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

                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank" rel="noopener noreferrer">
                  <button style={estilos.botao}>
                    Solicitar orçamento
                  </button>
                </a>

              </div>
          ))}
        </div>

        {/* PAPELARIA */}
        <h2 style={{
          marginTop: "50px",
          marginBottom: "20px",
          color: "#5a3e36",
          fontSize: "24px",
          textAlign: "center"
        }}>
          🎨 Papelaria Criativa
        </h2>

        <div style={estilos.grid}>
          {subcategoriaSelecionada.produtos
            .filter(prod => prod.tipo === "papelaria")
            .map((prod, i) => (
              <div
                key={i}
                style={estilos.card}
              >

                <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    style={estilos.imagem}
                  />
                </div>

                <p style={{
                  fontWeight: "600",
                  marginTop: "10px"
                }}>
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

                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank" rel="noopener noreferrer">
                  <button style={estilos.botao}>
                    Solicitar orçamento
                  </button>
                </a>

              </div>
          ))}
        </div>

        {/* KITS */}
        <h2 style={{
          marginTop: "50px",
          marginBottom: "20px",
          color: "#5a3e36",
          fontSize: "24px",
          textAlign: "center"
        }}>
          🎁 Kits Presente
        </h2>

        <div style={estilos.grid}>
          {subcategoriaSelecionada.produtos
            .filter(prod => prod.tipo === "kits")
            .map((prod, i) => (
              <div
                key={i}
                style={estilos.card}
              >

                <div style={{ overflow: "hidden", borderRadius: "14px" }}>
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    style={estilos.imagem}
                  />
                </div>

                <p style={{
                  fontWeight: "600",
                  marginTop: "10px"
                }}>
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

                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank" rel="noopener noreferrer">
                  <button style={estilos.botao}>
                    Solicitar orçamento
                  </button>
                </a>

              </div>
          ))}
        </div>

      </>

    ) : (
<>
  {/* OUTRAS SUBCATEGORIAS  1*/}
      <div style={estilos.grid}>
        {subcategoriaSelecionada.produtos.map((prod, i) => (
          <div
            key={i}
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
                                  </div>  {/*1*/}

                        <p style={{
                          fontWeight: "600",
                          marginTop: "10px"
                        }}>
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
            
                        <a href={gerarLinkWhatsApp(prod.nome)} target="_blank" rel="noopener noreferrer" >
                          <button style={estilos.botao}>
                            Solicitar orçamento
                          </button>
                        </a>

          </div> 
        
        ))}

        
        </div> 


</>
  )}
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

                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank" rel="noopener noreferrer">
                  <button style={estilos.botao}>
                    Solicitar orçamento
                  </button>
                </a>
              </div>
            ))}
          </div>

        </div>
  
      )}
     

    {/* BOTÃO GLOBAL */}
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "50px"
    }}>

      <button
        style={{
          padding: "14px 28px",
          borderRadius: "14px",
          border: "none",
          background: "linear-gradient(135deg, #c8a96a, #b8955a)",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
        }}
        onClick={() => {
          setCategoriaAtiva(null);
          setSubcategoriaAtiva(null);
          

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      >
        ← Voltar para coleção
      </button>

      <a
          href="https://wa.me/5547996588988"
          target="_blank"
          rel="noopener noreferrer"
          style={estilos.whatsapp}
        >
          💬
        </a>
    <button
        style={estilos.topo}
        onClick={voltarAoTopo}
      >
        ↑
      </button>
    </div>
  </div>
  );
}
