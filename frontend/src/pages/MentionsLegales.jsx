import { useState } from "react";

export default function MentionsLegales() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenuOnNav = () => setMenuOpen(false);

  return (
    <div>
      <style>{`
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
          box-shadow: -4px 0 20px rgba(0,0,0,0.4);
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
          background: #1a1a1a;
          color: #f2f2f2;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
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
        <h1>Mentions légales</h1>
        <p><strong>Éditeur du site :</strong> Wolfram & Hart</p>
        <p><strong>Adresse :</strong> 200 rue de la Croix Nivert, 75015 Paris</p>
        <p><strong>Téléphone :</strong> +33 (0)1 42 42 42 42</p>
        <p><strong>Email :</strong> contact@wfhart.com</p>

        <h2>Hébergement</h2>
        <p>Le site est hébergé par OVH, 2 rue Kellermann, 59100 Roubaix, France.</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble du contenu (textes, images, logos, code) est la propriété exclusive de Wolfram & Hart,
          sauf mention contraire. Toute reproduction est interdite sans autorisation préalable.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Wolfram & Hart met tout en œuvre pour fournir des informations fiables sur son site,
          mais ne saurait être tenue responsable des erreurs ou omissions.
        </p>
      </main>
    </div>
  );
}
