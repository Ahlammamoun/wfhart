import { useState } from "react";

export default function PolitiqueConfidentialite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenuOnNav = () => setMenuOpen(false);

  return (
    <div>
      <style>{`
        :root {
          --bg-dark: #1A1A1A;
          --bg-darker: #0f0f10; /* fond global */
          --text: #f2f2f2;
          --accent: #E63946;
          --accent-2: #C71C2B;
          --grad-darkred: linear-gradient(135deg, #0f0f10, #1A1A1A, #2a2a2a, #8B0000, #C71C2B);
        }

        body {
          background: var(--bg-darker);
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
          color: var(--text);
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 260px;
          background: var(--grad-darkred);
          background-size: 400% 400%;
          animation: gradientAnim 12s ease infinite;
          display: flex;
          flex-direction: column;
          padding: 40px 24px;
          box-shadow: -4px 0 20px rgba(0,0,0,0.6);
          z-index: 1000;
        }
        .brand {
          margin-bottom: 40px;
        }
        .brand a {
          text-decoration: none;
          color: var(--accent);
          font-weight: 800;
          font-size: 1.6rem;
          white-space: nowrap;
        }
        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .nav-menu a {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          padding: 10px 14px;
          border-radius: 8px;
          transition: all .25s ease;
        }
        .nav-menu a:hover {
          background: rgba(255,255,255,0.1);
          color: var(--accent);
          transform: translateX(-6px);
        }

        /* Contenu page */
        .legal-page {
          max-width: 900px;
          margin: 100px auto;
          padding: 40px 20px;
          background: var(--bg-dark);
          color: var(--text);
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          line-height: 1.7;
        }
        .legal-page h1 {
          color: var(--accent);
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .legal-page h2 {
          color: var(--accent-2);
          font-size: 1.4rem;
          margin-top: 30px;
        }
        .legal-page p {
          margin: 10px 0;
        }

        @keyframes gradientAnim {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <a href="/">Wolfram & Hart</a>
        </div>
        <nav className="nav-menu" onClick={closeMenuOnNav}>
          <a href="/#about">À propos</a>
          <a href="/#services">Services</a>
          <a href="/#portfolio">Réalisations</a>
          <a href="/#contact">Contact</a>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="legal-page">
        <h1>Politique de confidentialité</h1>

        <h2>Collecte des données</h2>
        <p>
          Les informations collectées via le formulaire de contact (nom, prénom, email, message)
          sont utilisées uniquement pour répondre à vos demandes.
        </p>

        <h2>Utilisation des données</h2>
        <p>
          Vos données ne sont jamais revendues ni utilisées à des fins commerciales.
          Elles sont conservées uniquement le temps nécessaire à nos échanges.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site peut utiliser des cookies pour améliorer l’expérience utilisateur.
          Vous pouvez configurer votre navigateur pour les refuser.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
          Pour exercer vos droits, contactez-nous à <strong>contact@wfhart.com</strong>.
        </p>
      </main>
    </div>
  );
}
