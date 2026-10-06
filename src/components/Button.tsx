import Link from "next/link";

export default function Button({ href, children, secondary }: any) {
  return (
    <Link
      href={href}
      style={{
        background: secondary ? "#1d1a2e" : "#8b6cf6",
        border: secondary ? "1px solid #3a3560" : "none",
        color: "white",
        padding: "12px 24px",
        borderRadius: 999,
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {children}
    </Link>
  );
}
