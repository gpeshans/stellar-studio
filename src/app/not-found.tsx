export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "64px 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>
            404
          </p>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Page not found
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: "#666", marginBottom: 40, maxWidth: 400 }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <a
            href="/"
            style={{ background: "#000", color: "#fff", padding: "15px 48px", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
