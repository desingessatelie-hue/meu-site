export const WHATSAPP_NUMBER = "5547996588988";

export function gerarLinkWhatsApp(produto) {
  const mensagem = `Olá! Tenho interesse no produto: ${produto} do Ateliê Pequenos Encantos by Eli.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}
