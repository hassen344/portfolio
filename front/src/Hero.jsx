import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Hero.css';
import hassenPhoto from './assets/hassen.webp';
import karouiImg from './assets/karoui.png';
import appImg from './assets/gestion de stock .png';

function Hero() {
  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);

  // ── Form state ──
  const [formData, setFormData] = useState({
    from_name:  '',
    from_email: '',
    message:    '',
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormStatus('success');
        setFormData({ from_name: '', from_email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  useEffect(() => {
    const dot  = cursorDotRef.current;
    const ring = cursorRingRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left  = mouseX + 'px';
      dot.style.top   = mouseY + 'px';
    };
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.10;
      ringY += (mouseY - ringY) * 0.10;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    };
    document.addEventListener('mousemove', moveCursor);
    rafId = requestAnimationFrame(animateRing);

    const handleEnter = () => { dot.classList.add('cursor-hover');    ring.classList.add('cursor-hover');    };
    const handleLeave = () => { dot.classList.remove('cursor-hover'); ring.classList.remove('cursor-hover'); };
    const interactives = document.querySelectorAll('a, button, .box-67, .pad, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.style.getPropertyValue('--delay') || '0s';
          setTimeout(() => {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.progress').forEach(bar => {
              bar.style.width = bar.dataset.width;
            });
          }, parseFloat(delay) * 1000);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafId);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── CUSTOM CURSOR ── */}
      <div className="cursor-dot"  ref={cursorDotRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>

      {/* ── FIXED GLOBAL BACKGROUND ── */}
      <div className="global-bg" style={{ backgroundImage: `url(${hassenPhoto})` }}></div>
      <div className="global-bg-overlay"></div>

      {/* ── BACKGROUND FX LAYERS ── */}
      <div className="scan-line"></div>
      <div className="noise-overlay"></div>
      <div className="light-leak"></div>
      <div className="glow-corner"></div>

      {/* ── NAVBAR ── */}
      <nav className="panel top">
        <div className="sections desktop">
          <div className="left">
            <span className="logo">MonPortfolio</span>
          </div>
          <div className="center">
            <ul className="menu uppercase">
              <li><a href="#hero">Accueil</a></li>
              <li><a href="#about">À propos</a></li>
              <li><a href="#skills">Compétences</a></li>
              <li><a href="#projects">Projets</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="right">
            <ul className="menu">
              <li><a href="https://www.facebook.com/hassen.karoui.391/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a></li>
              <li><a href="https://www.instagram.com/hassen_karoui_/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
              <li><a href="https://wa.me/21655988729" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
              <li><a href="https://www.linkedin.com/in/hassen-karoui-872678393/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a></li>
              <li><a href="https://github.com/hassen344" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="slide">
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-12-12">
                <div className="hero-label ae-0">PORTFOLIO — FUTURE INGÉNIEUR INFORMATIQUE · NÉ LE 15/01/2005</div>
                <h1 className="ae-1 fromCenter huge">Karoui Hassen</h1>
                <p className="ae-2 fromCenter hero">Développement web · Dévloppement app · Solutions créatives</p>
                <div className="hero-cta ae-3">
                  <a href="#projects" className="button blue gradient">Voir mes projets</a>
                  <a href="#contact" className="button outline">Me contacter</a>
                </div>
                <div className="hero-scroll ae-4">
                  <span>Scroll</span>
                  <div className="scroll-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-deco deco-1"></div>
        <div className="hero-deco deco-2"></div>
        <div className="hero-deco deco-3"></div>
        <div className="hero-deco deco-4"></div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="slide">
        <div className="section-glass"></div>
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-7-12 left">
                <div className="section-tag reveal">— À PROPOS</div>
                <h2 className="reveal">À propos<br/>de moi</h2>
                <p className="reveal" style={{ '--delay': '0.1s' }}>
                  Étudiant en ingénierie informatique à ESPRIT (École Supérieure Privée d'Ingénierie et de Technologies),
                  Ariana, Tunisie — promotion prévue en septembre 2029. Né le 15 janvier 2005, je suis passionné
                  par les nouvelles technologies et je recherche actuellement un job étudiant à mi-temps.
                </p>
                <p className="reveal" style={{ '--delay': '0.15s' }}>
                  J'ai effectué un stage à la <strong>Banque BIAT Tunisie</strong> (juillet–août 2025) où j'ai développé
                  une application web pour le contrôle des missions internes. J'ai également été
                  membre d'un bureau de vote à l'ISIE en octobre 2024.
                </p>
                <p className="reveal" style={{ '--delay': '0.2s' }}>
                  Ancien coureur de l'équipe nationale tunisienne de cyclisme (catégorie Junior U19),
                  je suis doté d'un esprit de créativité, d'innovation et d'une capacité d'apprentissage rapide.
                  Je parle couramment l'arabe (C1), le français (B2) et l'anglais (B1).
                </p>
                <div className="about-stats reveal" style={{ '--delay': '0.3s' }}>
                  <div className="stat">
                    <span className="stat-num">21</span>
                    <span className="stat-label">ans</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">3</span>
                    <span className="stat-label">Projets</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">3</span>
                    <span className="stat-label">Langues</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="slide">
        <div className="section-glass skills-glass"></div>
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-12-12" style={{ textAlign: 'left' }}>
                <div className="section-tag reveal">— COMPÉTENCES</div>
                <h2 className="reveal">Mes compétences</h2>
              </div>
              <div className="grid margin-top-5">
                <ul className="flex">
                  {[
                    { name: 'React',          pct: 85 },
                    { name: 'Node.js',        pct: 82 },
                    { name: 'Express.js',     pct: 80 },
                    { name: 'HTML',           pct: 92 },
                    { name: 'CSS',            pct: 88 },
                    { name: 'JavaScript',     pct: 85 },
                    { name: 'PHP',            pct: 78 },
                    { name: 'MySQL',          pct: 76 },
                    { name: 'C',              pct: 82 },
                    { name: 'C++',            pct: 80 },
                    { name: 'Arduino',        pct: 60 },
                    { name: 'ISIS (Proteus)', pct: 68 },
                    { name: 'MicroC',         pct: 65 },
                    { name: 'SDL 1.2',        pct: 68 },
                    { name: 'Docker',         pct: 50 },
                    { name: 'Linux',          pct: 70 },
                    { name: 'Shell',          pct: 70 },
                  ].map((skill, i) => (
                    <li key={skill.name} className="col-6-12 reveal" style={{ '--delay': `${i * 0.08}s` }}>
                      <div className="pad">
                        <div className="skill-header">
                          <h3>{skill.name}</h3>
                          <span className="skill-pct">{skill.pct}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress" data-width={`${skill.pct}%`} style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="slide">
        <div className="section-glass projects-glass"></div>
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-12-12" style={{ textAlign: 'left' }}>
                <div className="section-tag reveal">— PROJETS</div>
                <h2 className="reveal">Mes projets</h2>
              </div>
              <div className="grid margin-top-5">
                <ul className="flex">
                  {[
                    { title: 'Projet académique application web', tech: 'HTML · CSS · JavaScript · PHP', num: '01', img: null },
                    { title: 'Portfolio personnel',               tech: 'React · Vite · Node.js',        num: '02', img: karouiImg },
                    { title: 'Projet académique app desktop',     tech: 'C++ · MySQL',                   num: '03', img: appImg },
                  ].map((proj, i) => (
                    <li key={proj.num} className="col-4-12 reveal" style={{ '--delay': `${i * 0.1}s` }}>
                      <div className="box-67">
                        <div className="thumbnail-67">
                          {proj.img
                            ? <img src={proj.img} alt={proj.title} />
                            : <div className="thumbnail-placeholder"><span>{proj.num}</span></div>
                          }
                          <div className="project-num">{proj.num}</div>
                        </div>
                        <div className="name-67">
                          <h3>{proj.title}</h3>
                          <p>{proj.tech}</p>
                          <div className="project-arrow">→</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="slide">
        <div className="section-glass contact-glass"></div>
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-6-12 center">
                <div className="section-tag reveal" style={{ justifyContent: 'center' }}>— CONTACT</div>
                <h2 className="reveal">Contactez-moi</h2>
                <p className="reveal">Vous avez un projet ? Envoyez-moi un message !</p>

                <form className="slides-form reveal" style={{ '--delay': '0.2s' }} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Votre nom"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'loading'}
                  />
                  <input
                    type="email"
                    name="from_email"
                    placeholder="Votre email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'loading'}
                  />
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Votre message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'loading'}
                  ></textarea>

                  {formStatus === 'success' && (
                    <div className="form-status success">✅ Message envoyé avec succès !</div>
                  )}
                  {formStatus === 'error' && (
                    <div className="form-status error">❌ Erreur lors de l'envoi. Réessayez.</div>
                  )}

                  <button
                    type="submit"
                    className={`button blue gradient ${formStatus === 'loading' ? 'loading' : ''}`}
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contactez-moi</h3>
              <p><FaEnvelope className="icon" /><a href="mailto:Karouihassen927@gmail.com">Karouihassen927@gmail.com</a></p>
              <p><FaWhatsapp className="icon" /><a href="https://wa.me/21655988729">+216 55 988 729</a></p>
            </div>
            <div className="footer-section">
              <h3>Suivez-moi</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/hassen-karoui-872678393/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a>
                <a href="https://github.com/hassen344" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
                <a href="https://www.facebook.com/hassen.karoui.391/" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a>
                <a href="https://www.instagram.com/hassen_karoui_/" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Karoui Hassen · Ariana, Tunisie · Né le 15/01/2005. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Hero;