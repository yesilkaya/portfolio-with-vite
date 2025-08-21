
export function NotFoundScreen() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "50px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "white" }}>404</h1>
      <p style={{ fontSize: "18px", color: "white" }}>
        Aradığınız sayfa bulunamadı.
      </p>
    </div>
  );
}
