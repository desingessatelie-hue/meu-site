import React, { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

function ThemeImageLibrary({ imagens, tema }) {
  const [imagemAtual, setImagemAtual] = useState(0);
  const totalImagens = Array.isArray(imagens) ? imagens.length : 0;

  useEffect(() => {
    setImagemAtual(0);
  }, [tema]);

  if (!totalImagens) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "260px",
          borderRadius: "12px",
          border: "1px dashed #e7d5b5",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9a8378",
          fontSize: "13px",
          marginBottom: "12px"
        }}
      >
        Sem imagens para este tema
      </div>
    );
  }

  const imagem = imagens[imagemAtual];

  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ position: "relative" }}>
        <img
          src={imagem}
          alt={`Tema ${tema} - imagem ${imagemAtual + 1}`}
          style={{
            width: "100%",
            height: "clamp(240px, 34vw, 360px)",
            objectFit: "contain",
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid #efe2cd",
            display: "block"
          }}
        />

        {totalImagens > 1 && (
          <>
            <button
              type="button"
              onClick={() => setImagemAtual((prev) => (prev - 1 + totalImagens) % totalImagens)}
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "#5a3e36",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setImagemAtual((prev) => (prev + 1) % totalImagens)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "#5a3e36",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {totalImagens > 1 && (
        <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#8b6b61", textAlign: "right" }}>
          Imagem {imagemAtual + 1} de {totalImagens}
        </p>
      )}
    </div>
  );
}

