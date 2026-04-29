"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./AboutHero.css";

const AboutHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ─── CURSOR LOGIC ───
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
      return;
    }

    const cur = cursorRef.current;
    const curRing = cursorRingRef.current;
    if (!cur || !curRing) return;

    let curX = 0, curY = 0, ringX = 0, ringY = 0;
    const onMouseMove = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    let requestRef: number;
    const animCursor = () => {
      ringX += (curX - ringX) * 0.12;
      ringY += (curY - ringY) * 0.12;
      cur.style.left = curX + "px";
      cur.style.top = curY + "px";
      curRing.style.left = ringX + "px";
      curRing.style.top = ringY + "px";
      requestRef = requestAnimationFrame(animCursor);
    };
    requestRef = requestAnimationFrame(animCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  useEffect(() => {
    // ─── BLOB CANVAS ───
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, t = 0;
    let mouseX = 0.5, mouseY = 0.5;
    let targetMX = 0.5, targetMY = 0.5;

    const resizeCanvas = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      targetMX = e.clientX / window.innerWidth;
      targetMY = e.clientY / window.innerHeight;
    };
    document.addEventListener("mousemove", onMouseMove);

    const blobs = [
      { x: 0.25, y: 0.55, r: 0.42, c1: "#7c00ff", c2: "#6600ff", sp: 0.22, ox: 0.18, oy: 0.14 },
      { x: 0.72, y: 0.38, r: 0.38, c1: "#ff0080", c2: "#cc0055", sp: 0.31, ox: 0.16, oy: 0.12 },
      { x: 0.55, y: 0.18, r: 0.30, c1: "#0055ff", c2: "#0022cc", sp: 0.19, ox: 0.22, oy: 0.10 },
      { x: 0.15, y: 0.25, r: 0.24, c1: "#00aaff", c2: "#0088cc", sp: 0.28, ox: 0.12, oy: 0.18 },
      { x: 0.82, y: 0.72, r: 0.28, c1: "#aa00ff", c2: "#8800cc", sp: 0.24, ox: 0.14, oy: 0.20 },
    ];

    let canvasAnimId: number;
    const drawBlobs = () => {
      t += 0.005;
      mouseX += (targetMX - mouseX) * 0.04;
      mouseY += (targetMY - mouseY) * 0.04;

      ctx.clearRect(0, 0, W, H);

      // Dark background
      ctx.fillStyle = "#06060a";
      ctx.fillRect(0, 0, W, H);

      blobs.forEach((b, i) => {
        const sway_x = Math.sin(t * b.sp + i * 1.3) * b.ox + Math.sin(t * b.sp * 0.6) * 0.06;
        const sway_y = Math.cos(t * b.sp * 0.8 + i * 0.9) * b.oy + Math.cos(t * b.sp * 0.4) * 0.05;

        // Mouse parallax — each blob reacts differently
        const parallax = (i % 3 === 0 ? 1 : i % 3 === 1 ? -0.6 : 0.3);
        const cx = (b.x + sway_x + (mouseX - 0.5) * 0.08 * parallax) * W;
        const cy = (b.y + sway_y + (mouseY - 0.5) * 0.06 * parallax) * H;
        const pulse = 1 + Math.sin(t * 0.7 + i) * 0.08;
        const r = b.r * Math.min(W, H) * pulse;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, b.c1 + "dd");
        grad.addColorStop(0.5, b.c2 + "88");
        grad.addColorStop(1, b.c2 + "00");

        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * (0.85 + Math.sin(t * 0.5 + i) * 0.1), t * 0.1 + i, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Overlay dark gradient for text readability
      ctx.globalCompositeOperation = "source-over";
      const overlay = ctx.createLinearGradient(0, H * 0.3, 0, H);
      overlay.addColorStop(0, "rgba(6,6,10,0)");
      overlay.addColorStop(0.6, "rgba(6,6,10,0.55)");
      overlay.addColorStop(1, "rgba(6,6,10,0.85)");
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, W, H);

      // Left text-area darkening
      const leftFade = ctx.createLinearGradient(0, 0, W * 0.65, 0);
      leftFade.addColorStop(0, "rgba(6,6,10,0.4)");
      leftFade.addColorStop(1, "rgba(6,6,10,0)");
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 0, W, H);

      canvasAnimId = requestAnimationFrame(drawBlobs);
    };
    drawBlobs();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(canvasAnimId);
    };
  }, []);

  useEffect(() => {
    // ─── GSAP ENTRANCE ───
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Eyebrow
    tl.to(".hero-eyebrow-about", { opacity: 1, y: 0, duration: 0.6 }, 0.5);

    // Headline lines stagger
    tl.to(".h1-line-inner-about", {
      y: "0%",
      duration: 1.0,
      stagger: 0.12,
      ease: "power4.out"
    }, 0.6);

    // Bottom row
    tl.to("#hero-bottom-about", { opacity: 1, y: 0, duration: 0.7 }, 1.2);

    // Stats
    tl.to("#hero-right-about", { opacity: 1, x: 0, duration: 0.7 }, 1.3);

    // Scroll indicator
    tl.to("#scroll-indicator-about", { opacity: 1, duration: 0.6 }, 1.6);

    // Set initial states
    gsap.set(".hero-eyebrow-about", { opacity: 0, y: 16 });
    gsap.set(".h1-line-inner-about", { y: "110%" });
    gsap.set("#hero-bottom-about", { opacity: 0, y: 24 });
    gsap.set("#hero-right-about", { opacity: 0, x: 20 });
    gsap.set("#scroll-indicator-about", { opacity: 0 });

  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="about-cursor" ref={cursorRef}></div>
      <div className="about-cursor-ring" ref={cursorRingRef}></div>

      {/* Grain SVG filter */}
      <svg id="grain-svg" xmlns="http://www.w3.org/2000/svg" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9000, display: "none" }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div id="grain-about"></div>

      {/* Hero */}
      <section id="hero-about" ref={heroRef}>
        <canvas id="blob-canvas-about" ref={canvasRef}></canvas>

        <div className="hero-content-about">
          <div className="hero-left-about">
            <div className="hero-eyebrow-about">
              <div className="eyebrow-dot-about"></div>
              <span className="eyebrow-text-about">Design · Engineering · Studio · Est. 2019</span>
            </div>

            <h1 className="hero-h1-about">
              <span className="h1-line-about"><span className="h1-line-inner-about">We build</span></span>
              <span className="h1-line-about"><span className="h1-line-inner-about">what <em className="accent-about">others</em></span></span>
              <span className="h1-line-about"><span className="h1-line-inner-about">imagine.</span></span>
            </h1>

            <div className="hero-bottom-about" id="hero-bottom-about">
              <p className="hero-sub-about">
                A design-engineering studio crafting products people actually want to use.
                Precision, craft, and velocity — all three, always.
              </p>
              <div className="hero-btns-about">
                <a href="#" className="btn-primary-about">
                  Explore work
                  {/* <span className="btn-arrow-about">↗</span> */}
                </a>
                {/* <a href="#" className="btn-ghost-about">Start a project →</a> */}
              </div>
            </div>
          </div>

          <div className="hero-right-about" id="hero-right-about">
            <div className="stat-item-about">
              <div className="stat-num-about">140+</div>
              <div className="stat-label-about">Projects shipped</div>
            </div>
            <div className="stat-divider-about"></div>
            <div className="stat-item-about">
              <div className="stat-num-about">7yr</div>
              <div className="stat-label-about">In the game</div>
            </div>
            <div className="stat-divider-about"></div>
            <div className="stat-item-about">
              <div className="stat-num-about">98%</div>
              <div className="stat-label-about">Client retention</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator-about" id="scroll-indicator-about">
          {/* <span className="scroll-text-about">Scroll</span> */}
          <div className="scroll-line-about"></div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="marquee-strip-about">
        <div className="marquee-track-about">
          <div className="marquee-item-about"><span>Brand Identity</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Web Experiences</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Product Design</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Creative Tech</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Motion Design</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Design Systems</span><div className="dot-about"></div></div>
          {/* Duplicated for loop */}
          <div className="marquee-item-about"><span>Brand Identity</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Web Experiences</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Product Design</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Creative Tech</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Motion Design</span><div className="dot-about"></div></div>
          <div className="marquee-item-about"><span>Design Systems</span><div className="dot-about"></div></div>
        </div>
      </div>
    </>
  );
};

export default AboutHero;
