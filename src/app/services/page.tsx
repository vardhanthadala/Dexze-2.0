"use client";

import React, { useEffect, useRef, FC } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HeroSection {
  headline: string;
  image: string;
  id: string;
}



// ─── Data ─────────────────────────────────────────────────────────────────────
const HEROES: HeroSection[] = [
  {
    headline: "",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1920&q=80",
    id: "section-0",
  },
  {
    headline: "Full Stack Web & App Developmenr",
    image: "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?auto=format&fit=crop&w=1920&q=80",
    id: "section-1",
  },
  {
    headline: "UI & UX Design ",
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1920&q=80",
    id: "section-2",
  },
  {
    headline: "Digital Marketing ",
    image: "https://plus.unsplash.com/premium_photo-1684225764999-3597a8da10ab?auto=format&fit=crop&w=1920&q=80",
    id: "section-3",
  },
  {
    headline: "Branding & Creatives",
    image: "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?auto=format&fit=crop&w=1920&q=80",
    id: "section-4",
  },
];



// ─── Hero Section Component ───────────────────────────────────────────────────
// Uses CSS clip trick for fixed-within-section parallax (same as original)
const HeroSection: FC<{ hero: HeroSection; index: number }> = ({ hero, index }) => {
  return (
    <section
      className="relative w-full"
      style={{ height: "100vh" }}
    >
      {/*
        .hero-inner equivalent:
        overflow:hidden + clip:rect(0,auto,auto,0) confines the fixed figure
        so each hero's background only shows within its own viewport slice.
      */}
      <div
        id={hero.id}
        className="absolute inset-0 overflow-hidden"
        style={{
          clip: "rect(0, auto, auto, 0)",
          // iOS Safari fallback
          WebkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        {/* Fixed background image — stays put while you scroll through this section */}
        <figure
          className="fixed inset-0 w-full h-full m-0 p-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${hero.image}')` }}
          aria-hidden="true"
        >
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/35" />
        </figure>

        {/* Headline — also fixed within this clipped container */}
        <h2
          className="fixed inset-0 flex items-center justify-center text-center text-white px-4 z-10 select-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1.1,
            textShadow: "0 2px 32px rgba(0,0,0,0.45)",
          }}
        >
          {hero.headline}
        </h2>
      </div>
    </section>
  );
};

