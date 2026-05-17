import { ImageResponse } from "next/og"

export const socialImageAlt =
  "Oleo Kit Research deck preview showing an oil-slick collector sponge concept."

export const socialImageSize = {
  width: 1200,
  height: 630,
}

export const socialImageContentType = "image/png"

export function createSocialImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#f0f3d7",
        color: "#18342b",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage: "linear-gradient(130deg, #fbfaee, #c2e2e4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(rgba(80, 105, 88, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 105, 88, 0.18) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 92,
          top: 86,
          display: "flex",
          width: 362,
          height: 362,
          border: "2px solid #9e8540",
          borderRadius: 181,
          backgroundColor: "#d6bf4c",
          backgroundImage:
            "radial-gradient(circle at 32% 30%, #f5e88f 0 12%, transparent 13%), radial-gradient(circle at 65% 62%, rgba(83, 68, 40, 0.38) 0 16%, transparent 17%)",
          boxShadow: "0 34px 90px rgba(29, 54, 45, 0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 96,
          display: "flex",
          width: 470,
          height: 82,
          backgroundColor: "rgba(64, 48, 28, 0.82)",
          transform: "rotate(-7deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 154,
          bottom: 121,
          display: "flex",
          width: 230,
          height: 40,
          border: "2px solid #b69a35",
          backgroundColor: "#e2cd53",
          transform: "rotate(-7deg)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "72px 84px 70px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 402,
            border: "2px solid #c4c6a8",
            backgroundColor: "rgba(251, 250, 238, 0.72)",
            padding: "12px 18px",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          RC boat oil-slick collector
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 690,
              fontSize: 92,
              lineHeight: 0.88,
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            Oleo Kit research deck
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 660,
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.28,
              color: "#416558",
            }}
          >
            Shape selection, traversal strategy, and fabrication routes for a
            reusable oleophilic sponge array.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 20,
            fontWeight: 700,
            color: "#38594e",
          }}
        >
          <span>Porous puck</span>
          <span>/</span>
          <span>drift-aware sweep</span>
          <span>/</span>
          <span>reusable module</span>
        </div>
      </div>
    </div>,
    socialImageSize
  )
}