export function BookThemesPage({ temas, produtoNome, bibliotecaNome, bibliotecas = [], onBack }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [bibliotecaAtiva, setBibliotecaAtiva] = useState(bibliotecaNome || "");

  const normalizarBibliotecaNome = (valor) =>
    String(valor || "")
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

  const produtoExibicao = "Agendas e Planner";

  const bibliotecasDisponiveis =
    Array.isArray(bibliotecas) && bibliotecas.length > 0
      ? bibliotecas
      : [{ nome: bibliotecaNome || "Temas", temasBiblioteca: Array.isArray(temas) ? temas : [] }];

  const bibliotecaSelecionada =
    bibliotecasDisponiveis.find(
      (biblioteca) =>
        normalizarBibliotecaNome(biblioteca?.nome) === normalizarBibliotecaNome(bibliotecaAtiva)
    ) ||
    bibliotecasDisponiveis.find(
      (biblioteca) => normalizarBibliotecaNome(biblioteca?.nome) === normalizarBibliotecaNome(bibliotecaNome)
    ) ||
    bibliotecasDisponiveis[0];

  const bibliotecaExibicao = String(bibliotecaSelecionada?.nome || bibliotecaAtiva || bibliotecaNome || "Temas").trim();

  const temasAtivos = Array.isArray(bibliotecaSelecionada?.temasBiblioteca)
    ? bibliotecaSelecionada.temasBiblioteca
    : Array.isArray(temas)
      ? temas
      : [];

  const totalPaginas = Math.max(1, Math.ceil((temasAtivos?.length || 0) / ITEMS_PER_PAGE));
  const inicio = (paginaAtual - 1) * ITEMS_PER_PAGE;
  const temasPagina = (temasAtivos || []).slice(inicio, inicio + ITEMS_PER_PAGE);

  useEffect(() => {
    setBibliotecaAtiva(bibliotecaNome || bibliotecasDisponiveis[0]?.nome || "");
    setPaginaAtual(1);
  }, [bibliotecaNome, bibliotecasDisponiveis]);

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [paginaAtual, totalPaginas]);

  return (
    <section
      style={{
        minHeight: "100dvh",
        padding: "32px 20px 54px",
        background:
          "radial-gradient(circle at top right, rgba(247, 184, 216, 0.24), transparent 35%), linear-gradient(180deg, #fff9f0 0%, #fff3e0 100%)"
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#8b6b61",
            background: "transparent",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "18px"
          }}
        >
          ← Voltar para a loja
        </button>

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            border: "1px solid rgba(200,169,106,0.25)",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: "24px 24px 18px",
              background:
                "linear-gradient(120deg, rgba(200,169,106,0.25) 0%, rgba(247,184,216,0.25) 100%)"
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#8b6b61",
                fontWeight: 700
              }}
            >
              Catálogo de Agendas
            </p>
            <h1 style={{ margin: "10px 0 0", color: "#5a3e36", fontSize: "30px" }}>
              Coleção 2027
            </h1>
            <p style={{ margin: "8px 0 0", color: "#5a3e36", fontSize: "16px", fontWeight: 700 }}>
              Produto: {produtoExibicao}
            </p>
            <p style={{ margin: "6px 0 0", color: "#8b6b61", fontSize: "14px", fontWeight: 700 }}>
              Biblioteca: {bibliotecaExibicao || "Temas"}
            </p>
            <p style={{ margin: "10px 0 0", color: "#7a655a", fontSize: "14px" }}>
              Anote o código do seu modelo e entre em contato pelo WhatsApp
            </p>

            {bibliotecasDisponiveis.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "18px"
                }}
              >
                {bibliotecasDisponiveis.map((biblioteca) => {
                  const nomeBiblioteca = String(biblioteca?.nome || "").trim();
                  const ativa = String(bibliotecaSelecionada?.nome || "").trim() === nomeBiblioteca;

                  return (
                    <button
                      key={nomeBiblioteca}
                      type="button"
                      onClick={() => {
                        setBibliotecaAtiva(nomeBiblioteca);
                        setPaginaAtual(1);
                      }}
                      style={{
                        padding: "10px 16px",
                        borderRadius: "999px",
                        border: ativa ? "1px solid #c8a96a" : "1px solid #eadfc2",
                        backgroundColor: ativa ? "#fff7eb" : "#fff",
                        color: ativa ? "#5a3e36" : "#8b6b61",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: ativa ? "0 6px 18px rgba(200,169,106,0.22)" : "none"
                      }}
                    >
                      {nomeBiblioteca}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ padding: "22px 24px 30px" }}>
            {temasPagina.length > 0 ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "16px"
                  }}
                >
                  {temasPagina.map((item) => (
                    <article
                      key={item.codigo}
                      style={{
                        borderRadius: "14px",
                        border: "1px solid #efe2cd",
                        padding: "14px",
                        backgroundColor: "#fffaf3"
                      }}
                    >
                      <ThemeImageLibrary imagens={item.imagens} tema={item.tema} />

                      <p style={{ margin: "0 0 8px", color: "#5a3e36", fontSize: "16px", fontWeight: 700 }}>
                        Tema: {item.tema}
                      </p>
                      {item.informacoesImportantes && (
                        <p style={{ margin: 0, color: "#7a655a", fontSize: "13px", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                          <strong style={{ color: "#5a3e36" }}>Informações importantes:</strong> {item.informacoesImportantes}
                        </p>
                      )}
                    </article>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "18px",
                    flexWrap: "wrap"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setPaginaAtual((prev) => Math.max(1, prev - 1))}
                    disabled={paginaAtual === 1}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e7d5b5",
                      backgroundColor: paginaAtual === 1 ? "#f6efe2" : "#fff",
                      color: "#5a3e36",
                      cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
                      fontWeight: 600
                    }}
                  >
                    Pagina anterior
                  </button>

                  <p style={{ margin: 0, color: "#7a655a", fontSize: "13px", fontWeight: 600 }}>
                    Pagina {paginaAtual} de {totalPaginas}
                  </p>

                  <button
                    type="button"
                    onClick={() => setPaginaAtual((prev) => Math.min(totalPaginas, prev + 1))}
                    disabled={paginaAtual === totalPaginas}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e7d5b5",
                      backgroundColor: paginaAtual === totalPaginas ? "#f6efe2" : "#fff",
                      color: "#5a3e36",
                      cursor: paginaAtual === totalPaginas ? "not-allowed" : "pointer",
                      fontWeight: 600
                    }}
                  >
                    Proxima pagina
                  </button>
                </div>
              </>
            ) : (
              <p style={{ margin: 0, color: "#7a655a" }}>
                Ainda não há temas cadastrados para livros.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
