const agendaThemesImports = {
  Feminino: import.meta.glob("../../imagens/Papelaria/Agendas/Temas/Feminino/*", {
    eager: true,
    import: "default"
  }),
  Masculino: import.meta.glob("../../imagens/Papelaria/Agendas/Temas/Masculino/*", {
    eager: true,
    import: "default"
  }),
  Infantil: import.meta.glob("../../imagens/Papelaria/Agendas/Temas/Infantil/*", {
    eager: true,
    import: "default"
  }),
  Religioso: import.meta.glob("../../imagens/Papelaria/Agendas/Temas/Religioso/*", {
    eager: true,
    import: "default"
  }),
  Miolos: import.meta.glob("../../imagens/Papelaria/Agendas/Temas/Candy/*", {  
    eager: true,  
    import: "default"
  })

};

const criarBibliotecaAgendas = (nomeCategoria, importsMap) => ({
  nome: nomeCategoria,
  temasBiblioteca: Object.entries(importsMap)
    .map(([caminho, url]) => {
      const nomeArquivo = caminho.split("/").pop() || "tema";
      const tema = nomeArquivo.replace(/\.[^/.]+$/, "");

      return {
        tema,
        informacoesImportantes: "Modelo disponível para Você.",
        imagens: [url]
      };
    })
    .sort((a, b) => a.tema.localeCompare(b.tema, "pt-BR", { numeric: true }))
});

const bibliotecasModelosAgendas = [
  criarBibliotecaAgendas("Feminino", agendaThemesImports.Feminino),
  criarBibliotecaAgendas("Masculino", agendaThemesImports.Masculino),
  criarBibliotecaAgendas("Infantil", agendaThemesImports.Infantil),
  criarBibliotecaAgendas("Religioso", agendaThemesImports.Religioso),
  criarBibliotecaAgendas("Miolos", agendaThemesImports.Miolos)
];

const normalizarTemaArquivo = (nomeArquivo) => {
  const temaSemExtensao = nomeArquivo.replace(/\.[^/.]+$/, "");

  return temaSemExtensao
    .replace(/^[0-9]+\s*[-_ ]?/, "")
    .replace(/[_-]+/g, " ")
    .trim();
};

const gerarNomeProduto = (caminho) => {
  const nomeArquivo = caminho.split("/").pop() || "produto";
  const nomeSemExtensao = nomeArquivo.replace(/\.[^/.]+$/, "");

  return normalizarTemaArquivo(nomeSemExtensao) || nomeSemExtensao || "Produto";
};

const criarBibliotecaPorImports = ({
  nome,
  importsMap,
  textoPadrao = "Modelo disponível para Você.",
  pastaBase = null
}) => {
  const temasAgrupados = new Map();

  Object.entries(importsMap).forEach(([caminho, url]) => {
    const caminhoNormalizado = caminho.replace(/\\/g, "/");
    let nomeTema = "Tema";

    if (pastaBase) {
      const base = pastaBase.replace(/\\/g, "/").replace(/\/$/, "");
      const relativo = caminhoNormalizado.startsWith(base)
        ? caminhoNormalizado.slice(base.length + 1)
        : caminhoNormalizado.split("/").slice(-2, -1)[0] || "Tema";

      nomeTema = relativo ? relativo.split("/")[0] : "Tema";
    } else {
      const partes = caminhoNormalizado.split("/").filter(Boolean);
      nomeTema = partes.length > 0 ? partes[partes.length - 2] || partes[partes.length - 1] : "Tema";
    }

    const tema = normalizarTemaArquivo(nomeTema) || nomeTema || "Tema";
    const nomeProduto = gerarNomeProduto(caminhoNormalizado);

    if (!temasAgrupados.has(tema)) {
      temasAgrupados.set(tema, {
        tema,
        informacoesImportantes: textoPadrao,
        imagens: []
      });
    }

    const temaAtual = temasAgrupados.get(tema);
    const jaExiste = temaAtual.imagens.some((imagem) => {
      const urlImagem = typeof imagem === "string" ? imagem : imagem?.url;
      return urlImagem === url;
    });

    if (!jaExiste) {
      temaAtual.imagens.push({
        nome: nomeProduto,
        url,
        codigo: nomeProduto
      });
    }
  });

  return {
    nome,
    temasBiblioteca: Array.from(temasAgrupados.values()).sort((a, b) =>
      a.tema.localeCompare(b.tema, "pt-BR", { numeric: true })
    )
  };
};

const criarBibliotecasPorPastas = ({
  importsMap,
  pastaBase,
  textoPadrao = "Modelo disponível para Você."
}) => {
  const bibliotecasPorTema = new Map();

  Object.entries(importsMap).forEach(([caminho, url]) => {
    const caminhoNormalizado = caminho.replace(/\\/g, "/");
    const base = pastaBase.replace(/\\/g, "/").replace(/\/$/, "");
    const relativo = caminhoNormalizado.startsWith(base + "/")
      ? caminhoNormalizado.slice(base.length + 1)
      : caminhoNormalizado;

    const nomePasta = (relativo.split("/").filter(Boolean)[0] || "Tema").trim();
    const nomeBiblioteca = normalizarTemaArquivo(nomePasta) || nomePasta || "Tema";

    if (!bibliotecasPorTema.has(nomeBiblioteca)) {
      bibliotecasPorTema.set(nomeBiblioteca, {
        nome: nomeBiblioteca,
        temasBiblioteca: []
      });
    }

    const bibliotecaAtual = bibliotecasPorTema.get(nomeBiblioteca);
    const tema = nomeBiblioteca;
    const nomeProduto = gerarNomeProduto(caminhoNormalizado);
    const itemTema = bibliotecaAtual.temasBiblioteca.find((entry) => entry.tema === tema);

    if (itemTema) {
      const jaExiste = itemTema.imagens.some((imagem) => {
        const urlImagem = typeof imagem === "string" ? imagem : imagem?.url;
        return urlImagem === url;
      });

      if (!jaExiste) {
        itemTema.imagens.push({
          nome: nomeProduto,
          url,
          codigo: nomeProduto
        });
      }
      return;
    }

    bibliotecaAtual.temasBiblioteca.push({
      tema,
      informacoesImportantes: textoPadrao,
      imagens: [{
        nome: nomeProduto,
        url,
        codigo: nomeProduto
      }]
    });
  });

  return Array.from(bibliotecasPorTema.values()).sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR", { numeric: true })
  );
};

const bibliotecasPorPasta = {
  PaperDollsColoridas: import.meta.glob("../../imagens/datas_com/Ferias/PaperDolls_coloridas/*", {
    eager: true,
    import: "default"
  }),
  PaperDollsPB: import.meta.glob("../../imagens/datas_com/Ferias/PaperDolls_PB/*", {
    eager: true,
    import: "default"
  }),
  PaperDollsPBKIT: import.meta.glob("../../imagens/datas_com/Ferias/Kit_PaperDolls_PB/**/*", {
    eager: true,
    import: "default"
  }),
  PaperDollsColoridoKit: import.meta.glob("../../imagens/datas_com/Ferias/Kit_PaperDolls_colorido/**/*", {
    eager: true,
    import: "default"
  })
};

const bibliotecasModelosPaperDollsColoridas = [
  criarBibliotecaPorImports({
    nome: "PaperDolls Coloridas",
    importsMap: bibliotecasPorPasta.PaperDollsColoridas,
    pastaBase: "../../imagens/datas_com/Ferias/PaperDolls_coloridas"
  })
];

const bibliotecasModelosPaperDollsPB = [
  criarBibliotecaPorImports({
    nome: "PaperDolls PB",
    importsMap: bibliotecasPorPasta.PaperDollsPB,
    pastaBase: "../../imagens/datas_com/Ferias/PaperDolls_PB"
  })
];
const bibliotecasModelosPaperDollsPBKIT = criarBibliotecasPorPastas({
  importsMap: bibliotecasPorPasta.PaperDollsPBKIT,
  pastaBase: "../../imagens/datas_com/Ferias/Kit_PaperDolls_PB"
});

const bibliotecasModelosPaperDollsColoridoKit = criarBibliotecasPorPastas({
  importsMap: bibliotecasPorPasta.PaperDollsColoridoKit,
  pastaBase: "../../imagens/datas_com/Ferias/Kit_PaperDolls_colorido"
});