// ─── Content Section ─────────────────────────────────────────────────────────
const ContentSection: FC = () => {
  return (
    <section
      className="relative bg-white z-10"
      style={{ marginBottom: "8rem" }}
    >
      {/*
        Inverted triangle clip — white wedge that "peels up" from the last hero.
        Matches the original .content:before clip-path triangle.
      */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bg-white z-10"
        style={{
          top: "-100px",
          height: "100px",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />

      {/* Article body */}
      <article className="relative z-20 mx-auto max-w-[1200px] px-8 pt-4 pb-24">
        <style>{`
          .reveal-text {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            text-align: center;
            margin-bottom: 2rem;
            color: #111;
            letter-spacing: -0.03em;
            font-weight: 700;
          }

          .reveal-text span {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: reveal-letter 0.5s forwards;
          }

          @keyframes reveal-letter {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .flip-card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            justify-items: center;
            padding-top: 2rem;
          }

          .flip-card {
            background-color: transparent;
            width: 100%;
            max-width: 320px;
            height: 440px;
            perspective: 1000px;
            font-family: 'DM Sans', sans-serif;
          }

          .title {
            font-size: 1.6em;
            font-weight: 800;
            text-align: center;
            margin: 0;
            letter-spacing: -0.02em;
            z-index: 2;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-style: preserve-3d;
          }

          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          /* Shining Glint Effect */
          .flip-card-front::after {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transition: all 0.6s ease;
            z-index: 5;
          }

          .flip-card:hover .flip-card-front::after {
            left: 150%;
          }

          .flip-card-front,
          .flip-card-back {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 1.2rem;
            overflow: hidden;
            transition: box-shadow 0.3s ease;
          }

          .flip-card:hover .flip-card-front,
          .flip-card:hover .flip-card-back {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          }

          .flip-card-front {
            background: #fff;
            color: #fff;
            justify-content: flex-end;
            padding: 2rem;
            border: 1px solid #f0f0f0;
          }

          .card-bg {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            z-index: 1;
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .flip-card:hover .card-bg {
            transform: scale(1.15);
          }

          .card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
            z-index: 1;
          }

          .flip-card-back {
            background: linear-gradient(135deg, #ffffff 0%, #f1f4f2 100%);
            color: #1a1a1a;
            transform: rotateY(180deg);
            padding: 2.5rem;
            justify-content: center;
            text-align: left;
            border: 1px solid #e0e0e0;
          }

          .flip-card-back .title {
            text-align: left;
            font-size: 1.4rem;
            margin-bottom: 1.5rem;
            color: #2d5a41;
            font-weight: 800;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.5s ease 0.2s;
          }

          .flip-card:hover .flip-card-back .title {
            transform: translateY(0);
            opacity: 1;
          }

          .service-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .service-list li {
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            color: #444;
            font-weight: 500;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.4s ease;
          }

          .flip-card:hover .service-list li {
            transform: translateY(0);
            opacity: 1;
          }

          /* Staggered animation for list items */
          .flip-card:hover .service-list li:nth-child(1) { transition-delay: 0.3s; }
          .flip-card:hover .service-list li:nth-child(2) { transition-delay: 0.4s; }
          .flip-card:hover .service-list li:nth-child(3) { transition-delay: 0.5s; }
          .flip-card:hover .service-list li:nth-child(4) { transition-delay: 0.6s; }
          .flip-card:hover .service-list li:nth-child(5) { transition-delay: 0.7s; }

          .service-list li::before {
            content: "•";
            color: #A9DFBF;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
            margin-right: 10px;
          }
        `}</style>

        <h2 className="reveal-text">
          {"Services we provide".split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <div className="flip-card-grid">
          {[
            {
              t: "Branding & Design",
              bg: "/services/brandind-services.png",
              list: ["Branding", "Graphic Design", "UI UX Design", "Creative Design", "Collateral Design"]
            },
            {
              t: "Digital Marketing",
              bg: "/services/digitalMarketing-services.png",
              list: ["Social Media Management", "PPC Campaigns", "SEO", "Content Marketing", "Email Marketing"]
            },
            {
              t: "Back-End Dev & More",
              bg: "/services/fullstack-services.png",
              list: ["Web App's", "Mobile App's", "Photography", "Video & Production", "OOH"]
            },
            {
              t: "UI / UX Design",
              bg: "/services/uiux-services.png",
              list: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"]
            },
            {
              t: "Fullstack Solutions",
              bg: "/services/fullstack-services.png",
              list: ["Architecture", "Scalability", "API Integration", "Cloud Services", "Performance"]
            },
            {
              t: "Strategy & Creative",
              bg: "/services/brandind-services.png",
              list: ["Brand Voice", "Market Analysis", "Campaign Strategy", "Content Plan", "Art Direction"]
            },
            {
              t: "Growth Marketing",
              bg: "/services/digitalMarketing-services.png",
              list: ["Lead Generation", "Funnel Optimization", "Analytics", "A/B Testing", "Conversion Rate"]
            },
            {
              t: "Mobile Engineering",
              bg: "/services/fullstack-services.png",
              list: ["iOS Development", "Android Development", "React Native", "Flutter", "App Store Optimization"]
            },
            {
              t: "Product Design",
              bg: "/services/uiux-services.png",
              list: ["Product Strategy", "Design Systems", "Interaction Design", "Motion Graphics", "Accessibility"]
            }
          ].map((card, i) => (
            <div key={i} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-bg" style={{ backgroundImage: `url(${card.bg})` }} />
                  <div className="card-overlay" />
                  <p className="title">{card.t}</p>
                </div>
                <div className="flip-card-back">
                  <p className="title">{card.t}</p>
                  <ul className="service-list">
                    {card.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  useEffect(() => {
    const id = "services-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@400;500&family=Fjalla+One&display=swap";
    document.head.appendChild(link);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}</style>

      <main>
        {HEROES.map((hero, index) => (
          <HeroSection key={hero.id} hero={hero} index={index} />
        ))}
        <ContentSection />
        <CTASection />
      </main>
    </>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────
const CTASection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animatedHeadline = (text: string, baseColor: string, hoverColor: string) => (
    <div className={`retro-headline ${isVisible ? 'visible' : ''}`} style={{ color: baseColor }}>
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="letter" 
          style={{ 
            transitionDelay: `${i * 0.03}s`,
            '--hover-color': hoverColor 
          } as any}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[70vh] bg-[#050505] flex flex-col md:flex-row items-center px-8 md:px-24 py-32 overflow-hidden gap-12"
    >
      <style>{`
        .retro-headline {
          font-family: 'Fjalla One', sans-serif;
          font-size: clamp(2.2rem, 5.5vw, 4.5rem);
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 0.2rem;
          transform: rotate(-10deg);
          display: flex;
          flex-wrap: wrap;
        }

        .letter {
          display: block;
          transform: skew(-10deg) translateY(80px);
          opacity: 0;
          transition: 
            transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), 
            opacity 0.7s ease,
            color 0.3s ease;
          text-shadow: 
            #533d4a 1px 1px, 
            #533d4a 2px 2px, 
            #533d4a 3px 3px, 
            #533d4a 4px 4px;
          cursor: default;
        }

        .visible .letter {
          transform: skew(-10deg) translateY(0);
          opacity: 1;
        }

        .letter:hover {
          color: var(--hover-color) !important;
          transform: skew(-10deg) scale(1.1) translateY(-10px) !important;
          z-index: 10;
        }

        .cta-image-reveal {
          opacity: 0;
          transform: scale(0.95) translateX(20px);
          transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cta-image-reveal.visible {
          opacity: 1;
          transform: scale(1) translateX(0);
        }
      `}</style>

      {/* Content Column */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start pt-12">
        {animatedHeadline("We Engineer", "#fff", "#e55643")}
        {animatedHeadline("High Performance", "#fff", "#2b9f5e")}
        {animatedHeadline("Transform Brands", "#fff", "#f1c83c")}

        {/* Animated CTA Button */}
        <div className={`mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1s' }}>
          <style>{`
            .custom-btn {
              --primary: #A9DFBF;
              --neutral-1: #ffffff;
              --neutral-2: #f0f0f0;
              --radius: 34px;
              cursor: pointer;
              border-radius: var(--radius);
              text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
              border: none;
              box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
                0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              transition: all 0.3s ease;
              min-width: 240px;
              padding: 12px 30px;
              height: 68px;
              font-family: inherit;
              font-size: 18px;
              font-weight: 700;
              background: #fff;
              color: #000;
            }

            .custom-btn:hover {
              transform: scale(1.05);
              box-shadow: 0 0 1px 2px rgba(169, 223, 191, 0.3),
                0 15px 30px rgba(0, 0, 0, 0.3);
            }

            .custom-btn:active {
              transform: scale(0.98);
            }

            .custom-btn::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: var(--radius);
              border: 2px solid transparent;
              background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2)) border-box;
              z-index: 0;
              transition: all 0.4s ease;
            }

            .custom-btn .state {
              z-index: 5;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
            }

            .custom-btn .icon {
              transition: all 0.3s ease;
            }

            .custom-btn:hover .icon {
              transform: rotate(15deg) scale(1.2);
              color: var(--primary);
            }

            .letter-span {
              display: inline-block;
              transition: all 0.3s ease;
            }

            .custom-btn:hover .letter-span {
              animation: wave-effect 0.5s ease forwards calc(var(--i) * 0.03s);
            }

            @keyframes wave-effect {
              0% { transform: translateY(0); }
              50% { transform: translateY(-5px); color: var(--primary); }
              100% { transform: translateY(0); }
            }

            .btn-outline {
              position: absolute;
              inset: -3px;
              border-radius: inherit;
              overflow: hidden;
              z-index: 1;
              opacity: 0;
              transition: opacity 0.4s ease;
            }

            .custom-btn:hover .btn-outline {
              opacity: 1;
            }

            .btn-outline::before {
              content: "";
              position: absolute;
              inset: -100%;
              background: conic-gradient(from 180deg, transparent 60%, #A9DFBF 80%, transparent 100%);
              animation: spin-anim 2s linear infinite;
            }

            @keyframes spin-anim {
              to { transform: rotate(360deg); }
            }
          `}</style>
          
          <button className="custom-btn group">
            <div className="btn-outline"></div>
            <div className="state state--default">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
              <p className="flex">
                {"Start a Project".split("").map((char, i) => (
                  <span key={i} className="letter-span" style={{ "--i": i } as any}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Image Column - Themed Retro Engineering Image */}
      <div className={`relative w-full md:w-1/2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl cta-image-reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=1000&q=80')",
            filter: "sepia(0.2) contrast(1.2) brightness(0.8)"
          }}
        />
        {/* Subtle overlay to blend with the retro theme */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
    </section>
  );
};