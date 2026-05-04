// 🌟 VERSÃO PREMIUM ELEGANTE (NEUTRA)
// Atualize apenas o arquivo src/App.jsx com este código

import React, { useState } from "react";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);

  const numeroWhatsApp = "5547996588988";

  const gerarLinkWhatsApp = (produto) => {
    const mensagem = `Olá! Tenho interesse no produto: ${produto} do Ateliê Pequenos Encantos by Eli.`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  };

const categorias = [
  {
    titulo: "Festas e Lembrancinhas",
    imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_festa.jpg",
    subcategorias: [
      {
        titulo: "Topo de Bolo",
        produtos: [
          {
            nome: "Topo de Bolo Floral",
            imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/topo_3.jpg"
          },
          {
            nome: "Topo de Bolo Casamento",
            imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/topo_4.jpg"
          }
           {
            nome: "Topo de Bolo Personalizado",
            imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/topo_2.jpg"
          }
          {
            nome: "Topo de Bolo Infantil",
            imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/topo_5.jpg"
          }
        ]
      }
    ]
  },

  {
    titulo: "Cartonagem",
    produtos: [
      { nome: "Caixa Livro" },
      { nome: "Álbum Artesanal" }
    ]
  },

  {
    titulo: "Papelaria Artesanal",
    produtos: [
      { nome: "Agenda" },
      { nome: "Caderno" }
    ]
  },

  {
    titulo: "Kit Digital",
    produtos: [
      { nome: "Kit Scrapbook" },
      { nome: "Papéis Digitais" }
    ]
  }
];

  const categoriaSelecionada = categorias.find(c => c.titulo === categoriaAtiva);

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
      fontSize: "32px",
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
      padding: "20px",
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
      <h1 style={estilos.titulo}>Ateliê 123 Pequenos Encantos by Eli </h1>

      {!categoriaAtiva && (
        <div style={estilos.grid}>
          {categorias.map((cat, i) => (
            <div key={i} style={estilos.card}>
              <img 
                src={cat.imagem} 
                style={{ width: "100%", borderRadius: "12px", marginBottom: "10px" }} 
              />
              <h2>{cat.titulo}</h2>
              <button style={estilos.botao} onClick={() => setCategoriaAtiva(cat.titulo)}>
                Ver produtos
              </button>
            </div>
          ))}
        </div>
      )}

      {categoriaSelecionada && (
        <div>
          <button style={estilos.voltar} onClick={() => setCategoriaAtiva(null)}>
            ← Voltar
          </button>

          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            {categoriaSelecionada.titulo}
          </h2>

          <div style={estilos.grid}>
            {categoriaSelecionada.produtos.map((prod, i) => (
              <div key={i} style={estilos.card}>
                <p>{prod.nome}</p>
                <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                  <button style={estilos.botao}>Comprar no WhatsApp</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
