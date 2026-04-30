
// // export default HomeCTA;
// "use client";

// import React, { FC, useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const HomeCTA: FC = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const headlineRef = useRef<HTMLHeadingElement>(null);
//   const subtextRef = useRef<HTMLParagraphElement>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // ── Canvas Logic: Keeping shapes but making background transparent ──────
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animId: number;
//     let t = 0;
//     const mouse = { x: 0, y: 0 };

//     const resize = () => {
//       if (!canvas || !sectionRef.current) return;
//       canvas.width = sectionRef.current.offsetWidth;
//       canvas.height = sectionRef.current.offsetHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     const onMouseMove = (e: MouseEvent) => {
//       if (!sectionRef.current) return;
//       const r = sectionRef.current.getBoundingClientRect();
//       mouse.x = e.clientX - r.left;
//       mouse.y = e.clientY - r.top;
//     };
//     sectionRef.current?.addEventListener("mousemove", onMouseMove);

//     const loop = () => {
//       animId = requestAnimationFrame(loop);
//       const W = canvas.width;
//       const H = canvas.height;
//       t += 0.012;

//       ctx.clearRect(0, 0, W, H);
//       // Background is now handled by CSS

//       // Floating geometric shapes (keeping these as brand elements)
//       const shapes = [
//         { x: W * 0.12, y: H * 0.2, s: 70, rot: t * 0.4, c: '#c0392b', alpha: 0.08 },
//         { x: W * 0.88, y: H * 0.75, s: 90, rot: -t * 0.3, c: '#1a1a1a', alpha: 0.05 },
//         { x: W * 0.08, y: H * 0.75, s: 40, rot: t * 0.7, c: '#c0392b', alpha: 0.1 },
//         { x: W * 0.92, y: H * 0.2, s: 55, rot: -t * 0.5, c: '#1a1a1a', alpha: 0.07 },
//       ];

//       shapes.forEach(sh => {
//         ctx.save();
//         ctx.globalAlpha = sh.alpha;
//         ctx.translate(sh.x, sh.y);
//         ctx.rotate(sh.rot);
//         ctx.fillStyle = sh.c;
//         ctx.fillRect(-sh.s / 2, -sh.s / 2, sh.s, sh.s);
//         ctx.restore();
//       });

//       // Mouse-reactive circle
//       ctx.beginPath();
//       ctx.arc(mouse.x, mouse.y, 60 + Math.sin(t * 3) * 10, 0, Math.PI * 2);
//       ctx.strokeStyle = 'rgba(1, 88, 113, 0.1)';
//       ctx.lineWidth = 1;
//       ctx.stroke();
//     };
//     loop();

//     // ── GSAP Entrance ────────────────────────────────────────────────────────
//     const ctx_gsap = gsap.context(() => {
//       gsap.fromTo([headlineRef.current, subtextRef.current, ".btn2-wrap"],
//         { opacity: 0, y: 24 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.7,
//           stagger: 0.1,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 70%",
//           }
//         }
//       );
//     }, sectionRef);

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("resize", resize);
//       ctx_gsap.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cta-ocean-section"
//     >
//       {/* Ocean Background Layers */}
//       <div className="ocean">
//         <div className="wave"></div>
//         <div className="wave"></div>
//       </div>

//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

//       {/* <span className="absolute top-4 left-4 bg-[rgba(255,255,255,0.4)] backdrop-blur-md border border-[rgba(0,0,0,0.1)] px-3.5 py-1.5 rounded-full text-[11px] text-[#015871] z-20 tracking-wider font-bold">
//         Ocean Pulse — Fluid Motion
//       </span> */}

//       <div className="relative z-10 text-center">
//         <h2 ref={headlineRef} className="font-['Arial_Black',sans-serif] text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-[#1a1a1a] mb-4">
//           Build things<br />
//           that <em className="not-italic text-[#c0392b]">actually</em><br />
//           matter.
//         </h2>

