import { useState } from "react";

export default function AdminContacts() {
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/contacts", {
        headers: { "X-API-TOKEN": password },
      });

      if (!res.ok) {
        setError("❌ Mot de passe incorrect !");
        return;
      }

      const data = await res.json();
      console.log("✅ Contacts reçus:", data, Array.isArray(data));
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setError("❌ Erreur réseau");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", color: "#fff" }}>
      {contacts === null ? (
        <form onSubmit={handleLogin}>
          <h2>🔐 Connexion Admin</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#E63946",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>📋 Contacts reçus</h2>
          {contacts.length === 0 ? (
            <p>Aucun contact enregistré.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
              }}
            >
              <thead>
                <tr style={{ background: "#444" }}>
                  <th
                    style={{
                      border: "1px solid #666",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Nom
                  </th>
                  <th
                    style={{
                      border: "1px solid #666",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      border: "1px solid #666",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td style={{ border: "1px solid #666", padding: "8px" }}>
                      {c.firstname} {c.lastname}
                    </td>
                    <td style={{ border: "1px solid #666", padding: "8px" }}>
                      {c.email}
                    </td>
                    <td style={{ border: "1px solid #666", padding: "8px" }}>
                      {c.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
