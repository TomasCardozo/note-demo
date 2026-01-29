import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/", { replace: true });
    } catch {
      setError("Login inválido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ maxWidth: 360, margin: "80px auto", fontFamily: "system-ui" }}
    >
      <h2>Login</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "Login"}
        </button>
        {error && <div style={{ color: "crimson" }}>{error}</div>}
      </form>
    </div>
  );
}