//         <p ref={subtextRef} className="text-[#015871]/60 text-[13px] mb-10 tracking-wider font-bold">
//           No fluff. Just results.
//         </p>

//         <div className="btn2-wrap inline-block">
//           <button className="brutalist-btn">
//             Get started <span className="btn2-arrow"></span>
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .cta-ocean-section {
//           background: radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%);
//         }

//         .ocean { 
//           height: 100%; /* Height adjusted for full section background */
//           width: 100%;
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           background: transparent;
//           pointer-events: none;
//         }

//         .wave {
//           background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x; 
//           position: absolute;
//           bottom: 0; /* Changed to bottom for pinning */
//           width: 6400px;
//           height: 198px;
//           animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
//           transform: translate3d(0, 0, 0);
//           opacity: 0.6;
//         }

//         .wave:nth-of-type(2) {
//           bottom: -15px;
//           animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
//           opacity: 1;
//           filter: hue-rotate(15deg) brightness(0.9);
//         }

//         @keyframes wave {
//           0% { margin-left: 0; }
//           100% { margin-left: -1600px; }
//         }

//         @keyframes swell {
//           0%, 100% { transform: translate3d(0,-25px,0); }
//           50% { transform: translate3d(0,5px,0); }
//         }

//         .brutalist-btn {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           gap: 12px;
//           padding: 18px 40px;
//           background: #1a1a1a;
//           color: #fff;
//           border: none;
//           border-radius: 0;
//           font-size: 14px;
//           font-weight: 700;
//           letter-spacing: 0.05em;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .brutalist-btn:hover {
//           background: #c0392b;
//           transform: translate(-2px, -2px);
//           box-shadow: 4px 4px 0 #1a1a1a;
//         }

//         .btn2-arrow {
//           width: 20px;
//           height: 2px;
//           background: currentColor;
//           position: relative;
//           transition: width 0.3s;
//         }

//         .btn2-arrow::after {
//           content: '';
//           position: absolute;
//           right: -1px;
//           top: -3px;
//           width: 8px;
//           height: 8px;
//           border-top: 2px solid;
//           border-right: 2px solid;
//           transform: rotate(45deg);
//         }

//         .brutalist-btn:hover .btn2-arrow {
//           width: 32px;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HomeCTA;

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function EliteCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    // Store original text to prevent double-splitting on re-mount
    const originalText = "Build products people actually remember";
    if (headingRef.current) {
      headingRef.current.innerHTML = originalText;
    }

    const ctx = gsap.context(() => {
      // 🟡 Spotlight follow
      const move = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlight, {
          x,
          y,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      section.addEventListener("mousemove", move);

      // 🔥 TEXT ANIMATION TIMELINE
      const tl = gsap.timeline({ delay: 0.2 });

      // split heading into words
      const words = headingRef.current?.innerText.split(" ") || [];
      if (headingRef.current) {
        headingRef.current.innerHTML = words
          .map((w) => `<span class="inline-block opacity-0 translate-y-6">${w}&nbsp;</span>`)
          .join("");
      }

      const spans = headingRef.current?.querySelectorAll("span");

      if (spans) {
        tl.to(spans, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        });
      }
      
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
        "-=0.3"
      );

      // ✨ subtle parallax
      gsap.to(section, {
        backgroundPosition: "50% 60%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // 🧹 Clean up everything (listeners, timelines, scrolltriggers)
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600px] flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* grain */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')]" />

      {/* content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h2
          ref={headingRef}
          className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight"
        >
          Build products people actually remember
        </h2>

        <p ref={subRef} className="mt-4 text-gray-400">
          Design. Development. Growth — all in one place.
        </p>

        <Link href="/services">
          <button
            ref={btnRef}
            className="mt-10 px-10 py-4 border border-white/20 rounded-full relative overflow-hidden group"
          >
            <span className="relative z-10">Start Your Project</span>

            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
          </button>
        </Link>
      </div>
    </section>
  );
}