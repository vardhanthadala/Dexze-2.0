"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

// ── SVG underline variants ───────────────────────────────────────────────────
const SVG_VARIANTS = [
  `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
  `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
  `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
  `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
  `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
  `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
];

const SERVICES = [
  { label: "Branding", desc: "Identity & visual systems" },
  { label: "UI/UX Design", desc: "Interfaces people love" },
  { label: "Web Development", desc: "Next.js, React & beyond" },
  { label: "Mobile Apps", desc: "iOS & Android" },
  { label: "Motion Design", desc: "Animation & storytelling" },
  { label: "Strategy", desc: "Product & growth" },
];

interface DrawLinkProps {
  href: string;
  children: React.ReactNode;
  svgIndexRef: React.MutableRefObject<number>;
  className?: string;
  onClick?: () => void;
}

function DrawLink({ href, children, svgIndexRef, className = "", onClick }: DrawLinkProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<"idle" | "enter" | "leave">("idle");
  const progressRef = useRef(0);

  const animatePath = useCallback(
    (direction: "enter" | "leave") => {
      const box = boxRef.current;
      if (!box) return;

      if (direction === "enter") {
        const idx = svgIndexRef.current % SVG_VARIANTS.length;
        svgIndexRef.current = idx + 1;
        box.innerHTML = SVG_VARIANTS[idx];
        const svg = box.querySelector("svg");
        const path = box.querySelector("path");
        if (svg && path) {
          svg.setAttribute("class", "absolute inset-0 w-full h-full overflow-visible");
          svg.setAttribute("preserveAspectRatio", "none");
          path.setAttribute("stroke", "currentColor");
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len}`;
          progressRef.current = 0;
          phaseRef.current = "enter";

          const start = performance.now();
          const dur = 480;
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            path.style.strokeDashoffset = `${len * (1 - ease)}`;
            progressRef.current = ease;
            if (t < 1) animFrameRef.current = requestAnimationFrame(tick);
            else phaseRef.current = "idle";
          };
          animFrameRef.current = requestAnimationFrame(tick);
        }
      } else {
        const path = box.querySelector("path");
        if (!path) return;
        phaseRef.current = "leave";
        const len = path.getTotalLength();
        const startProgress = progressRef.current;
        const start = performance.now();
        const dur = 480;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const from = startProgress * len;
          path.style.strokeDashoffset = `${-from * ease + len * ease}`;
          path.style.strokeDasharray = `${len}`;
          if (t < 1) animFrameRef.current = requestAnimationFrame(tick);
          else {
            box.innerHTML = "";
            phaseRef.current = "idle";
          }
        };
        animFrameRef.current = requestAnimationFrame(tick);
      }
    },
    [svgIndexRef]
  );

  const handleEnter = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animatePath("enter");
  }, [animatePath]);

  const handleLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animatePath("leave");
  }, [animatePath]);

  return (
    <a
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative inline-block text-[#000000] no-underline group ${className}`}
    >
      <span className="block font-medium leading-tight">{children}</span>
      <div
        ref={boxRef}
        className="relative w-full h-[0.5em] text-[#ff0000] pointer-events-none"
      />
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const svgIndex = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle dropdown hover logic with delay
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150); // 150ms delay to prevent flicker
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'PP Neue Montreal';
          src: url('https://cdn.prod.website-files.com/6819ed8312518f61b84824df/6819ed8312518f61b84825ba_PPNeueMontreal-Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        .nav-font { font-family: 'PP Neue Montreal', Arial, sans-serif; }
        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        @keyframes dropFade {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown-animate { animation: dropFade 0.22s ease forwards; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-animate { animation: slideDown 0.28s ease forwards; }
        .ham-line { transition: transform 0.3s ease, opacity 0.3s ease; }
        .ham-open .ham-top { transform: translateY(6px) rotate(45deg); }
        .ham-open .ham-mid { opacity: 0; }
        .ham-open .ham-bot { transform: translateY(-6px) rotate(-45deg); }
      `}</style>

      <nav
        className={`nav-font fixed top-0 left-0 right-0 z-[300] transition-all duration-300
          ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"}`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="/" className="shrink-0 flex items-center">
              <Image src="/logo.png" alt="Logo" width={150} height={50} className="h-10 w-auto object-contain" priority />
            </a>

            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              <DrawLink href="/" svgIndexRef={svgIndex}>Home</DrawLink>
              <DrawLink href="/about" svgIndexRef={svgIndex}>About</DrawLink>

              <div 
                ref={dropdownRef} 
                className="relative h-full flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 text-[#000000] font-medium bg-transparent border-none p-0 group cursor-pointer"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  <span className="relative">
                    Services
                    <span className="absolute -bottom-1 left-0 w-1.5 h-1.5 rounded-full bg-[#ff0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" className={`mt-0.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}>
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {servicesOpen && (
                  <div className="dropdown-animate absolute top-full left-1/2 -translate-x-1/2 w-[22rem]">
                    <div className="pt-3">
                      <div className="bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-black/5 bg-gray-50/50">
                          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest m-0">What we do</p>
                        </div>
                        <div className="services-grid p-2">
                          {SERVICES.map((s) => (
                            <a
                              key={s.label}
                              href={`/services/${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                              className="group flex flex-col gap-0.5 p-3 rounded-xl hover:bg-black/5 transition-colors no-underline"
                            >
                              <span className="text-[14px] font-medium text-black group-hover:text-[#ff0000] transition-colors">{s.label}</span>
                              <span className="text-[11px] text-black/50 leading-tight">{s.desc}</span>
                            </a>
                          ))}
                        </div>
                        <div className="px-5 py-3 border-t border-black/5">
                          <a href="/services" className="text-[12px] font-bold text-[#ff0000] no-underline hover:underline">View all services →</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DrawLink href="/work" svgIndexRef={svgIndex}>Work</DrawLink>
              
              <a href="/contact-us" className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-[#ff0000] transition-all transform hover:scale-105 active:scale-95">Contact Us</a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 ${mobileOpen ? "ham-open" : ""}`}
            >
              <span className="ham-line ham-top w-6 h-0.5 bg-black" />
              <span className="ham-line ham-mid w-6 h-0.5 bg-black" />
              <span className="ham-line ham-bot w-6 h-0.5 bg-black" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden mobile-animate bg-white border-t px-6 py-8 h-screen overflow-y-auto">
            <div className="flex flex-col gap-6">
              <a href="/" className="text-2xl font-bold text-black no-underline">Home</a>
              <a href="/about" className="text-2xl font-bold text-black no-underline">About</a>
              <div>
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex justify-between items-center text-2xl font-bold text-black bg-transparent border-none p-0">
                  Services
                  <svg width="20" height="20" className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>
                    <path d="M4 7L10 13L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="mt-4 pl-4 flex flex-col gap-4 border-l-2 border-red-500">
                    {SERVICES.map((s) => (
                      <a key={s.label} href="/services" className="flex flex-col no-underline">
                        <span className="text-lg font-medium text-black">{s.label}</span>
                        <span className="text-sm text-black/50">{s.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="/work" className="text-2xl font-bold text-black no-underline">Work</a>
              <a href="/contact" className="mt-4 w-full py-4 bg-black text-white text-center rounded-2xl font-bold no-underline">Contact Us</a>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16 lg:h-20" />
    </>
  );
}