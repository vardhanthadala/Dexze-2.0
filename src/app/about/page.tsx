// import Image from "next/image";

// export default function AboutPage() {
//   return (
//     <div className="w-full bg-[#efefef]">
      
//       {/* HERO (FULL WIDTH) */}
//       <section className="relative w-full h-[320px]">
//         <Image
//           src="/about-bg.jpg"
//           alt="About"
//           fill
//           priority
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
//           <h1 className="text-white text-4xl md:text-5xl font-semibold mb-2">
//             About us
//           </h1>
//           <p className="text-gray-200 max-w-md text-sm">
//             Sed porttitor lectus nibh donec rutrum congue leo eget malesuada.
//             Donec rutrum congue leo eget malesuada
//           </p>
//         </div>
//       </section>

//       {/* CONTENT WRAPPER (still centered but inside full width) */}
//       <section className="relative px-6 md:px-16 lg:px-24 py-20">
        
//         {/* LEFT CARD */}
//         <div className="bg-white shadow-lg rounded-md p-8 md:w-[42%] relative z-10 -mt-32">
//           <h2 className="text-xl font-semibold mb-3">
//             Elegant Themes Company
//           </h2>

//           <p className="text-gray-500 text-sm mb-4">
//             Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget
//             consectetur sed, convallis at tellus. Curabitur aliquet quam id dui
//             posuere blandit.
//           </p>

//           <p className="italic font-semibold text-gray-700 mb-4">
//             Sed porttitor lectus nibh vivamus magna justo, lacinia eget
//             consectetur sed, convallis.
//           </p>

//           <p className="text-gray-500 text-sm">
//             Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget
//             consectetur sed, convallis at tellus. Curabitur aliquet quam id dui
//             posuere blandit. Donec sollicitudin molestie malesuada.
//           </p>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="absolute right-6 md:right-16 lg:right-24 top-10 w-[50%] h-[280px] hidden md:block">
//           <Image
//             src="/team.jpg"
//             alt="Team"
//             fill
//             className="object-cover rounded-md shadow-md"
//           />
//         </div>
//       </section>

//       {/* BOTTOM SECTION */}
//       <section className="bg-[#f5f5f5] text-center px-6 md:px-16 lg:px-24 py-24">
        
//         <h3 className="text-gray-300 text-3xl md:text-4xl font-bold tracking-wide">
//           LOVELY
//         </h3>
//         <h3 className="text-gray-300 text-3xl md:text-4xl font-bold tracking-wide mb-2">
//           CUSTOMERS
//         </h3>

//         <p className="text-xl font-semibold mb-6">332,967</p>

//         <p className="text-gray-500 text-sm max-w-md mx-auto mb-10">
//           Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget
//           consectetur sed, convallis at tellus. Curabitur aliquet quam id dui
//           posuere blandit.
//         </p>

//         {/* TESTIMONIAL CARD */}
//         <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto">
//           <p className="italic font-semibold text-gray-700">
//             Sed porttitor lectus nibh vivamus magna justo, lacinia eget
//             consectetur sed, convallis.
//           </p>
//           <p className="text-sm text-gray-500 mt-3">
//             Sed porttitor lectus nibh. Vivamus magna justo.
//           </p>
//         </div>

//       </section>
//     </div>
//   );
// }
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  FC,
  ReactNode,
} from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}
interface ValueCard {
  icon: string;
  title: string;
  description: string;
}
interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
  twitter?: string;
  linkedin?: string;
}
interface Milestone {
  year: string;
  title: string;
  description: string;
}
interface Testimonial {
  quote: string;
  author: string;
  company: string;
  initials: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { value: 240, suffix: "+", label: "Projects Completed", icon: "◈" },
  { value: 80, suffix: "+", label: "Companies Worked With", icon: "◎" },
  { value: 36, suffix: "", label: "Team Members", icon: "◉" },
];

const VALUES: ValueCard[] = [
  {
    icon: "⬡",
    title: "Craft-first thinking",
    description:
      "We obsess over every pixel, interaction, and line of code. Quality is never a checkbox — it's the foundation.",
  },
  {
    icon: "◈",
    title: "Radical transparency",
    description:
      "No jargon. No hidden processes. We communicate clearly, share progress openly, and own our mistakes.",
  },
  {
    icon: "◎",
    title: "Velocity with intent",
    description:
      "Speed matters, but never at the cost of direction. We move fast with a clear map in hand.",
  },
  {
    icon: "⬟",
    title: "Human-centered design",
    description:
      "Real people use what we build. Empathy isn't a soft skill here — it's a hard requirement.",
  },
  {
    icon: "◉",
    title: "Continuous learning",
    description:
      "The best teams never stop growing. We invest in knowledge, experimentation, and curiosity.",
  },
  {
    icon: "⬢",
    title: "Long-term partnership",
    description:
      "We're not a vendor. We're collaborators invested in your success well beyond the launch date.",
  },
];

