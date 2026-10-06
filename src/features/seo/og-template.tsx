/**
 * Shared Open Graph layout rendered by next/og (Satori). Satori supports a subset
 * of CSS (flexbox, no grid) and needs inline styles, so no Tailwind classes here.
 */
export const ogSize = { width: 1200, height: 630 };

export function OgTemplate({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #14121f 0%, #221c45 60%, #3b2a8a 100%)",
        color: "#f5f4ff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "linear-gradient(135deg, #5fd4e6, #8b6cf6)",
          }}
        />
        <span style={{ fontSize: 34, fontWeight: 700 }}>Lumen</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span
          style={{ fontSize: 26, color: "#5fd4e6", letterSpacing: 4, textTransform: "uppercase" }}
        >
          {eyebrow}
        </span>
        <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </span>
      </div>
    </div>
  );
}
