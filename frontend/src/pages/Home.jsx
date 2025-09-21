import { useState, useEffect } from "react";
import "./WolframHartSite.css";


/* Effet de frappe */
function TypingEffect({ texts, speed = 80, pause = 1500 }) {
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);

    useEffect(() => {
        if (!texts?.length) return;

        let t;
        if (forward) {
            if (subIndex < texts[index].length) {
                t = setTimeout(() => setSubIndex(subIndex + 1), speed);
            } else {
                t = setTimeout(() => setForward(false), pause);
            }
        } else {
            if (subIndex > 0) {
                t = setTimeout(() => setSubIndex(subIndex - 1), speed / 2);
            } else {
                setForward(true);
                setIndex((index + 1) % texts.length);
            }
        }

        setDisplayed(texts[index].slice(0, subIndex));
        return () => clearTimeout(t);
    }, [texts, index, subIndex, forward, speed, pause]);

    return (
        <h2 className="typing">
            {displayed}
            <span className="cursor">|</span>
        </h2>
    );
}

export default function WolframHartSite() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [showAll, setShowAll] = useState(false);

    const projects = [
        {
            id: 1,
            title: "Stitchly Hook",
            description:
                "Plateforme moderne pour la vente de créations artisanales de crochet.",
            image: "/images/portfolio/stitchlyhook.jpg",
            link: "https://stitchlyhook.com",
        },
        {
            id: 2,
            title: "Moroccoall",
            description: "Plateforme moderne pour la vente d'artisanat marocain.",
            image: "/images/portfolio/moroccoall.jpg",
            link: "https://moroccoall.com",
        },
        {
            id: 3,
            title: "Cinéphora",
            description:
                "Site communautaire dédié au cinéma et aux critiques de films.",
            image: "/images/portfolio/cinephora.jpg",
            link: "https://cinephora.fr",
        },
        {
            id: 4,
            title: "Shely Care",
            description: "Solution digitale dans le domaine du bien-être et des soins.",
            image: "/images/portfolio/shelycare.jpg",
            link: "https://shelycare.com",
        },
    ];

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (e) => e.isIntersecting && e.target.classList.add("visible")
                ),
            { threshold: 0.12 }
        );
        document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const handleChange = (e) =>
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("⏳ Envoi en cours…");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("✅ Merci pour votre message, nous vous répondrons rapidement.");
                setFormData({ firstname: "", lastname: "", email: "", message: "" });
            } else {
                setStatus("❌ Une erreur est survenue. Merci de réessayer.");
            }
        } catch {
            setStatus("❌ Erreur réseau. Vérifiez votre connexion.");
        }
    };

    const closeMenuOnNav = () => setMenuOpen(false);

    return (
        <div>
            {/* Sidebar */}
            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
                <div className="brand">
                    <a href="/" className="logo-link">
                        <h1>Wolfram & Hart</h1>
                    </a>
                </div>
                <nav className="nav-menu" onClick={closeMenuOnNav}>
                    <a href="#about">À propos</a>
                    <a href="#services">Services</a>
                    <a href="#portfolio">Réalisations</a>
                    <a href="#contact">Contact</a>
                </nav>
            </aside>

            {/* Burger */}
            <button
                className={`burger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Ouvrir le menu"
            >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </button>

            {/* Hero */}
            <section className="hero">
                <TypingEffect
                    texts={[
                        "Développement informatique sur mesure",
                        "Applications web et mobiles",
                        "Conseil & accompagnement digital",
                    ]}
                />
                <p>
                    Nous accompagnons les entreprises dans la création de solutions
                    digitales modernes et performantes.
                </p>
                <button
                    className="cta"
                    onClick={() =>
                        document.querySelector("#contact")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Discutons de votre projet
                </button>
                <div className="particles" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </section>

            {/* About */}
            <section id="about" className="reveal">
                <h2 className="section-title">Qui sommes-nous ?</h2>
                <p className="section-sub">
                    Wolfram & Hart est spécialisée dans le développement informatique. Nous
                    créons des outils numériques robustes et élégants pour aider nos
                    clients à grandir, innover et se démarquer.
                </p>
                <p className="section-sub">
                    <strong>Siège</strong> 200 rue de la Croix Nivert, 75015 Paris
                </p>
            </section>

            {/* Services */}
            <section id="services" className="reveal">
                <h2 className="section-title">Nos expertises</h2>
                <p className="section-sub">De l’idée au produit fini, on s’occupe de tout.</p>

                <div className="cards">
                    <div className="card">
                        <h3>🌐 Sites Web</h3>
                        <p>Sites vitrines, e-commerce, outils métiers</p>
                    </div>
                    <div className="card">
                        <h3>📱 Applications</h3>
                        <p>
                            Apps web & mobiles, intégrations, sécurité et scalabilité.
                        </p>
                    </div>
                    <div className="card">
                        <h3>💡 Conseil</h3>
                        <p>Audit, roadmap, choix technos et accompagnement produit.</p>
                    </div>
                </div>
                {/* Logos ajoutés */} <div className="tech-logos">
                    <img src="/images/logos/symfony.jpg" alt="Symfony" />
                    <img src="/images/logos/php.jpg" alt="PHP" />
                    <img src="/images/logos/react.jpg" alt="React" />
                    <img src="/images/logos/node.jpg" alt="Node.js" />
                    <img src="/images/logos/docker.jpg" alt="Docker" /> </div>
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="reveal">
                <h2 className="section-title">Réalisations</h2>
                <div className="portfolio-grid">
                    {(showAll ? projects : projects.slice(0, 3)).map((p) => (
                        <div key={p.id} className="portfolio-item">
                            <a href={p.link} target="_blank" rel="noopener noreferrer">
                                <img src={p.image} alt={p.title} />
                                <div className="overlay">
                                    <h4>{p.title}</h4>
                                    <p>{p.description}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                {projects.length > 3 && (
                    <button className="see-more" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Voir moins" : "Voir plus"}
                    </button>
                )}
            </section>

            {/* Contact */}
            <section id="contact" className="reveal">
                <h2 className="section-title">Contactez-nous</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="form-field">
                            <input
                                type="text"
                                name="firstname"
                                placeholder=" "
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            <label>Prénom</label>
                        </div>
                        <div className="form-field">
                            <input
                                type="text"
                                name="lastname"
                                placeholder=" "
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                            <label>Nom</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label>
                    </div>
                    <div className="form-field">
                        <textarea
                            name="message"
                            rows="4"
                            placeholder=" "
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <label>Votre message</label>
                    </div>
                    <button className="submit" type="submit">
                        Envoyer
                    </button>
                    {status && <p className="status">{status}</p>}
                </form>
            </section>

            {/* Footer */}
            <footer>
                <div className="footer-container">
                    <div className="footer-about">
                        <a href="#contact" className="contact-btn">
                            Contactez-nous
                        </a>
                        <p>
                            Wolfram & Hart est une entreprise spécialisée en développement
                            informatique sur-mesure. Nous vous aidons à transformer vos idées en
                            solutions modernes et performantes.
                        </p>
                    </div>
                    <div className="footer-contact">
                        <h4>Coordonnées</h4>
                        <p>
                            <strong>Téléphone :</strong> +33 (0)6 13 46 93 40
                        </p>
                        <p>
                            <strong>Siège social :</strong>
                            <br />
                            200 rue de la Croix Nivert
                            <br /> 75015 Paris
                        </p>
                    </div>
                    <div className="footer-nav">
                        <h4>Navigation</h4>
                        <ul>
                            <li>
                                <a href="#about">L'entreprise</a>
                            </li>
                            <li>
                                <a href="#services">Nos expertises</a>
                            </li>
                            <li>
                                <a href="#portfolio">Réalisations</a>
                            </li>
                            <li>
                                <a href="#contact">Nous contacter</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        © Wolfram & Hart 2025 —{" "}
                        <a href="/mentions-legales">Mentions légales</a> |{" "}
                        <a href="/politique-confidentialite">
                            Politique de confidentialité
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
