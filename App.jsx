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
      colo
