"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhoWeAre.css";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // ── GSAP ENTRANCE ANIMATIONS ──
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    });

    tl.fromTo(".eyebrow-who", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo(".eyebrow-line-who", { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, "-=0.6")
      .fromTo(".hero-title-who", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.5")
      .fromTo(".body-text-who", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.2 }, "-=0.6")
      .fromTo(".vision-line-who", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .fromTo(".cta-row-who", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(".stat-who", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.5");

    // Parallax
    gsap.to(contentRef.current, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // Stat counter animation (triggered by scroll)
    const stats = [
      { target: 80, suffix: "+", selector: ".stat-who:nth-child(1) .stat-number-who" },
      { target: 2019, suffix: "", selector: ".stat-who:nth-child(2) .stat-number-who" },
      { target: 12, suffix: "", selector: ".stat-who:nth-child(3) .stat-number-who" }
    ];

    stats.forEach(s => {
      const el = section.querySelector(s.selector);
      if (!el) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        onEnter: () => {
          let val = s.target > 100 ? s.target - 50 : 0;
          gsap.to({ value: val }, {
            value: s.target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
              el.innerHTML = Math.round(this.targets()[0].value) + s.suffix + (s.target === 80 ? '<span class="sup-who">+</span>' : '');
            }
          });
        }
      });
    });

  }, []);

  return (
    <section className="section-who" ref={sectionRef} aria-label="Who We Are">
      <div className="noise-overlay-who" aria-hidden="true" />
      
      {/* Centered Content */}
      <div className="content-panel-who" ref={contentRef}>
        <div className="eyebrow-who">
          <div className="eyebrow-line-who" />
          <span className="eyebrow-text-who">Who We Are</span>
        </div>

        <h2 className="hero-title-who" ref={titleRef}>
          A studio <em>obsessed</em> with craft.
        </h2>

        <p className="body-text-who">
          We started in 2019 with a simple thesis: most software is boring because the teams building it stopped caring about the people using it. <strong>We care deeply.</strong>
        </p>

        <p className="body-text-who">
          Our mission is to make complex products feel effortless — and effortless products feel inevitable. We partner with startups and growth-stage companies to design, build, and launch.
        </p>

        <blockquote className="vision-line-who">
          A world where every product interaction respects and delights the people behind the screen.
        </blockquote>

        <div className="cta-row-who">
          <button className="btn-primary-who">
            Read our story <span className="arrow-who">↗</span>
          </button>
          <button className="btn-text-who">See our work</button>
        </div>

        <div className="stats-row-who">
          <div className="stat-who">
            <div className="stat-number-who">0+<span className="sup-who">+</span></div>
            <div className="stat-label-who">Products shipped</div>
          </div>
          <div className="stat-who">
            <div className="stat-number-who">0</div>
            <div className="stat-label-who">Year founded</div>
          </div>
          <div className="stat-who">
            <div className="stat-number-who">0</div>
            <div className="stat-label-who">Team members</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
