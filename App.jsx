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
      boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
      transition: "0.3s"
    },
    imagem: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "14px",
      transition: "0.4s"
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
      cursor: "pointer"
    },
    voltar: {
      marginBottom: "25px",
      padding: "8px 14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer"
    }
    banner: {
        backgroundImage: "url('https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        borderRadius: "20px",
        marginBottom: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: "30px",
        borderRadius: "20px",
        textAlign: "center",
        color: "#fff"
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

  return (
    <div style={estilos.container}>
      <div style={estilos.banner}>
        <div style={estilos.overlay}>
          <h1 style={estilos.titulo}>Ateliê Pequenos Encantos by Eli</h1>
          <p style={estilos.subtitulo}>
            Papelaria artesanal e personalizados feitos com carinho 💛
          </p>
        </div>
      </div>

      {/* CATEGORIAS */}
      {!categoriaAtiva && (
        <div style={estilos.grid}>
          {categorias.map((cat, i) => (
            <div key={i} style={estilos.card}>
              <img src={cat.imagem} style={estilos.imagem} />
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
        <div>
          <button
            style={estilos.voltar}
            onClick={() => {
              setCategoriaAtiva(null);
              setSubcategoriaAtiva(null);
            }}
          >
            ← Voltar
          </button>

          <h2>{categoriaSelecionada.titulo}</h2>
                      
            <p style={{ textAlign: "center", marginBottom: "20px", fontSize: "14px", color: "#777" }}>
              💛 Produtos personalizados sob encomenda. Valores variam conforme tamanho, material e acabamento. 
            </p>
          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias.map((sub, i) => (
              <div key={i} style={estilos.card}>
                {sub.imagem && <img src={sub.imagem} style={estilos.imagem} />}
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
        </div>
      )}

      {/* PRODUTOS */}
      {subcategoriaSelecionada && (
        <div>
          <button
            style={estilos.voltar}
            onClick={() => setSubcategoriaAtiva(null)}
          >
            ← Voltar
          </button>

          <h2>{subcategoriaSelecionada.titulo}</h2>

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
                  <p style={{ fontWeight: "bold", color: "#c8a96a" }}>
                    {prod.preco}
                  </p>
                )}

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
        <div>
          <button
            style={estilos.voltar}
            onClick={() => {
              setCategoriaAtiva(null);
              setSubcategoriaAtiva(null);
            }}
          >
            ← Voltar
          </button>

          <h2>{categoriaSelecionada.titulo}</h2>

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
