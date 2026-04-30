"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TestimonialsSection.css";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "Working with this team fundamentally changed how we think about product. They don't just ship — they make you think differently.",
    author: "Marcus Weil",
    company: "Founder, Archway Labs",
    initials: "MW",
  },
  {
    quote:
      "The attention to detail is unlike anything I've seen. Every sprint, every review — they bring the same intensity.",
    author: "Amara Osei",
    company: "CTO, Meridian Health",
    initials: "AO",
  },
  {
    quote:
      "They became an extension of our team in weeks. Communication, speed, craft — exceptional on all fronts.",
    author: "Lena Fischer",
    company: "VP Product, Vanta Systems",
    initials: "LF",
  },
];

// ── Three.js-like Particle Canvas ──
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let animId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
      color: string;
    }[] = [];

    const colors = [
      "99, 102, 241",  // indigo
      "139, 92, 246",  // violet
      "236, 72, 153",  // pink
      "59, 130, 246",  // blue
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((W * H) / 12000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="testimonials-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// ── Main Component ──
export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector(".testimonials-header"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    gsap.fromTo(
      section.querySelector(".testimonial-card-wrapper"),
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );

    gsap.fromTo(
      section.querySelector(".testimonial-dots"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );
  }, []);

  const cardVariants = {
    enter: { opacity: 0, y: 30, scale: 0.96, filter: "blur(4px)" },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.96,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="testimonials-section" ref={sectionRef}>
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Noise Grain */}
      <div className="testimonials-noise" aria-hidden="true" />

      {/* Content */}
      <div className="testimonials-content">
        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">What clients say</span>
          <h2 className="testimonials-title">
            Trusted by builders
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-card-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="testimonial-card"
            >
              <span className="testimonial-quote-icon">"</span>

              {/* Stars */}
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="testimonial-star"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 300 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="testimonial-quote">
                "{TESTIMONIALS[active].quote}"
              </blockquote>

              {/* Author */}
              <div className="testimonial-author-row">
                <motion.div
                  className="testimonial-avatar"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {TESTIMONIALS[active].initials}
                </motion.div>
                <div className="testimonial-author-info">
                  <div className="testimonial-author-name">
                    {TESTIMONIALS[active].author}
                  </div>
                  <div className="testimonial-author-company">
                    {TESTIMONIALS[active].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className={`testimonial-dot ${i === active ? "active" : ""}`}
              aria-label={`Testimonial ${i + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              layout
            />
          ))}
        </div>

        {/* Trust Badge */}
        <div className="testimonial-trust-badge">
          Rated 4.9/5 across 80+ projects
        </div>
      </div>
    </section>
  );
}
