import { useEffect, useState } from "react";

const MainLogo = () => {
  const [email] = useState("");
  useEffect(() => {
    getEmail();
  }, []);

  async function getEmail() {
    try {
    } catch (error) {}
  }

  return (
    <div style={styles.logoText}>
      <h1 style={styles.h1}>PROVIDER PORTAL</h1>
      <p style={styles.p}>{email}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  logoText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  h1: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "28.8px",
    letterSpacing: "0.05em",
    textAlign: "left",
  },
  p: {
    fontSize: "13px",
    lineHeight: "15.6px",
    letterSpacing: "0.08em",
    textAlign: "left",
    color: "rgba(255, 255, 255, 0.6)",
  },
};

export default MainLogo;
