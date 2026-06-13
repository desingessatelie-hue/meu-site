export const WHATSAPP_NUMBER = "5547996588988";

export function gerarLinkWhatsApp(produto) {
  let mensagem;

  if (typeof produto === "string") {
    mensagem = `Olá! Tenho interesse no produto: ${produto} do Ateliê Pequenos Encantos by Eli.`;
  } else {
    const linhas = [
      "Olá! Tenho interesse em um produto do Ateliê Pequenos Encantos by Eli.",
      "",
      `*${produto.nome}*`
    ];

    if (produto.preco) linhas.push(`Preço: ${produto.preco}`);
    if (produto.tipo) linhas.push(`Tipo: ${produto.tipo}`);
    if (produto.categoria) {
      const colecao = produto.subcategoria
        ? `${produto.categoria} > ${produto.subcategoria}`
        : produto.categoria;
      linhas.push(`Coleção: ${colecao}`);
    }
    if (produto.descricao) {
      linhas.push("", produto.descricao);
    }
    if (produto.tamanhos?.length) {
      linhas.push("", `Tamanhos disponíveis: ${produto.tamanhos.join(", ")}`);
    }
    if (produto.tempo_entrega) {
      linhas.push(`Prazo: ${produto.tempo_entrega}`);
    }

    linhas.push("", "Gostaria de solicitar um orçamento personalizado.");

    mensagem = linhas.join("\n");
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}