const TEAM: TeamMember[] = [
  { name: "Arjun Mehta", role: "Co-founder & CEO", initials: "AM", color: "#e8f0fe", twitter: "#", linkedin: "#" },
  { name: "Priya Nair", role: "Head of Design", initials: "PN", color: "#fce8f3", twitter: "#", linkedin: "#" },
  { name: "Dev Sharma", role: "Lead Engineer", initials: "DS", color: "#e8fdf0", twitter: "#", linkedin: "#" },
  { name: "Zara Khan", role: "Product Strategy", initials: "ZK", color: "#fff8e8", twitter: "#", linkedin: "#" },
];

const TIMELINE: Milestone[] = [
  { year: "2019", title: "Founded in a bedroom", description: "Two engineers and a whiteboard. The seed of something bigger." },
  { year: "2020", title: "First 10 clients", description: "Bootstrapped to profitability. No VC, no shortcuts." },
  { year: "2021", title: "Team of 12", description: "Scaled design and engineering. Opened our first studio." },
  { year: "2022", title: "Series A · $6M", description: "Raised to accelerate product and expand globally." },
  { year: "2023", title: "100+ projects shipped", description: "Crossed a milestone. Hired our 30th team member." },
  { year: "2024", title: "Global reach", description: "Clients across 18 countries. Building what's next." },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Working with this team fundamentally changed how we think about product. They don't just ship — they make you think differently.",
    author: "Marcus Weil",
    company: "Founder, Archway Labs",
    initials: "MW",
  },
  {
    quote: "The attention to detail is unlike anything I've seen. Every sprint, every review — they bring the same intensity.",
    author: "Amara Osei",
    company: "CTO, Meridian Health",
    initials: "AO",
  },
  {
    quote: "They became an extension of our team in weeks. Communication, speed, craft — exceptional on all fronts.",
    author: "Lena Fischer",
    company: "VP Product, Vanta Systems",
    initials: "LF",
  },
];

