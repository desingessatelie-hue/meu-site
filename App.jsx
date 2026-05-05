// 🌟 VERSÃO PREMIUM ELEGANTE (NEUTRA)
// Atualize apenas o arquivo src/App.jsx com este código

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
            nome: "Batismo ",
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
    ]  //sub categoria
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
    imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_KitDigital.png",
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
      padding: "40px 20px",
      fontFamily: "'Playfair Display', serif",
      color: "#3a3a3a"
    },
    titulo: {
      textAlign: "center",
      fontSize: "38px",
      letterSpacing: "1px",
      marginBottom: "40px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px"
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "25px",
      lineHeight: "1.5",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      textAlign: "center"
    },
    botao: {
      marginTop: "10px",
      padding: "10px 16px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#d8c7b1",
      color: "#fff",
      cursor: "pointer"
    },
    voltar: {
      marginBottom: "20px",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "#777"
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
            <img 
              src={cat.imagem} 
              style={{ width: "100%", borderRadius: "12px", marginBottom: "10px" }} 
            />
            <h2>{cat.titulo}</h2>
            <button onClick={() => setCategoriaAtiva(cat.titulo)}>
              Ver coleção
            </button>
          </div>
        ))}
      </div>
    )}

    {/* SUBCATEGORIAS */}
    {categoriaSelecionada && !subcategoriaAtiva && categoriaSelecionada.subcategorias && (
      <div>
        <button onClick={() => setCategoriaAtiva(null)}>← Voltar</button>
        <h2>{categoriaSelecionada.titulo}</h2>

        <div style={estilos.grid}>
          {categoriaSelecionada.subcategorias.map((sub, i) => (
            <div key={i} style={estilos.card}>
              <h3>{sub.titulo}</h3>
              <button onClick={() => setSubcategoriaAtiva(sub.titulo)}>
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
        <button onClick={() => setSubcategoriaAtiva(null)}>← Voltar</button>
        <h2>{subcategoriaSelecionada.titulo}</h2>

        <div style={estilos.grid}>
          {subcategoriaSelecionada.produtos.map((prod, i) => (
            <div key={i} style={estilos.card}>
              <img 
                src={prod.imagem} 
                  style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }} 
              />
              <p>{prod.nome}</p>
              <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                <button style={{
                      marginTop: "10px",
                      padding: "12px",
                      width: "100%",
                      border: "none",
                      borderRadius: "10px",
                      background: "#c8a96a",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}>
                      Comprar no WhatsApp
                    </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
);
}
