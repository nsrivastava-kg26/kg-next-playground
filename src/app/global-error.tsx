"use client";

/**
 * Last-resort boundary for errors in the root layout itself. It replaces the root
 * layout, so it must render its own <html> and <body> and cannot rely on globals.css.
 */
export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui",
          background: "#14121f",
          color: "#f5f4ff",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <button
            type="button"
            onClick={() => retry()}
            style={{ marginTop: 16, padding: "10px 20px", borderRadius: 999 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
