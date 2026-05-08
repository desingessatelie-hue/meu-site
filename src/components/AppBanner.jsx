import React from "react";

const BANNER_SRC =
  "https://raw.githubusercontent.com/desingessatelie-hue/meu-site/main/imagens/banner.png";

export function AppBanner({ isMobile }) {
  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "40px" }}>
      <img
        src={BANNER_SRC}
        alt=""
        style={{
          width: "100%",
          height: isMobile ? "220px" : "500px",
          objectFit: "cover",
          borderRadius: "20px"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          padding: isMobile ? "20px" : "40px",
          borderRadius: "20px",
          textAlign: "center",
          width: isMobile ? "90%" : "80%",
          maxWidth: "600px",
          marginBottom: "50px"
        }}
      >
        <h1>Ateliê Pequenos Encantos by Eli</h1>
        <p>Papelaria artesanal e personalizados feitos com carinho</p>
      </div>
    </div>
  );
}
