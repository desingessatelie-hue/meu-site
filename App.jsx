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
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_3.png"
            },
            {
              nome: "Topo de Bolo Casamento",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_4.png"
            },
            {
              nome: "Topo de Bolo Personalizado",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_2.png"
            },
            {
              nome: "Topo de Bolo Infantil",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_5.png"
            }
          ]
        },
        {
          titulo: "Topo de Brigadeiro e CupCake",
          produtos: [
            {
              nome: "Batismo",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro02.png"
            },
            {
              nome: "Infantil",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro03.png"
            },
            {
              nome: "Personalizado",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Brigadeiro01.png"
            },
            {
              nome: "Cupcake",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Cupcake01.png"
            }
          ]
        }
      ]
    },

    {
      titulo: "Cartonagem",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_Cartonagem.png",
      produtos: [
        { nome: "Caixa Livro" },
        { nome: "Álbum Artesanal" }
      ]
    },

    {
      titulo: "Papelaria Artesanal",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_Papelaria.png",
      produtos: [
        { nome: "Agenda" },
        { nome: "Caderno" }
      ]
    },

    {
      titulo: "Kit Digital",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/cate_KitDigital.png",
      produtos: [
        { nome: "Kit Scrapbook" },
        { nome: "Papéis Digitais" }
      ]
    }
  ];

  const categoriaSelecionada = categorias.find(
    (c) => c.titulo === categoriaAtiva
  );

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
    marginBottom: "50px",
    letterSpacing: "1px"
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
  cursor: "pointer",
  letterSpacing: "0.5px"
  },
voltar: {
  marginBottom: "25px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  color: "#555",
  fontSize: "14px",
  transition: "0.3s"
}
};
  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>Ateliê Pequenos Encantos by Eli</h1>

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
          <button   style={estilos.voltar}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0ece6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                  onClick={() => setCategoriaAtiva(null)}}>
                    ← Voltar
                  </button>
          <h2>{categoriaSelecionada.titulo}</h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.subcategorias.map((sub, i) => (
              <div key={i} style={estilos.card}>
                <h3>{sub.titulo}</h3>
                <button style={estilos.botao} onClick={() => setSubcategoriaAtiva(sub.titulo)}>
                  Ver produtos
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUTOS COM SUBCATEGORIA */}
      {subcategoriaSelecionada && (
        <div>
       <button   style={estilos.voltar}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0ece6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                  onClick={() => setCategoriaAtiva(null)}}>
                    ← Voltar
                  </button>
          <h2>{subcategoriaSelecionada.titulo}</h2>

          <div style={estilos.grid}>
            {subcategoriaSelecionada.produtos.map((prod, i) => (
              <div key={i} style={estilos.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.05)";
                  }}
                >
           
                <img 
                    src={prod.imagem} 
                    style={estilos.imagem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                <p>{prod.nome}</p>
                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                  <button style={estilos.botao} >Comprar no WhatsApp</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUTOS DIRETOS */}
      {categoriaSelecionada && !categoriaSelecionada.subcategorias && (
        <div>
         <button   style={estilos.voltar}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0ece6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                  onClick={() => setCategoriaAtiva(null)}}>
                    ← Voltar
                  </button>
          <h2>{categoriaSelecionada.titulo}</h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.produtos.map((prod, i) => (
              <div key={i} style={estilos.card}>
                <p>{prod.nome}</p>
                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                  <button style={estilos.botao}>Comprar</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
