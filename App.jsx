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
      produtos: [
        { nome: "Topo de Bolo" },
        { nome: "Caixa Personalizada" }
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

  return (
    <div style={{ padding: 20, fontFamily: "serif" }}>
      <h1>Ateliê Pequenos Encantos by Eli</h1>

      {!categoriaAtiva && (
        <div>
          {categorias.map((cat, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h2>{cat.titulo}</h2>
              <button onClick={() => setCategoriaAtiva(cat.titulo)}>
                Ver produtos
              </button>
            </div>
          ))}
        </div>
      )}

      {categoriaSelecionada && (
        <div>
          <button onClick={() => setCategoriaAtiva(null)}>Voltar</button>
          <h2>{categoriaSelecionada.titulo}</h2>

          {categoriaSelecionada.produtos.map((prod, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <p>{prod.nome}</p>
              <a href={gerarLinkWhatsApp(prod.nome)} target="_blank">
                <button>WhatsApp</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}