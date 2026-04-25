"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const plasmaRef = useRef<HTMLDivElement>(null);
  const rowARef = useRef<HTMLSpanElement>(null);
  const rowBRef = useRef<HTMLSpanElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── CURSOR ───────────────────────────────────────────
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    if (!cursor || !cursorRing) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const ticker = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      gsap.set(cursor, { x: mx, y: my });
      gsap.set(cursorRing, { x: rx, y: ry });
    };
    gsap.ticker.add(ticker);

    // ── BACKGROUND DRIFT ─────────────────────────────────
    const plasma = plasmaRef.current;
    if (!plasma) return;

    const bv = {
      b1x: 20, b1y: 30,
      b2x: 80, b2y: 15,
      b3x: 55, b3y: 85,
      b4x: 10, b4y: 80
    };

    const plasmaTicker = () => {
      if (!plasma) return;
      plasma.style.background = `
        radial-gradient(ellipse 70% 70% at ${bv.b1x}% ${bv.b1y}%, hsl(239,84%,67%) 0%, transparent 55%),
        radial-gradient(ellipse 60% 60% at ${bv.b2x}% ${bv.b2y}%, hsl(52,100%,50%)  0%, transparent 55%),
        radial-gradient(ellipse 65% 65% at ${bv.b3x}% ${bv.b3y}%, hsl(20,100%,55%)  0%, transparent 55%),
        radial-gradient(ellipse 50% 50% at ${bv.b4x}% ${bv.b4y}%, hsl(185,100%,52%) 0%, transparent 50%),
        hsl(48,100%,93%)
      `;
    };
    gsap.ticker.add(plasmaTicker);

    gsap.to(bv, {
      b1x: 40, b1y: 55,
      b2x: 65, b2y: 35,
      b3x: 30, b3y: 60,
      b4x: 85, b4y: 25,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // ── FLOATING STARS ────────────────────────────────────
    ["s1", "s2", "s3", "s4"].forEach((id, i) => {
      gsap.to("#" + id, {
        y: -20,
        rotation: 25 + i * 10,
        scale: 1.15,
        duration: 2.5 + i * 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });

    // ── BADGES FLOAT ─────────────────────────────────────
    ["badgeLeft", "badgeMid", "badgeBot"].forEach((id, i) => {
      gsap.to("#" + id, {
        y: -8,
        duration: 1.8 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.4
      });
    });

    // ── ENTRANCE ANIMATION ───────────────────────────────
    const rowA = rowARef.current;
    const rowB = rowBRef.current;

    gsap.set([rowA, rowB], { yPercent: 105 });
    gsap.set(["#badgeLeft", "#badgeMid", "#badgeBot"], {
      opacity: 0,
      scale: 0.8
    });
    gsap.set([".bracket"], { opacity: 0 });

    const intro = gsap.timeline({ delay: 0.15 });

    intro
      .to(rowA, { yPercent: 0, duration: 0.9, ease: "power3.out" })
      .to(rowB, { yPercent: 0, duration: 0.9, ease: "power3.out" }, "-=0.65")
      .to(
        [".bracket"],
        { opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
        "-=0.4"
      )
      .to(
        ["#badgeLeft", "#badgeMid", "#badgeBot"],
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.8)"
        },
        "-=0.3"
      );

    // ── SCROLL TIMELINE ────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1
      }
    });

    tl
      .fromTo(
        heroImgRef.current,
        { scale: 1, z: 0 },
        {
          scale: 2.2,
          z: 350,
          transformOrigin: "center center",
          ease: "power1.inOut"
        },
        0
      )
      .fromTo(
        rowA,
        { yPercent: 0, opacity: 1 },
        { yPercent: -120, opacity: 0, ease: "power2.in" },
        0
      )
      .fromTo(
        rowB,
        { yPercent: 0, opacity: 1 },
        { yPercent: 120, opacity: 0, ease: "power2.in" },
        0
      )
      .fromTo("#badgeLeft", { x: 0, opacity: 1 }, { x: -120, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#badgeMid", { y: 0, opacity: 1 }, { y: -80, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#badgeBot", { x: 0, opacity: 1 }, { x: 120, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#s1", { x: 0, y: 0, opacity: 1 }, { x: -80, y: -60, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#s2", { x: 0, y: 0, opacity: 1 }, { x: -60, y: 80, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#s3", { x: 0, y: 0, opacity: 1 }, { x: 80, y: -80, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#s4", { x: 0, y: 0, opacity: 1 }, { x: 60, y: 80, opacity: 0, ease: "power2.in" }, 0)
      .fromTo(["#bTL", "#bBR"], { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0, ease: "power2.in" }, 0)
      .fromTo(["#bTR", "#bBL"], { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0, ease: "power2.in" }, 0)
      .fromTo("#bgPlasma", { opacity: 1 }, { opacity: 0, ease: "power2.in" }, 0.3)
      .fromTo(".scanlines", { opacity: 0.6 }, { opacity: 1.5, ease: "none" }, 0);

    // ── HUD year counter ticks ─────────────────────────
    const hud = document.getElementById("hudYear");
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "+=180%",
      scrub: true,
      onUpdate: (self) => {
        if (hud) hud.textContent = Math.round(2000 + self.progress * 24).toString();
      }
    });

    // ── BELOW section reveal ───────────────────────────
    gsap.from(["#belowText", "#missionText", "#talkButton"], {
      scrollTrigger: {
        trigger: ".section-below",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 60,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out"
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
      gsap.ticker.remove(plasmaTicker);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="home-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --indigo: hsl(239, 84%, 67%);
          --yellow: hsl(52, 100%, 50%);
          --orange: hsl(20, 100%, 55%);
          --cyan: hsl(185, 100%, 52%);
          --cream: hsl(48, 100%, 93%);
          --dark: hsl(20, 10%, 5%);
        }

        .home-container {
          background: var(--dark);
          overflow-x: hidden;
          cursor: none;
        }

        /* ── CURSOR ── */
        .cursor {
          position: fixed;
          top: 0; left: 0;
          z-index: 9999;
          pointer-events: none;
          width: 10px;
          height: 10px;
          background: var(--yellow);
          border-radius: 50%;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          z-index: 9998;
          pointer-events: none;
          width: 36px;
          height: 36px;
          border: 2px solid var(--yellow);
          border-radius: 50%;
          mix-blend-mode: difference;
          transition: width 0.25s, height 0.25s;
        }

        /* ── WRAPPER + PIN ── */
        .wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* ── ELECTRIC BACKGROUND ── */
        .bg-plasma {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
              ellipse 70% 70% at 20% 30%,
              var(--indigo) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 60% 60% at 80% 15%,
              var(--yellow) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 65% 65% at 55% 85%,
              var(--orange) 0%,
              transparent 55%
            ),
            radial-gradient(ellipse 50% 50% at 10% 85%, var(--cyan) 0%, transparent 50%),
            var(--cream);
        }
        .bg-plasma::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: 0.5;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        /* ── IMAGE CONTAINER ── */
        .image-container {
          position: relative;
          width: 100%;
          height: 100vh;
          perspective: 500px;
          overflow: hidden;
          z-index: 1;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          will-change: transform;
        }

        /* ── HERO TEXT OVERLAY ── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          mix-blend-mode: multiply;
        }

        .hero-title {
          font-family: "Anton", sans-serif;
          font-size: clamp(6rem, 18vw, 20rem);
          line-height: 0.85;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--yellow);
          text-align: center;
          will-change: transform, opacity;
        }

        .hero-title .row {
          display: block;
          overflow: hidden;
        }

        .hero-title .row span {
          display: inline-block;
          will-change: transform;
        }

        /* ── SCANLINE OVERLAY ── */
        .scanlines {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.06) 3px,
            rgba(0, 0, 0, 0.06) 4px
          );
          opacity: 0.6;
        }

        /* ── CORNER BRACKETS ── */
        .brackets {
          position: absolute;
          inset: 1.5rem;
          z-index: 5;
          pointer-events: none;
        }
        .bracket {
          position: absolute;
          width: clamp(32px, 4vw, 56px);
          height: clamp(32px, 4vw, 56px);
          border-color: var(--dark);
          border-style: solid;
          border-width: 0;
        }
        .bracket-tl { top: 0; left: 0; border-top-width: 3px; border-left-width: 3px; }
        .bracket-tr { top: 0; right: 0; border-top-width: 3px; border-right-width: 3px; }
        .bracket-bl { bottom: 0; left: 0; border-bottom-width: 3px; border-left-width: 3px; }
        .bracket-br { bottom: 0; right: 0; border-bottom-width: 3px; border-right-width: 3px; }

        /* ── FLOATING Y2K BADGES ── */
        .badge-float {
          position: absolute;
          z-index: 6;
          font-family: "Space Mono", monospace;
          font-size: clamp(0.55rem, 0.9vw, 0.75rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 0.5em 1em;
          border: 2px solid var(--dark);
          background: var(--yellow);
          color: var(--dark);
          border-radius: 999px;
          pointer-events: none;
          will-change: transform;
        }
        .badge-float.indigo-bg { background: var(--indigo); color: #fff; border-color: #fff; }
        .badge-float.orange-bg { background: var(--orange); color: #fff; border-color: #fff; }

        /* ── STAR DECORATORS ── */
        .deco-star {
          position: absolute;
          z-index: 6;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          pointer-events: none;
          will-change: transform;
          line-height: 1;
        }

        /* ── HUD BAR ── */
        .hud-bar {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          z-index: 6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1rem, 3vw, 3rem);
          pointer-events: none;
        }
        .hud-label {
          font-family: "Space Mono", monospace;
          font-size: clamp(0.55rem, 0.85vw, 0.75rem);
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dark);
        }
        .hud-line {
          flex: 1;
          height: 1px;
          background: var(--dark);
          margin: 0 1.5rem;
          opacity: 0.4;
        }

        /* ── CREDIT ── */
        .cp-credit {
          position: absolute;
          top: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          font-family: "Space Mono", monospace;
          font-size: clamp(0.5rem, 0.75vw, 0.65rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: lowercase;
          text-decoration: none;
          color: var(--dark);
          opacity: 0.45;
          border-bottom: 1px solid currentColor;
          padding-bottom: 1px;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .cp-credit:hover { opacity: 1; }

        /* ── SECTION BELOW ── */
        .section-below {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100vh;
          background: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .section-below .bg-plasma {
          position: absolute;
          inset: 0;
          opacity: 0.12;
        }
        .below-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 0 2rem;
        }
        .below-text {
          font-family: "Anton", sans-serif;
          font-size: clamp(3rem, 9vw, 10rem);
          line-height: 0.9;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: -0.02em;
          color: var(--cream);
        }
        .below-text em {
          font-style: normal;
          color: var(--indigo);
          display: block;
        }
        .mission-statement {
          font-family: "Space Mono", monospace;
          font-size: clamp(1rem, 2.5vw, 1.75rem);
          color: var(--cream);
          opacity: 0.8;
          text-align: center;
          max-width: 800px;
          line-height: 1.4;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .talk-button {
          position: relative;
          display: inline-block;
          padding: 0.75rem 2.5rem;
          background: transparent;
          color: var(--indigo);
          font-family: "Anton", sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 2px solid var(--indigo);
          border-radius: 0.5rem;
          overflow: hidden;
          transition: color 0.5s ease-in-out;
          z-index: 10;
        }

        .talk-button:before,
        .talk-button:after {
          position: absolute;
          top: 50%;
          content: '';
          width: 20px;
          height: 20px;
          background-color: var(--indigo);
          border-radius: 50%;
          z-index: -1;
          pointer-events: none;
        }

        .talk-button:before {
          left: -20px;
          transform: translate(-50%, -50%);
        }

        .talk-button:after {
          right: -20px;
          transform: translate(50%, -50%);
        }

        .talk-button:hover {
          color: #fff;
        }

        .talk-button:hover:before {
          animation: criss-cross-left 0.8s both;
          animation-direction: alternate;
        }

        .talk-button:hover:after {
          animation: criss-cross-right 0.8s both;
          animation-direction: alternate;
        }

        @keyframes criss-cross-left {
          0% { left: -20px; }
          50% { left: 50%; width: 20px; height: 20px; }
          100% { left: 50%; width: 300%; height: 300%; }
        }

        @keyframes criss-cross-right {
          0% { right: -20px; }
          50% { right: 50%; width: 20px; height: 20px; }
          100% { right: 50%; width: 300%; height: 300%; }
        }

        /* Responsive adjustments */
        @media (max-height: 600px) {
          .brackets { inset: 0.75rem; }
          .bracket { width: 24px; height: 24px; }
          .badge-float { font-size: 0.5rem; padding: 0.35em 0.75em; }
          .hud-bar { bottom: 0.75rem; }
          .cp-credit { top: 0.85rem; }
          .deco-star { font-size: 1.1rem; }
        }
      `}</style>

      <div ref={cursorRef} className="cursor" id="cursor"></div>
      <div ref={cursorRingRef} className="cursor-ring" id="cursorRing"></div>

      {/* ── PINNED WRAPPER ── */}
      <div ref={wrapperRef} className="wrapper" id="wrapper">
        <div ref={plasmaRef} className="bg-plasma" id="bgPlasma"></div>

        <div className="image-container" id="imgContainer">
          <img
            ref={heroImgRef}
            src="https://images.unsplash.com/photo-1589848315097-ba7b903cc1cc?q=80&w=2070&auto=format&fit=crop"
            alt="hero"
            id="heroImg"
          />
        </div>

        <div className="scanlines"></div>

        <div className="brackets">
          <div className="bracket bracket-tl" id="bTL"></div>
          <div className="bracket bracket-tr" id="bTR"></div>
          <div className="bracket bracket-bl" id="bBL"></div>
          <div className="bracket bracket-br" id="bBR"></div>
        </div>

        <div className="hero-overlay">
          <div className="hero-title" id="heroTitle">
            <div className="row"><span ref={rowARef} id="rowA">FUTURE</span></div>
            <div className="row"><span ref={rowBRef} id="rowB">IS NOW</span></div>
          </div>
        </div>

        <div className="badge-float" id="badgeLeft" style={{ top: '18%', left: '5%' }}>★ Y2K FOREVER</div>
        <div className="badge-float indigo-bg" id="badgeMid" style={{ top: '12%', right: '8%' }}>SELECTED WORK</div>
        <div className="badge-float orange-bg" id="badgeBot" style={{ bottom: '22%', right: '6%' }}>2024 — NOW</div>

        <div className="deco-star" id="s1" style={{ top: '25%', left: '28%', color: 'var(--indigo)' }}>✦</div>
        <div className="deco-star" id="s2" style={{ top: '60%', left: '10%', color: 'var(--dark)' }}>★</div>
        <div className="deco-star" id="s3" style={{ top: '30%', right: '25%', color: 'var(--orange)' }}>✦</div>
        <div className="deco-star" id="s4" style={{ bottom: '28%', left: '22%', color: 'var(--cyan)' }}>★</div>



        <div className="hud-bar">
          <span className="hud-label">Scroll to enter</span>
          <div className="hud-line"></div>
          <span className="hud-label" id="hudYear">2024</span>
        </div>
      </div>

      {/* ── BELOW SECTION ── */}
      <div className="section-below">
        <div className="bg-plasma"></div>
        <div className="below-content">
          <div className="below-text" id="belowText">
            THE WORK<em>SPEAKS.</em>
          </div>
          <p className="mission-statement" id="missionText">
            We create brands that make a difference.
          </p>
          <a href="/contact-us" className="talk-button" id="talkButton">
            LET'S TALK
          </a>
        </div>
      </div>
    </div>
  );
}