// ─── Utility: Count-up hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ─── Three.js Hero Canvas ─────────────────────────────────────────────────────
const HeroCanvas: FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let renderer: any, scene: any, camera: any;
    let particles: any, lines: any;
    let mouseX = 0, mouseY = 0;

    const init = async () => {
      const THREE = await import("three");
      if (!mountRef.current) return;

      const W = mountRef.current.clientWidth;
      const H = mountRef.current.clientHeight;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
      camera.position.z = 28;

      // ── Floating particle field ──
      const count = 220;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const speeds = new Float32Array(count);
      const offsets = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 60;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        sizes[i]   = Math.random() * 3.5 + 0.8;
        speeds[i]  = Math.random() * 0.4 + 0.1;
        offsets[i] = Math.random() * Math.PI * 2;
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) } },
        vertexShader: `
          attribute float aSize;
          uniform float uTime;
          uniform vec2 uMouse;
          void main() {
            vec3 pos = position;
            float wave = sin(pos.x * 0.18 + uTime * 0.6) * 0.8
                       + cos(pos.y * 0.22 + uTime * 0.4) * 0.6;
            pos.y += wave;
            pos.x += cos(uTime * 0.3 + pos.z) * 0.25;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * (300.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.1, d);
            gl_FragColor = vec4(0.43, 0.55, 0.85, a * 0.45);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: 2, // AdditiveBlending
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // ── Soft mesh rings ──
      const ringGeo = new THREE.TorusGeometry(10, 0.04, 8, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6b84d4, transparent: true, opacity: 0.12
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      scene.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(15, 0.025, 8, 140);
      const ring2 = new THREE.Mesh(ringGeo2, ringMat.clone());
      (ring2.material as any).opacity = 0.07;
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.z = Math.PI / 6;
      scene.add(ring2);

      const clock = new THREE.Clock();

      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        if (!mountRef.current) return;
        const W2 = mountRef.current.clientWidth;
        const H2 = mountRef.current.clientHeight;
        camera.aspect = W2 / H2;
        camera.updateProjectionMatrix();
        renderer.setSize(W2, H2);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        mat.uniforms.uTime.value = t;
        mat.uniforms.uMouse.value.set(mouseX, mouseY);
        particles.rotation.y = t * 0.03 + mouseX * 0.08;
        particles.rotation.x = mouseY * 0.06;
        ring1.rotation.z = t * 0.07;
        ring1.rotation.y = t * 0.04;
        ring2.rotation.z = -t * 0.05;
        ring2.rotation.x = t * 0.03;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(animId);
      cleanup?.();
      if (renderer) { renderer.dispose(); renderer.domElement.remove(); }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

// ─── Stat Counter Card ────────────────────────────────────────────────────────
const StatCard: FC<{ stat: StatItem; index: number; active: boolean }> = ({
  stat, index, active
}) => {
  const count = useCountUp(stat.value, 2000 + index * 200, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(100,120,200,0.12)" }}
      className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-default"
      style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
    >
      <span className="text-3xl mb-3 text-indigo-400">{stat.icon}</span>
      <span className="text-5xl font-bold tracking-tight text-gray-900 font-display">
        {count}{stat.suffix}
      </span>
      <span className="mt-2 text-sm text-gray-400 font-medium tracking-wide uppercase">
        {stat.label}
      </span>
    </motion.div>
  );
};

// ─── Section wrapper with scroll reveal ──────────────────────────────────────
const RevealSection: FC<{ children: ReactNode; className?: string; delay?: number }> = ({
  children, className = "", delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Value Card ───────────────────────────────────────────────────────────────
const ValueCardItem: FC<{ card: ValueCard; index: number }> = ({ card, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        boxShadow: "0 24px 60px rgba(99,102,241,0.10)",
        borderColor: "rgba(99,102,241,0.25)",
      }}
      className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 cursor-default"
    >
      <span className="text-3xl mb-5 block text-indigo-400 group-hover:text-indigo-600 transition-colors">
        {card.icon}
      </span>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">{card.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
    </motion.div>
  );
};

// ─── Team Card ────────────────────────────────────────────────────────────────
const TeamCard: FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-default"
    >
      {/* Avatar */}
      <div
        className="relative h-52 flex items-center justify-center transition-all duration-500"
        style={{ background: hovered ? "#f0f0ff" : member.color }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1, rotate: hovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-2xl font-bold text-gray-700 font-display"
        >
          {member.initials}
        </motion.div>
        {/* Social icons on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute bottom-4 left-0 right-0 flex justify-center gap-3"
        >
          <a
            href={member.twitter}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-gray-500 hover:text-indigo-500 text-xs"
            aria-label={`${member.name} Twitter`}
          >
            𝕏
          </a>
          <a
            href={member.linkedin}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-gray-500 hover:text-indigo-500 text-xs"
            aria-label={`${member.name} LinkedIn`}
          >
            in
          </a>
        </motion.div>
      </div>
      <div className="p-6">
        <p className="font-semibold text-gray-900 tracking-tight">{member.name}</p>
        <p className="text-sm text-gray-400 mt-1">{member.role}</p>
      </div>
    </motion.div>
  );
};

// ─── Timeline Item ────────────────────────────────────────────────────────────
const TimelineItem: FC<{ milestone: Milestone; index: number; total: number }> = ({
  milestone, index, total
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0 mb-12 last:mb-0">
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`flex-1 text-right pr-8 ${isLeft ? "" : "opacity-0 pointer-events-none"}`}
      >
        {isLeft && (
          <>
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">{milestone.year}</span>
            <h3 className="text-base font-semibold text-gray-900 mt-1">{milestone.title}</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{milestone.description}</p>
          </>
        )}
      </motion.div>

      {/* Center dot + line */}
      <div className="flex flex-col items-center w-8 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-indigo-100 z-10 flex-shrink-0"
        />
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ originY: 0 }}
            className="w-px flex-1 bg-gradient-to-b from-indigo-200 to-transparent min-h-[60px] mt-2"
          />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`flex-1 pl-8 ${!isLeft ? "" : "opacity-0 pointer-events-none"}`}
      >
        {!isLeft && (
          <>
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">{milestone.year}</span>
            <h3 className="text-base font-semibold text-gray-900 mt-1">{milestone.title}</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{milestone.description}</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

// ─── Testimonial Carousel ─────────────────────────────────────────────────────


import AboutHero from "./AboutHero";
import WhoWeAre from "./WhoWeAre";
import BlogSlider from "./BlogSlider";
import TeamSection from "./TeamSection";
import TimelineSection from "./TimelineSection";
import TestimonialsSection from "./TestimonialsSection";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const scrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <main className="bg-[#fafafa] antialiased overflow-x-hidden">

      {/* ── Custom font injection ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,700&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        body, * { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO (Replaced with new high-performance hero)
      ══════════════════════════════════════════════════════════ */}
      <AboutHero />


      {/* ══════════════════════════════════════════════════════════
          WHO WE ARE (New interactive section)
      ══════════════════════════════════════════════════════════ */}
      <WhoWeAre />

      {/* ══════════════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-[#f8f9ff]">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">What drives us</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-display">
              Values we live by
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
              Not posted in a Notion doc nobody reads. These shape every decision, every day.
            </p>
          </RevealSection>
          
          <BlogSlider />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════════ */}
      <div style={{ background: '#171717' }}>
        <TeamSection />
      </div>

      {/* ══════════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <TimelineSection />

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-40 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #fdf4ff 50%, #eff6ff 100%)",
        }}
      >
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-200 opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-200 opacity-20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <RevealSection>
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Ready when you are</span>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold text-gray-900 tracking-tight font-display leading-tight">
              Let's build something
              <br />
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                amazing together.
              </span>
            </h2>
            <p className="mt-6 text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
              Whether you're a founder with a napkin sketch or a team with a roadmap,
              we're ready to make it real.
            </p>
          </RevealSection>
          <RevealSection delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:hello@studio.com"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-colors"
            >
              Start a conversation →
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              See our work
            </motion.a>
          </RevealSection>
        </div>
      </section>

  
    </main>
  );
}