const bibliotecasModelosPaperDollsMultiPastas = [
  criarBibliotecaPorImports({
    nome: "PaperDolls Coloridas",
    importsMap: bibliotecasPorPasta.PaperDollsColoridas
  }),
  criarBibliotecaPorImports({
    nome: "PaperDolls PB",
    importsMap: bibliotecasPorPasta.PaperDollsPB
  })
];

const canetasThemesImports = {
  Capivaras: import.meta.glob("../../imagens/Papelaria/Canetas/Capivaras/*", {
    eager: true,
    import: "default"
  }),
  HelloKitty: import.meta.glob("../../imagens/Papelaria/Canetas/Hello_kitty/*", {
    eager: true,
    import: "default"
  }),
  Joias: import.meta.glob("../../imagens/Papelaria/Canetas/Joias/*", {
    eager: true,
    import: "default"
  }),
  Apagaveis: import.meta.glob("../../imagens/Papelaria/Canetas/Apagaveis/*", {
    eager: true,
    import: "default"
  }),
  Mickey: import.meta.glob("../../imagens/Papelaria/Canetas/Mickey/*", {
    eager: true,
    import: "default"
  }),
  Lápis: import.meta.glob("../../imagens/Papelaria/Canetas/Lapis_ponteira/*", {
    eager: true,
    import: "default"
  })
};

const bibliotecasModelosCanetas = {
  Capivaras: criarBibliotecaPorImports({
    nome: "Canetas Capivaras",
    importsMap: canetasThemesImports.Capivaras,
    pastaBase: "../../imagens/Papelaria/Canetas/Capivaras"
  }),
  HelloKitty: criarBibliotecaPorImports({
    nome: "Canetas HelloKitty",
    importsMap: canetasThemesImports.HelloKitty,
    pastaBase: "../../imagens/Papelaria/Canetas/Hello_kitty"
  }),
  Joias: criarBibliotecaPorImports({
    nome: "Canetas Joias",
    importsMap: canetasThemesImports.Joias,
    pastaBase: "../../imagens/Papelaria/Canetas/Joias"
  }),

  Mickey: criarBibliotecaPorImports({
    nome: "Canetas Mickey",
    importsMap: canetasThemesImports.Mickey,
    pastaBase: "../../imagens/Papelaria/Canetas/Mickey"
  }),

  Apagaveis: criarBibliotecaPorImports({
    nome: "Canetas Apagáveis",
    importsMap: canetasThemesImports.Apagaveis,
    pastaBase: "../../imagens/Papelaria/Canetas/Apagaveis"
  }),
  Lápis: criarBibliotecaPorImports({
    nome: "Lápis Temáticos",
    importsMap: canetasThemesImports.Lápis,
    pastaBase: "../../imagens/Papelaria/Canetas/Lapis_ponteira"
  })
};

const encadernacaoAcessoriosImports = {
  ClipsAdesivos: import.meta.glob("../../imagens/Papelaria/Encadernacao/Clips_magnetico/*", {
    eager: true,
    import: "default"
  }),
  Apliques: import.meta.glob("../../imagens/Papelaria/Encadernacao/Apliques/*", {
    eager: true,
    import: "default"
  }),
  MarcadoresMagneticos: import.meta.glob("../../imagens/Papelaria/Encadernacao/Clips_magnetico/*", {
    eager: true,
    import: "default"
  }),
  MarcaPaginas: import.meta.glob("../../imagens/Papelaria/Encadernacao/Marca_pagina/*", {
    eager: true,
    import: "default"
  }),
  Abas: import.meta.glob("../../imagens/Papelaria/Encadernacao/Abas/*", {
    eager: true,
    import: "default"
  })
};

const bibliotecasModelosAcessoriosAgendas = {
  ClipsAdesivos: criarBibliotecaPorImports({
    nome: "Clips Adesivos",
    importsMap: encadernacaoAcessoriosImports.ClipsAdesivos,
    pastaBase: "../../imagens/Papelaria/Encadernacao/Clips_magnetico"
  }),
  Apliques: criarBibliotecaPorImports({
    nome: "Apliques",
    importsMap: encadernacaoAcessoriosImports.Apliques,
    pastaBase: "../../imagens/Papelaria/Encadernacao/Apliques"
  }),
  MarcadoresMagneticos: criarBibliotecaPorImports({
    nome: "Marcadores Magnéticos",
    importsMap: encadernacaoAcessoriosImports.MarcadoresMagneticos,
    pastaBase: "../../imagens/Papelaria/Encadernacao/Clips_magnetico"
  }),
  MarcaPaginas: criarBibliotecaPorImports({
    nome: "Marca-Páginas",
    importsMap: encadernacaoAcessoriosImports.MarcaPaginas,
    pastaBase: "../../imagens/Papelaria/Encadernacao/Marca_pagina"
  }),
  Abas: criarBibliotecaPorImports({
    nome: "Abas",
    importsMap: encadernacaoAcessoriosImports.Abas,
    pastaBase: "../../imagens/Papelaria/Encadernacao/Abas"
  })  
};

