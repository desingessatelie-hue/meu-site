import React, { useState } from "react";
import { categorias } from "./data/categorias.js";
import { estilos } from "./styles/appStyles.js";
import { gerarLinkWhatsApp, WHATSAPP_NUMBER } from "./utils/whatsapp.js";
import { voltarAoTopo } from "./utils/scroll.js";
import { isMobileViewport } from "./utils/viewport.js";
import { AppBanner } from "./components/AppBanner.jsx";
import { CategoryHomeGrid } from "./components/CategoryHomeGrid.jsx";
import { SubcategoriasPanel } from "./components/SubcategoriasPanel.jsx";
import { SubcategoriaProductsPanel } from "./components/SubcategoriaProductsPanel.jsx";
import { DirectCategoryProductsPanel } from "./components/DirectCategoryProductsPanel.jsx";
import { GlobalFooterActions } from "./components/GlobalFooterActions.jsx";

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [subcategoriaAtiva, setSubcategoriaAtiva] = useState(null);
  const isMobile = isMobileViewport();

  const categoriaSelecionada = categorias.find((c) => c.titulo === categoriaAtiva);
  const subcategoriaSelecionada = categoriaSelecionada?.subcategorias?.find(
    (sub) => sub.titulo === subcategoriaAtiva
  );

  const resetNavigation = () => {
    setCategoriaAtiva(null);
    setSubcategoriaAtiva(null);
  };

  const voltarParaSubcategoria = () => {
    setSubcategoriaAtiva(null);
    voltarAoTopo();
  };

  const handleFooterBack = () => {
    if (subcategoriaAtiva) {
      voltarParaSubcategoria();
    } else {
      resetNavigation();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={estilos.container}>
      {!categoriaAtiva && <AppBanner isMobile={isMobile} />}

      {!categoriaAtiva && (
        <CategoryHomeGrid
          categorias={categorias}
          estilos={estilos}
          onSelectCategory={(titulo) => {
            setCategoriaAtiva(titulo);
            voltarAoTopo();
          }}
        />
      )}

      {categoriaSelecionada &&
        !subcategoriaAtiva &&
        categoriaSelecionada.subcategorias && (
          <SubcategoriasPanel
            categoriaSelecionada={categoriaSelecionada}
            subcategoriaSelecionada={subcategoriaSelecionada}
            estilos={estilos}
            onBack={resetNavigation}
            onSelectSubcategoria={(titulo) => {
              setSubcategoriaAtiva(titulo);
              voltarAoTopo();
            }}
          />
        )}

      {subcategoriaSelecionada && (
        <SubcategoriaProductsPanel
          categoriaSelecionada={categoriaSelecionada}
          subcategoriaSelecionada={subcategoriaSelecionada}
          estilos={estilos}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
          onResetNavigation={resetNavigation}
          onBack={voltarParaSubcategoria}
        />
      )}

      {categoriaSelecionada && !categoriaSelecionada.subcategorias && (
        <DirectCategoryProductsPanel
          categoriaSelecionada={categoriaSelecionada}
          subcategoriaSelecionada={subcategoriaSelecionada}
          estilos={estilos}
          gerarLinkWhatsApp={gerarLinkWhatsApp}
          onBack={resetNavigation}
        />
      )}

      <GlobalFooterActions
        estilos={estilos}
        whatsappNumber={WHATSAPP_NUMBER}
        showBackButton={Boolean(categoriaSelecionada)}
        onBackToCollection={handleFooterBack}
        onScrollTop={voltarAoTopo}
      />
    </div>
  );
}
