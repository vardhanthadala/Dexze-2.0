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
const TestimonialSection: FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-32 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <RevealSection>
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">What clients say</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-display">
            Trusted by builders
          </h2>
        </RevealSection>

        <div className="mt-16 relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium tracking-tight">
                "{TESTIMONIALS[active].quote}"
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                  {TESTIMONIALS[active].initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{TESTIMONIALS[active].author}</p>
                  <p className="text-xs text-gray-400">{TESTIMONIALS[active].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-indigo-500" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const scrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <main className="bg-[#fafafa] antialiased overflow-x-hidden">

      {/* ── Custom font injection (no next/font needed) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        body, * { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0f2ff] via-white to-[#fafafa]">
        {/* Three.js canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <HeroCanvas />
        </div>

        {/* Soft radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-indigo-100 shadow-sm text-xs font-semibold text-indigo-500 tracking-wide uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Our story
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-gray-900 tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.04 }}
          >
            We build what
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              others imagine.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-gray-500 max-w-xl leading-relaxed"
          >
            A design-engineering studio crafting products people actually want to use.
            Precision, craft, and velocity — all three, always.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(99,102,241,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollDown}
              className="px-8 py-3.5 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 transition-colors hover:bg-indigo-700"
            >
              Explore more ↓
            </motion.button>
            <motion.a
              whileHover={{ x: 4 }}
              href="#contact"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              Start a project →
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 cursor-pointer"
          onClick={scrollDown}
        >
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="py-20 px-6 bg-gradient-to-b from-[#fafafa] to-white"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} active={statsInView} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <RevealSection>
              <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Who we are</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-display leading-tight">
                A studio obsessed
                <br />with craft.
              </h2>
            </RevealSection>
            <RevealSection delay={0.12} className="mt-6">
              <p className="text-gray-500 leading-relaxed text-base">
                We started in 2019 with a simple thesis: most software is boring because
                the teams building it stopped caring about the people using it. We care deeply.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed text-base">
                Our mission is to make complex products feel effortless — and effortless
                products feel inevitable. We partner with startups and growth-stage companies
                to design, build, and launch.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed text-base">
                <strong className="text-gray-900 font-medium">Our vision:</strong> a world where
                every product interaction respects and delights the people behind the screen.
              </p>
            </RevealSection>

            <RevealSection delay={0.2} className="mt-8">
              <motion.a
                whileHover={{ x: 6 }}
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Read our story →
              </motion.a>
            </RevealSection>
          </div>

          {/* Visual */}
          <RevealSection delay={0.1} className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 aspect-[4/3] flex items-center justify-center"
            >
              {/* Decorative illustration placeholder */}
              <div className="relative w-full h-full flex items-center justify-center p-10">
                {/* Abstract geometric composition */}
                <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" aria-hidden="true">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="150" r="120" fill="url(#g1)" />
                  <circle cx="280" cy="100" r="70" fill="url(#g2)" />
                  <rect x="60" y="80" width="100" height="100" rx="24" fill="#6366f1" fillOpacity="0.12" transform="rotate(-15 110 130)" />
                  <rect x="240" y="160" width="80" height="80" rx="18" fill="#8b5cf6" fillOpacity="0.15" transform="rotate(20 280 200)" />
                  <circle cx="100" cy="200" r="30" fill="#ec4899" fillOpacity="0.1" />
                  <circle cx="320" cy="220" r="20" fill="#6366f1" fillOpacity="0.15" />
                  {/* Grid dots */}
                  {[...Array(8)].map((_, col) =>
                    [...Array(5)].map((_, row) => (
                      <circle
                        key={`${col}-${row}`}
                        cx={40 + col * 48}
                        cy={40 + row * 56}
                        r="2"
                        fill="#6366f1"
                        fillOpacity="0.15"
                      />
                    ))
                  )}
                </svg>
              </div>
            </motion.div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100 flex items-center gap-3"
            >
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Top Studio 2024</p>
                <p className="text-xs text-gray-400">Dribbble × Awwwards</p>
              </div>
            </motion.div>
          </RevealSection>
        </div>
      </section>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((card, i) => (
              <ValueCardItem key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">The people</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-display">
              Meet the team
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-md mx-auto">
              Small on headcount, enormous on output. Every person here is a craftsperson.
            </p>
          </RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-20">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">How we got here</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-display">
              Our journey
            </h2>
          </RevealSection>
          {TIMELINE.map((m, i) => (
            <TimelineItem key={m.year} milestone={m} index={i} total={TIMELINE.length} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <TestimonialSection />

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