export const categorias = [
    {
      titulo: "Festas e Lembrancinhas",
      descricao: "Decore suas festas com nossos topos de bolo personalizados, painéis temáticos e lembrancinhas encantadoras. Transforme cada celebração em um momento inesquecível com nossos produtos artesanais, feitos com amor e atenção aos detalhes. De aniversários a casamentos, temos opções para todas as ocasiões especiais.",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_festa.png",
      subcategorias: [
        {
          titulo: "Topo de Bolo",
          grupo: "festas",
           imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Bolo.png",
          produtos: [
            {
              nome: "Topo de Bolo Floral",
              tipo: "Flores",
              descricao: "Um topo delicado e sofisticado, perfeito para transformar qualquer bolo em uma verdadeira obra de arte! 💖 Com flores em camadas 3D, detalhes delicados e acabamento elegante, ele traz leveza e encanto para a decoração.. Indicado para Bolos de 23 até 30 cm",
              preco: "A partir de R$ 30,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_flor_01.png",
              materiais: "Papel 300g premium, flores de papel artesanal, haste de madeira e cola atóxica",
              tempo_entrega: "5-7 dias úteis",
              tamanhos: ["15cm", "20cm", "23cm", "28cm", "30cm"],
              cores: ["#F69AB2", "#FFB6D9", "#C8A96A", "#5a3e36", "#FFFFFF"]
              
            },
             {
              nome: "Topo de Bolo Floral1",
              tipo: "Flores",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Criancas.png",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_flor_02.png",
              materiais: "Papel 250g, flores de papel handmade, acabamento fosco",
              tempo_entrega: "5-7 dias úteis",
              tamanhos: ["15cm", "18cm", "20cm", "23cm"],
              cores: ["#FFB6D9", "#F69AB2", "#FFFFFF", "#E8D7C3"]
              
            },
             {
              nome: "Topo de Bolo Floral2",
              tipo: "Flores",
              descricao: "Um modelo elegante e sofisticado, com flores artesanais, borboletas douradas e detalhes delicados que deixam o bolo ainda mais encantador. Indicado para Bolos de 23 ate 30 cm",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_flor_03.png"
              
            },
           
             {
              nome: "Topo Video Game",
              tipo: "Painel",
              descricao: "Topo elegante em formato painel.(23 cm)",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Painel_01.png"
              
            },
             {
              nome: "Topo de Personagem",
              tipo: "Painel",
              descricao: "Topo elegante em formato painel com elementos e personagens.(23 cm)",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Painel_02.png"
              
            },


            {
              nome: "Baby Frutinha",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_01.png",
              materiais: "Papel 300g personalizado, tinta sublimada, haste de madeira",
              tempo_entrega: "7-10 dias úteis (inclui personalização)",
              tamanhos: ["20cm", "25cm", "30cm"],
              cores: ["#FFB6D9", "#F69AB2", "#FFEB3B", "#4CAF50", "#2196F3"]
            },
            {
              nome: "Mulher e Girassol",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_02.png"
            },
{
              nome: "Painel Personalizado",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_03.png"
            },
            {
              nome: "Menina Policial",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_04.png"
            },
            {
              nome: "Viagem Personalizada",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_05.png"
            },
            {
              nome: "Boteco Personalizado",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_06.png"
            },
            {
              nome: "Passarinho Personalizado",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_07.png"
            },
            {
              nome: "Bebida",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 27,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_08.png"
            },
            {
              nome: "Donnuts",
              tipo: "Personalizado",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 17,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Personalizado_09.png"
            },
            


            {
              nome: "Bombeiro",
              tipo: "Personagens",
              descricao: "Topo personalizado com nome ou frase em design exclusivo.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_01.png"
            },


            {
              nome: "Homem Aranha",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_02.png"
            },
                        {
              nome: "Michey Mouse",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_03.png"
            },
                        {
              nome: "Sonic",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_04.png"
            },
                        {
              nome: "Sonic 2",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_05.png"
            },
                        {
              nome: "Marinheiro",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_06.png"
            },
                                    {
              nome: "Casa da Gaby",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_07.png"
            },
                        {
              nome: "Safari",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_08.png"
            },
                                    {
              nome: "Formatura",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_09.png"
            },
                        {
              nome: "Minnei Rosa",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_10.png"
            },
                                    {
              nome: "Minnei Vermelha",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_11.png"
            },
                        {
              nome: "Alice no Pais das Maravilhas",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_12.png"
            },
                        {
              nome: "Show da Luna",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_13.png"
            },
                        {
              nome: "Moana Baby",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_14.png"
            },
                                    {
              nome: "Stitch",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_15.png"
            },
                        {
              nome: "Stitch 1",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_16.png"
            },
                                    {
              nome: "Stitch e Angel",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_17.png"
            },
                        {
              nome: "Ursa Chá de Bebê",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_18.png"
            },
                                    {
              nome: "Ursa realeza",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_19.png"
            },
                        {
              nome: "Ursa Baby",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_20.png"
            },
                                    {
              nome: "Ursa Florista",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_21.png"
            },
                        {
              nome: "Sereia",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_22.png"
            },
                                                {
              nome: "Fazendinha",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_23.png"
            },
                        {
              nome: "Stitch 3",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_24.png"
            },
                                                {
              nome: "Fazendinha espantalho",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_25.png"
            },
                        {
              nome: "Fazendinha Menino",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_26.png"
            },
                                                {
              nome: "Fazendinha 2",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_27.png"
            },
                        {
              nome: "Busque encantado",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_28.png"
            },
                                                {
              nome: "Marinheira",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_29.png"
            },
                        {
              nome: "Bluey",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_30.png"
            },
                                                {
              nome: "Dinossauro Bolo",
              tipo: "Personagens",
              descricao: "Topo infantil com tema personalizado para aniversários de crianças.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_personagens_31.png"
            },





             {
              nome: "Topo Crisma em camadas",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.",
              preco: "A partir de R$ 27,00 (25 até 30cm)",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_01.png"
            },
                         {
              nome: "Topo Crisma",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_02.png"
            },
                         {
              nome: "Topo Espirito Santo",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 25,00 ",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_03.png"
            },
                         {
              nome: "Topo de Espirito Santo 2",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_04.png"
            },
            {
              nome: "Cálice",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_07.png"
            },
                                     {
              nome: "Topo de Espirito Santo 3",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(até 25cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_08.png"
            },
              {
              nome: "Batizado de Espirito Santo ",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_05.png"
            },
                                     {
              nome: "Batizado menina",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_06.png"
            },
                                     
                                     {
              nome: "Bodas de Ouro",
              tipo: "Religioso",
              descricao: "Topo com temática religiosa para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 30,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_09.png"
            },
                                     {
              nome: "Casal de Noivos Floral",
              tipo: "Religioso",
              descricao: "Topo com temática de casamento para celebrações especiais.(Bolo de 2 andares com 10 e 15cm)",
              preco: "A partir de R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_10.png"
            },
                                     {
              nome: "Casal de Noivos Floral 1",
              tipo: "Religioso",
              descricao: "Topo com temática de casamento para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_11.png"
            },
                                     {
              nome: "Casal de Noivos Floral 2",
              tipo: "Religioso",
              descricao: "Topo com temática de casamento para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_12.png"
            },
                                     {
              nome: "Casal de Noivos",
              tipo: "Religioso",
              descricao: "Topo com temática de casamento para celebrações especiais.(25 até 30cm)",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Religioso_13.png"
            },

             {
              nome: "Futebol ",
              tipo: "Camadas",
              descricao: "Topo com camadas decoradas para bolos especiais.(25 cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_01.png"
            },
                         {
              nome: "Banner de nome ",
              tipo: "Camadas",
              descricao: "Topo com camadas Banner de nome mais Idade especiais.(23 cm)",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_02.png"
            },
            {
              nome: "Topo Musical",
              tipo: "Camadas",
              descricao: "Topo com camadas em papel Metalizado Prata.(25 cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_03.png"
            },
              {
              nome: "Topo Neon",
              tipo: "Camadas",
              descricao: "Topo com camadas papel Neon Especial.(25 cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_04.png"
            },
              {
              nome: "Topo Personagem",
              tipo: "Camadas",
              descricao: "Topo com camadas de personagens.(23 cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_05.png"
            },
            {
              nome: "Topo Jardim encantado",
              tipo: "Camadas",
              descricao: "Topo com camadas decoradas para bolos especiais.(23 cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_06.png"
            },
          {
              nome: "Topo Arco Iris",
              tipo: "Camadas",
              descricao: "Topo com camadas decoradas para bolos especiais.(23 cm)",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Camadas_07.png"
            },

             {
              nome: "Menina Dino",
              tipo: "Mês aniversário",
              descricao: "Topo divertido e colorido para comemorar o mês aniversário.",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Mes_01.png"
            },
             {
              nome: "Menina Abelha",
              tipo: "Mês aniversário",
              descricao: "Topo divertido e colorido para comemorar o mês aniversário.",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Mes_02.png"
            },
             {
              nome: "Patinha",
              tipo: "Mês aniversário",
              descricao: "Topo divertido e colorido para comemorar o mês aniversário.",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Mes_03.png"
            },
             {
              nome: "Manina Melância ",
              tipo: "Mês aniversário",
              descricao: "Topo divertido e colorido para comemorar o mês aniversário.",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Mes_04.png"
            },
             {
              nome: "Chefinha",
              tipo: "Mês aniversário",
              descricao: "Topo divertido e colorido para comemorar o mês aniversário.",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/Topo_bolos/Tp_Mes_05.png"
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
          descricao: " 🚧 Em Construção 🚧",
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
        }
      
 


       
      ]
    },

    {
      titulo: "Datas Especiais",
      descricao: " 🎉 Celebre momentos especiais com nossas lembrancinhas e kits personalizados para datas comemorativas! 🎁",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Dat_com.png",
      subcategorias: [

         {
          titulo: "Dia das Mulheres",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulher.png",
          produtos: [
             {
              nome: "Caderneta Wiero",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 8,00",
              descricao: "Caderneta tamanho A7.",
                imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Caderneta_wiroA7.png",
                colecao: "Dia das Mulheres",
                composicao: "Caderneta A7 personalizada para lembrancinha.",
                materiais: "Capa em papel 300g, miolo em papel offset, encadernação em wire-o.",
                tempo_entrega: "4-6 dias úteis",
                tamanhos: ["A7"],
                cores: ["#F69AB2", "#FFB6D9", "#FFD700", "#C8A96A"]
            },
            {
              nome: "Postit",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 8,00",
              descricao: "Post-it com 50 folhas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Postit.png"
            },
            {
              nome: "Kit Amarador",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 2,00",
              descricao: "Kit com 2 Amarrador.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Ammarador.png"
            },
            {
              nome: "Caixa Esmalte ou Creme de mão",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 10,00",
              descricao: "Caixa com esmalte ou creme de mão.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Caixa_esmalte.png"
            },
            {
              nome: "Cartão com presilha",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 7,50",
              descricao: "Cartão com presilha para lembrar de alguém especial.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Card_presilha.png"
            },
            {
              nome: "Cartão Explosão",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 10,50",
              descricao: "Caixa explosão,com 2 chocolates..",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Cartão_Bombom.png"
            },
             {
              nome: "Mensagem ",
              tipo: "Kits",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Base.png"
            },
            {
              nome: "Kit Mulher Especial",
              tipo: "Kits",
              preco: "A partir de R$ 10,00",
              descricao: "Caixa envelope,com 2 chocolates..",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/CaixaEnvelope_mulher.png"
            },
            {
              nome: "Monte seu Kit Mulher",
              tipo: "Kits",
              preco: "A partir de R$ 5,00",
              descricao: "Monte seu Kit personalizado com opções de caixa envelope, chocolates e cartão personalizado.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mulheres/Kit_dia.png"
            }
          ]
        },



       {
          titulo: "Dia das Mães",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae-logo.png",
          produtos: [
            {
              nome: "Caixa com Sabonete",
              tipo: "Presentes",
              preco: "R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-01.png"
            },
           {
              nome: "Caixa com Sabonete 2",
              tipo: "Presentes",
              preco: "R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-02.png"
            },
            {
              nome: "Buque com Baton",
              tipo: "Presentes",
              preco: "A partir de R$ 6,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-03.png"
            },

            {
              nome: "Topo de Bolo Dia das Mães (1)",
              tipo: "topo",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp01.png"
            },
            {
              nome: "Topo de Bolo Dia das Mães (2)",
              tipo: "topo",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp02.png"
            },
            {
              nome: "Topo de Bolo Dia das Mães Plaquinha Amor (3)",
              tipo: "topo",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp03.png"
            },
              {
              nome: "Topo de Bolo Dia das Mães (4)",
              tipo: "topo",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp04.png"
            },
              { 
              nome: "Topo de Bolo Dia das Mães (5)",
              tipo: "topo",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp05.png"
             },
              {
              nome: "Topo de Bolo Nome Mãe (6)",
              tipo: "topo",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp06.png"
             },
              {
              nome: "Topo de Bolo Dia das Mães Leque de Coração (7)",
              tipo: "topo",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp07.png"
              },
                { 
              nome: "Topo de Bolo Dia das Mães Coração (8)",
              tipo: "topo",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp08.png"
               },
                  { 
              nome: "Topo de Bolo Dia das Mães (9)",
              tipo: "topo",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Mae/Mae-Tp09.png"
               }

          ]
        },
         {
          titulo: "Páscoa",
          grupo: "datas",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa.png",
          produtos: [
            {
              nome: "Caixa Envelope 3 Bis",
              tipo: "doces",
              preco: "A partir de R$ 6,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_Envelope_3biz.png"
              
            },
            {
              nome: "Caixa Envelope 4 Bis",
              tipo: "doces",
              preco: "A partir de R$ 8,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_Envelope_4biz.png"
            },
              {
              nome: "Caixa com tampa 4 Bis",
                tipo: "doces",
              preco: "A partir de R$ 9,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_Tampa_4biz.png"
            },
                        {
              nome: "Caixa Luz",
              tipo: "doces",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_luz.png"
            },
                        {
              nome: "Caixa Talento",
              tipo: "doces",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_Talento.png"
            },
                        {
              nome: "Card Bombom com Sonho de Valsa ou Outro Branco",
              tipo: "doces",
              preco: "A partir de R$ 3,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Card_bombom.png"
            },
            {
              nome: "Card Coelho com Biz ou Baton",
              tipo: "doces",
              preco: "A partir de R$ 3,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Card_Coelho.png"
            },
            {
              nome: "Boobie Goode",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
               descricao: "Tamanho A6 com 20 desenhos diferentes, ideal para lembranças de aniversário",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Boobie_goode_slim.png"
            },
             {
              nome: "Bloquinho Esperança A7",
              tipo: "papelaria",
              preco: "A partir de R$ 8,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Bloquinho_a7_ho.png"
            },
             {
              nome: "Bloquinho Coelho A7",
              tipo: "papelaria",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Bloquinho_a7_vr.png"
            },
             {
              nome: "Caderneta A6 ",
              tipo: "papelaria",
              preco: "A partir de R$ 8,50",
                imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caderneta_A6.png",
                colecao: "Páscoa",
                composicao: "Caderneta personalizada para lembrancinha de Páscoa.",
                materiais: "Capa em papel 300g e miolo em papel offset.",
                tempo_entrega: "4-6 dias úteis",
                tamanhos: ["A6"],
                cores: ["#F6E27F", "#FFB6D9", "#87CEEB", "#90EE90"]
            },
             {
              nome: "Lápis Personalizado Azul",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Lapis_02.png"
            },
              { nome: "Lápis Personalizado Vermelho",
              tipo: "papelaria",
              preco: "A partir de R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Lapis_03.png"
            },
            {
              nome: "Grampo de Coelho Mini",
              tipo: "papelaria",
              preco: "A partir de R$ 4,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Grampo_pascoa.png"
            },
            {
              nome: "Kit Lembrancinha Coelho 01",
              tipo: "kits",
              preco: "A partir de R$ 12,50",
              descricao: "Bombom, Lápis decorada e tag coelho.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Kit_04.png"
            },
           {
              nome: "Kit Lembrancinha Coelho 02",
              tipo: "kits",
              preco: "A partir de R$ 45,50",
              descricao: "Caderneta A6, Bombom.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Kit_03.png"
            },
            {
              nome: "Kit Lembrancinha Coelho 03",
              tipo: "kits",
              preco: "A partir de R$ 18,00",
              descricao: "Caderneta A6, Chocolate, Lápis decorada e tag coelho.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Kit_01.png"
            },

            {
              nome: "Kit Caixa Coelho 01",
              tipo: "kits",
              preco: "A partir de R$ 45,50",
              descricao: "Caderneta A6, Caixa de bis e Caixa cartonada e personalizada no tema.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_01.png"
            },
            {
              nome: "Kit Caixa Coelho 02",
              tipo: "kits",
              preco: "A partir de R$ 55,00",
              descricao: "Caderneta A6,Chocolate, Caixa de bis e Caixa cartonada e personalizada no tema.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_02.png"
            },
           {
              nome: "Kit Caixa Coelho 03",
              tipo: "kits",
              preco: "A partir de R$ 39,00",
              descricao: "Bloquinho A7, Chocolate, Saboneta Natura e Caixa Personalizada.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pascoa/Caixa_03.png"
            }
          ]
        },
        {
          titulo: "Dia dos Namorados",
          grupo: "datas",
          descricao: "💘✨ Novidades✨💘",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados.png",
          produtos: [
            {
              nome: "Buquê de Chocolate - Big ",
              tipo: "Caixas Personalizadas ",
              descricao: "Caixas personalizada com nome, recheada de chocolates(15 -Ouro Branco).",
              preco: "A partir de R$ 80,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_01.png",
              colecao: "Dia dos Namorados",
              composicao: "Caixa personalizada + 15 bombons Ouro Branco."
            },
            {
              nome: "Buquê de Chocolate - Médio",
              tipo: "Caixas Personalizadas ",
              descricao: "Caixas personalizada com nome, recheada de chocolates(6-Ouro Branco).",
              preco: "A partir de R$ 50,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_02.png",
              colecao: "Dia dos Namorados",
              composicao: "Caixa personalizada + 6 bombons Ouro Branco."
            },
            {
              nome: "Buquê de Chocolate - Pequeno",
              tipo: "Caixas Personalizadas ",
              descricao: "Caixas personalizada com nome, recheada de chocolates(2-Ouro Branco).",
              preco: "A partir de R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_03.png",
              colecao: "Dia dos Namorados",
              composicao: "Caixa personalizada + 2 bombons Ouro Branco."
            },
            {
              nome: "Lapela de Mimos P",
              tipo: "Lapela em Formato de coração  ",
              descricao: "Caixas personalizada com nome, recheada de chocolates, Bombons ou mimos a escolha do cliente .",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_08.png",
              imagens: [
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_08.png",
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_09.png",
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_10.png"
              ],
              materiais: "O lapela é feito de papel cartão resistente, com acabamento em formato de coração, ideal para presentear com pequenos mimos e chocolates.",
              tempo_entrega: "5-7 dias úteis",
              tamanhos: ["P (14 x 20cm)"],
              colecao: "Dia dos Namorados",
              composicao: "Lapela em formato coração + bombons/chocolates ou mimos escolhidos pelo cliente.",
              cores: ["#FF6B9D", "#FFD700", "#87CEEB", "#90EE90"]
            },
              { 
              nome: "Lapela de Mimos M",
              tipo: "Lapela em Formato de coração  ",
              descricao: "Caixas personalizada com nome, recheada de chocolates, Bombons ou mimos a escolha do cliente .",
              preco: "A partir de R$ 35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_06.png",
              imagens: [
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_06.png",
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Namorados/Namorado_07.png"
                
              ],
              materiais: "O lapela é feito de papel cartão resistente, com acabamento em formato de coração, ideal para presentear com pequenos mimos e chocolates.",
              tempo_entrega: "5-7 dias úteis",
              tamanhos: ["M (20 x 30cm)"],
              colecao: "Dia dos Namorados",
              composicao: "Lapela em formato coração + bombons/chocolates ou mimos escolhidos pelo cliente.",
              cores: ["#FF6B9D", "#FFD700", "#87CEEB", "#90EE90"]
            }
          ]
        },
        {
          titulo: "Férias Escolares",
          grupo: "datas",
          descricao: "🏖️📚 Coleção especial para presentear e divertir nas férias.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias.png",
          produtos: [
            {
              nome: "1- Livro de colorir Boobie Goode A6",
              tipo: "Livro",
              mostrarTemas: true,
              preco: "A partir de R$ 15,00",
              descricao: "Livro de colorir com 40 desenhos diferentes.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/bobbie/Boobie_01.png",
              colecao: "Férias Escolares",
              composicao: "Combinação de itens de papelaria personalizada (bloquinho, lápis e adesivos, conforme disponibilidade).",
              temasBiblioteca: [
                {
                  tema: "Boobie Goode Bosque",
                  informacoesImportantes: "Estilo fofo com traços simples para colorir com lápis de cor.",
                  imagens: [
                    "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/bobbie/Boobie_01.png"
                  ]
                },
                {
                  tema: "Boobie Goode Praia",
                  informacoesImportantes: "Tema voltado para looks e acessórios.",
                  imagens: [
                    "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/bobbie/Boobie_01.png"
                  ]
                },
                {
                  tema: "Boobie Goode Fofurinhas",
                  informacoesImportantes: "Elementos de bichinhos, doces e objetos divertidos.",
                  imagens: [
                    "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/bobbie/Boobie_01.png"
                  ]
                }
              ]
            },
            {
              nome: "2 -Livro Paper dolls, Coloridos  A5",
              tipo: "Livro",
              mostrarTemas: true,
              preco: "A partir de R$ 45,00",
              descricao: "Livro temático para férias escolares. Contem 6 temas diferentes para colorir, ideal para momentos de lazer.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/PaperDolls_coloridas/1-Frutinhas.jpeg",
              colecao: "Férias Escolares",
              composicao: "Livro com ilustrações, para recortar e colar, ideal para momentos de lazer durante as férias.",
              temasBibliotecas: bibliotecasModelosPaperDollsColoridas
            }, 
             {
              nome: "3-Livro Paper dolls, Para colorir e recortar A5",
              tipo: "Livro de Colorir",
              mostrarTemas: true,
              preco: "A partir de R$ 45,00",
              descricao: "Livro temático para férias escolares.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/PaperDolls_PB/1-Frutinhas.jpeg",
              colecao: "Férias Escolares",
              composicao: "Livro com ilustrações para colorir, recortar e montar, ideal para momentos de lazer durante as férias.",
              temasBibliotecas: bibliotecasModelosPaperDollsPB
            },
            {
              nome: "4-Kit Paper dolls, A5 Colorido",
              tipo: "Livro de Colorir",
              mostrarTemas: true,
              preco: "Leve 1 por R$ 5,00 | Leve 2 por R$ 9,00",
              descricao: "Kit, de ilustrações para Cortar e Colar, ideal para momentos de lazer durante as férias.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/Capa_01.png",
              colecao: "Férias Escolares",
              composicao: "Kit com ilustrações para Cortar e Colar, 2 cenários e seus elementos e 2 bonecas com suas roupinhas, ideal para momentos de lazer durante as férias.",
              temasBibliotecas: bibliotecasModelosPaperDollsColoridoKit,
              "Promoção": true
            },
            {
              nome: "5-Kit Paper dolls + Boobie goodies, A5 PB",
              tipo: "Livro de Colorir",
              mostrarTemas: true,
              preco: "Leve 1 por R$ 5,00 | Leve 2 por R$ 9,00",
              descricao: "Kit, de ilustrações para Pintar, Cortar e Colar, ideal para momentos de lazer durante as férias.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Ferias/54.png",
              colecao: "Férias Escolares",
              composicao: "Kit com ilustrações para Pintar, Cortar e Colar, 2 cenários e seus elementos e 2 bonecas com suas roupinhas, ideal para momentos de lazer durante as férias.",
              temasBibliotecas: bibliotecasModelosPaperDollsPBKIT,
              "Promoção": true
            },
   
           
          ]
        },
        {
          titulo: "Festa Juninas",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Festa_junina.png",
          produtos: [
            {
              nome: "Caixa Milk",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Festa Juninas",
              composicao: "Caixa temática em papel para doces e mimos juninos."
            },
            {
              nome: "Caixa Sushi",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Festa Juninas",
              composicao: "Caixa temática em papel para doces e lembrancinhas juninas."
            }
          ]
        },
        {
          titulo: "Dia dos Pais",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉 💙🎁 Presentes personalizados para homenagear os pais.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Pais.png",
          produtos: [
            {
              nome: "Caixa Presente Dia dos Pais",
              tipo: "Presentes",
              preco: "A partir de R$ 22,00",
              descricao: "Caixa personalizada para mimos e mensagens especiais.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Dia dos Pais",
              composicao: "Caixa personalizada para incluir cartão e mimos selecionados pelo cliente."
            }
          ]
        },
        {
          titulo: "Dia das Crianças",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉 🧸🎈 Itens temáticos para encantar os pequenos.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Criancas.png",
          produtos: [
            {
              nome: "Lembrancinha Dia das Crianças",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 8,50",
              descricao: "Lembrancinha personalizada com tema infantil.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Dia das Crianças",
              composicao: "Lembrancinha temática infantil com embalagem personalizada."
            }
          ]
        },
        {
          titulo: "Dia dos Professores",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉 🍎✏️ Uma coleção para agradecer quem ensina com carinho.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor.png",
          produtos: [
            {
              nome: "Agenda A5",
              tipo: "Agenda",
              descricao: "Agenda personalizada tamanho A5 para organização diária.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Agenda_A5.png",
              colecao: "Encanto floral",
              composicao: "Agenda personalizada com capa temática para professores.",
              tamanhos: ["A5"]
            },
            {
              nome: "Agenda Big",
              tipo: "Agenda",
              descricao: "Agenda personalizada em formato grande para planejamento completo.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Agenda_Big.png",
              colecao: "Encanto floral",
              composicao: "Agenda personalizada com capa temática para professores.",
              tamanhos: ["19 x 24 cm (Big)"]
            },
            {
              nome: "Planejamento A5",
              tipo: "Planejamento",
              descricao: "Caderno de planejamento pedagógico tamanho A5.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Planejamento_A5.png",
              colecao: "Encanto floral",
              composicao: "Miolo de planejamento + capa personalizada.",
              tamanhos: ["A5"]
            },
            {
              nome: "Planejamento Big",
              tipo: "Planejamento",
              descricao: "Caderno de planejamento em formato grande.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Planejamento_Big.png",
              colecao: "Encanto floral",
              composicao: "Miolo de planejamento + capa personalizada.",
              tamanhos: ["19 x 24 cm (Big)"]
            },
            {
              nome: "Planner",
              tipo: "Planner",
              descricao: "Planner personalizado para rotina acadêmica e pessoal.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Planner_professor.png",
              colecao: "Encanto floral",
              composicao: "Planner com divisórias e páginas de organização."
            },
            {
              nome: "Organizador Semanal",
              tipo: "Organizador",
              descricao: "Organizador semanal para planejamento de aulas e tarefas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Organizador_S_A5.png",
              colecao: "Encanto floral",
              composicao: "Folhas de planejamento semanal com capa personalizada.",
              tamanhos: ["A5"]
            },
            {
              nome: "Caderno",
              tipo: "Caderno",
              descricao: "Caderno personalizado para notas e planejamento do professor.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Caderno.png",
              colecao: "Encanto floral",
              composicao: "Caderno com capa personalizada e miolo pautado."
            },
            {
              nome: "Lápis",
              tipo: "Papelaria",
              descricao: "Lápis e marcador personalizados para presentear professores.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/datas_com/Professor/Lapis_marcador.png",
              colecao: "Encanto floral",
              composicao: "Lápis e marcador com acabamento personalizado."
            }
          ]
        },
        {
          titulo: "Halloween",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉 🎃👻 Papelaria e lembrancinhas em clima de Halloween.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/festa/datas_com/Halloween.png",
          produtos: [
            {
              nome: "Caixa Halloween",
              tipo: "Lembrancinhas",
              preco: "A partir de R$ 9,00",
              descricao: "Caixinha temática para doces e mimos.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Halloween",
              composicao: "Caixinha temática para doces e mimos personalizados."
            }
          ]
        },
        {
          titulo: "Black Friday",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉 🖤🛍️ Seleção especial para ações promocionais e kits de campanha.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
          produtos: [
            {
              nome: "Kit Promo Black Friday",
              tipo: "Kits",
              preco: "A partir de R$ 19,90",
              descricao: "Kit promocional para ações especiais de Black Friday.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Black Friday",
              composicao: "Kit promocional com itens personalizados para campanha sazonal."
            }
          ]
        },
        {
          titulo: "Natal",
          grupo: "datas",
          descricao: "🎉🔥 Novidades em Breve 🔥🎉 🎄✨ Coleção natalina com opções para presentes e lembranças.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
          produtos: [
            {
              nome: "Caixa Presente Natalina",
              tipo: "Presentes",
              preco: "A partir de R$ 14,00",
              descricao: "Caixa personalizada para presentear no Natal.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png",
              colecao: "Natal",
              composicao: "Caixa natalina personalizada para doces, mimos e mensagem especial."
            }
          ]
        }
      ]
    },

 

    {
      titulo: "Papelaria Artesanal",
      descricao: " 📝✨ Descubra nossa seleção de produtos de papelaria artesanal, perfeitos para inspirar sua criatividade e personalizar seus projetos! 🎨",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Cate_Papelaria.png",
      subcategorias: [
        {
          titulo: "Encadernação",
          descricao: "📒✨ Agendas, planners, cadernos e blocos encadernados artesanalmente — peças únicas feitas com carinho para organizar seu dia a dia.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Cadernos.png",
          produtos: [
            {
              nome: "Agenda Personalizada Datada A5 ",
              tipo: "Agendas",
              mostrarTemas: true,
              preco: "Agenda R$ 70,00 || Kit Agenda R$ 80,00",
              descricao: "Agendas personalizadas com datas, para organização diária, com capa e miolo customizáveis.",
              informacoesImportantes: "Na compra do Kit Agenda por R$ 80,00 acompanha uma caneta, abas do mês e clipes magnéticos combinando com a agenda e muitas fofurices.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Agenda_1.jpg",
              temasBibliotecas: bibliotecasModelosAgendas,
              Promocao: true
            },
            {
              nome: "Agenda Personalizada Permanente A5",
              tipo: "Agendas",
              mostrarTemas: true,
              preco: "Agenda R$ 70,00 || Kit Agenda R$ 80,00",
              descricao: "Agendas personalizadas, para organização diária, com capa e miolo customizáveis.",
              informacoesImportantes: "Agendas permanente. Não tem Calendários, e a gente seleciona qual dia da semana.\nNa compra do Kit Agenda por R$ 80,00 acompanha uma caneta, abas do mês e clipes magnéticos combinando com a agenda e muitas fofurices.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Agenda_2.jpg",
              temasBibliotecas: bibliotecasModelosAgendas,
              Promocao: true
            },
                        {
              nome: "Agenda Personalizada Datada A6",
              tipo: "Agendas",
              mostrarTemas: true,
              preco: "A partir de R$ 50,00",
              descricao: "Agendas personalizadas, para organização diária, com capa e miolo Clean.",
              informacoesImportantes: "Na compra do Kit Agenda por R$ 60,00 acompanha uma caneta, abas do mês e clipes magnéticos combinando com a agenda e muitas fofurices.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Agendas/Agenda_1.jpg",
              temasBibliotecas: bibliotecasModelosAgendas
            },
            {
              nome: "Agenda Personalizada Permanente A6",
              tipo: "Agendas",
              mostrarTemas: true,
              preco: "A partir de R$ 50,00",
              descricao: "Agendas personalizadas, para organização diária, com capa e miolo customizáveis.",
              informacoesImportantes: "Agendas permanente. Não tem Calendários, e a gente seleciona qual dia da semana.\nNa compra do Kit Agenda por R$ 80,00 acompanha uma caneta, abas do mês e clipes magnéticos combinando com a agenda e muitas fofurices.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Agendas/Agenda_2.jpg",
              temasBibliotecas: bibliotecasModelosAgendas
            },
                        {
              nome: "Agenda Personalizada Datada 19x24)",
              tipo: "Agendas",
              mostrarTemas: true,
               preco: "A partir de R$ 100,00",
              descricao: "Agendas personalizadas, para organização diária, com capa e miolo Clean.",
              informacoesImportantes: "Agendas permanente. Não tem Calendários, e a gente seleciona qual dia da semana.\nNa compra do Kit Agenda por R$ 80,00 acompanha uma caneta, abas do mês e clipes magnéticos combinando com a agenda e muitas fofurices.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Agendas/Agenda_1.jpg",
              temasBibliotecas: bibliotecasModelosAgendas
            },
            {
              nome: "Agenda Personalizada Permanente (19x24)",
              tipo: "Agendas",
              mostrarTemas: true,
               preco: "A partir de R$ 100,00",
              descricao: "Agendas personalizadas, para organização diária, com capa e miolo customizáveis.",
              informacoesImportantes: "Agendas permanente. Não tem Calendários, e a gente seleciona qual dia da semana.\nNa compra do Kit Agenda por R$ 80,00 acompanha uma caneta, abas do mês e clipes magnéticos combinando com a agenda e muitas fofurices.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Agendas/Agenda_2.jpg",
              temasBibliotecas: bibliotecasModelosAgendas
            },
            {
              nome: "Abas de Agendas",
              tipo: "Acessórios",
              mostrarTemas: true,
              descricao: "Abas como nome dos meses para organizar e personalizar suas agendas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Abas/Aba_01.png",
              temasBibliotecas: [
                bibliotecasModelosAcessoriosAgendas.Abas
              ]
            },
             {
              nome: "Clips Fofinhos",
              tipo: "Acessórios",
              mostrarTemas: true,
              descricao: "Clips adesivos, apliques, marcadores magnéticos e marca-páginas para personalizar suas agendas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Clips_magnetico/Clips_001.png",
              temasBibliotecas: [
                bibliotecasModelosAcessoriosAgendas.ClipsAdesivos,
              ]
            },
            {
              nome: "Apliques",
              tipo: "Acessórios",
              mostrarTemas: true,
              descricao: "Clips adesivos, apliques, marcadores magnéticos e marca-páginas para personalizar suas agendas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Clips_magnetico/Clips_001.png",
              temasBibliotecas: [
              
                bibliotecasModelosAcessoriosAgendas.Apliques,
              
              ]
            },
            {
              nome: "Marcadores Magneticos",
              tipo: "Acessórios",
              mostrarTemas: true,
              descricao: "Marcadores magnéticos  para personalizar suas agendas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Clips_magnetico/Clips_001.png",
              temasBibliotecas: [
                bibliotecasModelosAcessoriosAgendas.MarcadoresMagneticos,

              ]
            },
            {
              nome: "Marca Páginas",
              tipo: "Acessórios",
              mostrarTemas: true,
              descricao: "Marca-páginas para personalizar suas agendas.",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Encadernacao/Clips_magnetico/Clips_001.png",
              temasBibliotecas: [
                              bibliotecasModelosAcessoriosAgendas.MarcaPaginas
              ]
            },
            {
              nome: "Planner Diário",
              tipo: "Planners",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Planner Semanal",
              tipo: "Planners",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
             {
              nome: "Planner Financeiro ",
              tipo: "Planners",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Plannejador A4",
              tipo: "Planners",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Plannejador A5",
              tipo: "Planners",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Caderno Personalizado",
              tipo: "Cadernos",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Caderno Escolar",
              tipo: "Cadernos",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
             {
              nome: "Caderno Quadriculado",
              tipo: "Cadernos",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Const-01.png"
            },
            {
              nome: "Caderneta A6 - Tucano",
              tipo: "Blocos A6",
              descricao: "Monte seu kit Caderneta +Lapis com ponteira ou Borrachas Fofas ou apontador fofo ",
              preco: "A partir de R$ 14,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Blocos_A6/Bloco_01.png",
              materiais: "Miolo: Papel 90g ou 75g branco/colorido, capa em papel 180g, encadernação artesanal(Costura ou Grampeada)",
              tempo_entrega: "5-7 dias úteis",
              colecao: "Doce Jardim de Inverno",
              composicao: "Caderneta personalizada + lápis com ponteira ou borrachas fofas ou apontador fofo.",
              tamanhos: ["A6 (10.5 x 14.8cm)", "A5 (14.8 x 21cm)"],
              cores: ["#FF6B9D", "#FFD700", "#87CEEB", "#90EE90"]
            },
            {
              nome: "Caderneta A6 - Capivara",
              tipo: "Blocos A6",
              descricao: "Coleção 🌸 Doce Jardim de Inverno,Monte seu kit Caderneta +Lapis com ponteira ou Borrachas Fofas ou Papontador fofo",
              preco: "A partir de R$ 14,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Blocos_A6/Bloco_02.png",
              materiais: "Miolo: Papel 90g ou 75g branco/colorido, capa em papel 180g, encadernação artesanal(Costura ou Grampeada)",
              tempo_entrega: "5-7 dias úteis",
              colecao: "Doce Jardim de Inverno",
              composicao: "Caderneta personalizada + lápis com ponteira ou borrachas fofas ou apontador fofo.",
              tamanhos: ["A6 (10.5 x 14.8cm)", "A5 (14.8 x 21cm)"],
              cores: ["#FF6B9D", "#FFD700", "#87CEEB", "#90EE90"]
            },
            {
              nome: "Caderneta A6 - Menina Gato",
              tipo: "Blocos A6",
              descricao: "Coleção 🌸 Doce Jardim de Inverno,Monte seu kit Caderneta +Lapis com ponteira ou Borrachas Fofas ou Papontador fofo ",
              preco: "A partir de R$ 14,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Blocos_A6/Bloco_03.png",
              materiais: "Miolo: Papel 90g ou 75g branco/colorido, capa em papel 180g, encadernação artesanal(Costura ou Grampeada)",
              tempo_entrega: "5-7 dias úteis",
              colecao: "Doce Jardim de Inverno",
              composicao: "Caderneta personalizada + lápis com ponteira ou borrachas fofas ou apontador fofo.",
              tamanhos: ["A6 (10.5 x 14.8cm)", "A5 (14.8 x 21cm)"],
              cores: ["#FF6B9D", "#FFD700", "#87CEEB", "#90EE90"]
            },
            {
              nome: "Caderneta A6 - Floral Verde",
              tipo: "Blocos A6",
              descricao: "Coleção 🌸 Doce Jardim de Inverno,Monte seu kit Caderneta +Lapis com ponteira ou Borrachas Fofas ou Papontador fofo  ",
              preco: "A partir de R$ 14,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Blocos_A6/Bloco_04.png",
              materiais: "Miolo: Papel 90g ou 75g branco/colorido, capa em papel 180g, encadernação artesanal(Costura ou Grampeada)",
              tempo_entrega: "5-7 dias úteis",
              colecao: "Doce Jardim de Inverno",
              composicao: "Caderneta personalizada + lápis com ponteira ou borrachas fofas ou apontador fofo.",
              tamanhos: ["A6 (10.5 x 14.8cm)", "A5 (14.8 x 21cm)"],
              cores: ["#FF6B9D", "#FFD700", "#87CEEB", "#90EE90"]
            }
          ]
        },
        {
          titulo: "Canetas Personalizadas",
          descricao: "🖊️✨ Canetas exclusivas para presentear com personalidade e charme.",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas.png",
          produtos: [
            {
              nome: "Canetas Capivaras",
              tipo: "Canetas",
              mostrarTemas: true,
              descricao: "Canetas personalizadas com o tema capivara, perfeitas para presentear e decorar.",
              preco: " R$ 13,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Capivaras/Caneta_010.png",
              materiais: "Caneta com acabamento personalizado e design exclusivo.",
              tempo_entrega: "à combinar",
              colecao: "Canetas Personalizadas",
              composicao: "Caneta personalizada com tema capivara.",
              temasBibliotecas: [bibliotecasModelosCanetas.Capivaras]
            },
            {
              nome: "Canetas HelloKitty",
              tipo: "Canetas",
              mostrarTemas: true,
              descricao: "Coleção charmosa com personagens Hello Kitty em versões exclusivas.",
              preco: " R$ 13,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Hello_kitty/Caneta_003.png",
              materiais: "Caneta com acabamento personalizado e design delicado.",
              tempo_entrega: "à combinar",
              colecao: "Canetas Personalizadas",
              composicao: "Caneta personalizada com personagens Hello Kitty.",
              temasBibliotecas: [bibliotecasModelosCanetas.HelloKitty]
            },
            {
              nome: "Canetas Joias",
              tipo: "Canetas",
              mostrarTemas: true,
              descricao: "Canetas elegantes com acabamento refinado para presentes especiais.",
              preco: " R$ 13,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Joias/Caneta_011.png",
              materiais: "Caneta com visual sofisticado e acabamento premium.",
              tempo_entrega: "à combinar",
              colecao: "Canetas Personalizadas",
              composicao: "Caneta personalizada com estilo joias.",
              temasBibliotecas: [bibliotecasModelosCanetas.Joias]
            },
                        {
              nome: "Canetas Mickey",
              tipo: "Canetas",
              mostrarTemas: true,
              descricao: "Canetas elegantes com acabamento refinado para presentes especiais.",
              preco: "R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Mickey/Caneta_009.png",
              materiais: "Caneta com visual sofisticado e acabamento premium.",
              tempo_entrega: "à combinar",
              colecao: "Canetas Personalizadas",
              composicao: "Caneta personalizada com personagens Mickey.",
              temasBibliotecas: [bibliotecasModelosCanetas.Mickey]
            },
            {
              nome: "Canetas Apagáveis",
              tipo: "Canetas",
              mostrarTemas: true,
              descricao: "Modelo funcional com acabamento delicado e praticidade no dia a dia.",
              preco: "R$ 8,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Apagaveis/Caneta_001.png",
              materiais: "Caneta apagável com design personalizado e visual diferenciado.",
              tempo_entrega: "à combinar",
              colecao: "Canetas Personalizadas",
              composicao: "Caneta personalizada apagável.",
              temasBibliotecas: [bibliotecasModelosCanetas.Apagaveis]
            },
            {
              nome: "Lápis Temáticos",
              tipo: "Lápis",
              mostrarTemas: true,
              descricao: "Lápis com temas variados para diferentes ocasiões.",
              preco: "R$ 7,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Canetas/Lapis_ponteira/Canetas_01.png",
              materiais: "Caneta com design temático e acabamento de qualidade.",
              tempo_entrega: "à combinar",
              colecao: "Lápis Personalizadas",
              composicao: "Lápis personalizado com temas variados.",
              temasBibliotecas: [bibliotecasModelosCanetas.Lápis]
            }
          ]
        },
        {
          titulo: "Maternidade",
          descricao: "🚧👶✨ Em breve novidade!🚧🚧",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Kit_bebe.png",
          produtos: [
            {
              nome: "Caderneta de Vacinação",
              descricao: "Caderneta de vacinação para bebês",
              tipo: "Maternidade",
              preco: "A partir de R$ 80,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png",
              colecao: "Maternidade",
              composicao: "Caderneta personalizada para vacinas + capa protetora.",
              materiais: "Capa dura com acabamento laminado e miolo em papel offset.",
              tempo_entrega: "7-10 dias úteis",
              tamanhos: ["A6"],
              cores: ["#87CEEB", "#FFB6D9", "#90EE90", "#FFD700"]
            },
            {
              nome: "Capa para Caderneta de Vacinação",
              descricao: "Capa para caderneta de vacinação para bebês",
              tipo: "Maternidade",
              preco: "A partir de R$35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
            },
            {
              nome: "Capa para Caderneta de Gestante",
              descricao: "Capa para caderneta de vacinação para bebês",
              tipo: "Maternidade",
              preco: "A partir de R$35,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
            },
            {
              nome: "Reforma de Caderneta de Vacinação",
              descricao: "Capa para caderneta de vacinação para bebês",
              tipo: "Maternidade",
              preco: "A partir de R$55,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
            },
            {
              nome: "Kit Caderneta de Vacinação",
              descricao: "Kit com caderneta de vacinação para bebês, Caderneta de vacinação personalizada e porta documentos Tamanho A6",
              tipo: "Maternidade",
              preco: "A partir de R$100,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
            }
          ]
        },
        {
          titulo: "Kits Presentes",
          descricao: "🚧🎁✨ Em breve novidade!",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Kit_presente.png",
          produtos: [
            { nome: "Kit Lembrancinha Festa", imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Kit_presente.png" }
          ]
        },
        {
          titulo: "Personalizados",
          descricao: "🎨✨ Novidades!",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Personalizados.png",
          produtos: [
            {
              nome: "Tag Personalizada",
              descricao: "Tag personalizada para lembrancinhas e embalagens. São criadas a partir de uma breve conversa para entender o que deseja, e a partir disso criar uma arte personalizada para você. Permitimos até 4 alterações apartir do envio da 1ª arte. Solicite um orçamento personalizado.",
              preco: "A partir de R$ 1,50. Cada tag personalizada",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Personalizacao/Personalizacao_01.png"
            },
            {
              nome: "Etiquetas Personalizadas",
              descricao: "Etiquetas personalizadas para produtos e embalagens. São criadas a partir de uma breve conversa para entender o que deseja, e a partir disso criar uma arte personalizada para você. Permitimos até 4 alterações apartir do envio da 1ª arte. Solicite um orçamento personalizado.",
              preco: "A partir de R$ 7,00. A folha A4 com 30 etiquetas 3x3cm",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Const.png"
            },
            {
              nome: "Criação de Logos Personalizados",
              descricao: "Criação de Logos personalizados para sua marca. A criação será apartir de uma breve conversa para entender o que deseja, e a partir disso criar uma arte personalizada para você. Permitimos até 4 alterações apartir do envio da 1ª arte. Solicite um orçamento personalizado.",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Const.png"
            },
           {
              nome: "Criação de Bloquinhos personalizados",
              descricao: "Criação de blocos nas medidas e temas personalizados para sua marca ou evento, A criação será apartir de uma breve conversa para entender o que deseja, e a partir disso criar uma arte personalizada para você. Permitimos até 4 alterações apartir do envio da 1ª arte. Solicite um orçamento personalizado.",
              preco: "A partir de R$ 9,00. Cada bloco personalizado com 50 folhas, 8x12cm, blocado",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Const.png"
            }
          ]
        },
        {
          titulo: "Pequenos Mimos",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Pequenos_Mimo.png",
          produtos: [
            {
              nome: "Bolsa Batão",
              descricao: "Cartão em formato de bolsa, com 1 Baton de chocolate ou um batão labial, ideal para lembrancinhas de dia das mães ou dia dos namorados.",
              preco: "A partir de R$ 6,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/BolsaBatão.png"
            },
                        {
              nome: "Cartão Luz",
              descricao: "Cartão com uma vela aromatica",
              preco: "A partir de R$ 6,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Cartão_Vela.png"
            },
                        {
              nome: "Chaveiro coração",
              descricao: "Chaveiro de acrilico em formato de coração personalizavel com foto ou mensagem",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Chaveiro_coração.png"
            },
                        {
              nome: "Cartão descando",
              descricao: "Cartão em formato Chinelo, com 2 amaradores.",
              preco: "A partir de R$ 2,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Chinelo.png"
            },
                        {
              nome: "Pirulito de coração",
              descricao: "Pirulito para Mimos, personalizaveis em diversos Temas",
              preco: "A partir de R$ 1,50",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Pirulito_coração.png"
            },
            {
              nome: "Card Retrovisor",
              descricao: "Card para colocar no retrovisor, personalizado, Solicite outros modelos",
              preco: "A partir de R$ 0,80",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Cartão_retrovisor.png"
            },
            {
              nome: "Mini Kit Fofo",
              descricao: "Kit de pequenos mimos artesanais com 3 itens diferentes para lembrancinha ou presente, Podem ser compostos com Marcadores magneticos, clips decorados, Borrachas fofas.",
              tipo: "Pequenos Mimos",
              preco: "A partir de R$ 5,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Clips_01.png",
              imagens: [
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Clips_01.png",
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Clips_02.png",
                "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/PequenosMimos/Clips_03.png"
              ]
            }
          ]
        },
        {
          titulo: "Jardim de Papel",
          descricao: "🌸✨ Flores e Borboletas artesanais! 🌸✨",
          imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques.png",
          produtos: [
          
            {
              nome: "Buquê de Flores 01",
              descricao: "Buquê de flores de papel tamanho 15 x 20",
              tipo: "Flores",
              preco: "A partir de R$ 25,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_01.png"
            },
              {
              nome: "Buquê de Flores 02",
              descricao: "Buquê de flores de papel tamanho 15 x 15",
              tipo: "Flores",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_03.png"
            },
              {
              nome: "Flores Pintadas 01",
              descricao: "Flores de papel com a borda pintada 10 x 10, acompanha folhas douradas, Kit com 2 flores",
              tipo: "Flores",
              preco: "A partir de R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Buque_flor_02.png"
            },
              {
              nome: "Cartelas de flores 01",
              descricao: "Flores de papel aquareladas, Kit com 6 flores",
              tipo: "Flores",
              preco: "R$ 18,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Cart_Flor-01.png"
            },
              {
              nome: "Cartelas de flores 02",
              descricao: "Flores de papel aquareladas, Kit com 5 flores",
              tipo: "Flores",
              preco: "R$ 18,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Cart_Flor-02.png"
            },
              {
              nome: "Cartelas de flores 03",
              descricao: "Flores de papel aquareladas, Kit com 8 flores",
              tipo: "Flores",
              preco: "R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Cart_Flor-03.png"
            },
             {
              nome: "Cartelas de flores 04",
              descricao: "Flores de papel aquareladas, Kit com 8 flores",
              tipo: "Flores",
              preco: "R$ 15,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Cart_Flor-04.png"
            },
            {
              nome: "Borboletas douradas pequena",
              descricao: "Borboletas feitas de papel laminado, Kit com 10 unidades",
              tipo: "Borboletas",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Borboleta-02.png"
            },
            {
              nome: "Borboletas douradas Grandes",
              descricao: "Borboletas feitas de papel laminado, Kit com 5 unidades",
              tipo: "Borboletas",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Borboleta-01.png"

            },
            {
              nome: "Borboletas Impressas Simples",
              descricao: "Borboletas feitas de papel Fotografico, Kit com 10 unidades",
              tipo: "Borboletas",
              preco: "A partir de R$ 10,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Borboleta-03.png"
            },
            {
              nome: "Borboletas Impressas Duplas",
              descricao: "Borboletas feitas de papel laminado menores, Kit com 10 unidades",
              tipo: "Borboletas",
              preco: "A partir de R$ 20,00",
              imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Papelaria/Apliques/Borboleta-01.png"
            }
           
          ]
        }
      ]
    },
       {
      titulo: "Cartonagem",
      descricao: " 📦✨ Em breve novidades em cartonagem artesanal! Fique atento para descobrir nossas criações exclusivas e personalizadas! 🎨",
      observacao: "Em Construção",
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
      titulo: "Kit Digital",
      descricao: " 💻✨ Em breve novidades em kits digitais para scrapbooking e papelaria! Fique atento para descobrir nossos designs exclusivos e personalizáveis! 🎨",
      observacao: "Em Construção",
      imagem: "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/Digital.png",
      produtos: [
        { nome: "Kit Scrapbook" },
        { nome: "Papéis Digitais" }
      ]
    }
  ];
