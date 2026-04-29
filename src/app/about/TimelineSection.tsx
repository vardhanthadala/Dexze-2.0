"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TimelineSection.css";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  {
    year: "2019",
    name: "Founded",
    desc: "Started with a bold vision to build software people actually love.",
    color: "#818cf8",
  },
  {
    year: "2020",
    name: "First Product",
    desc: "Shipped our debut app and landed our first paying customers.",
    color: "#f59e0b",
  },
  {
    year: "2021",
    name: "Team Growth",
    desc: "Expanded to 6 members — designers, engineers, and strategists.",
    color: "#22d3ee",
  },
  {
    year: "2022",
    name: "Award Season",
    desc: "Recognized by Awwwards and Dribbble for design excellence.",
    color: "#f43f5e",
  },
  {
    year: "2023",
    name: "Scale Up",
    desc: "Surpassed 50+ products shipped across multiple industries.",
    color: "#10b981",
  },
  {
    year: "2024",
    name: "Global Reach",
    desc: "Now serving clients across 8 countries on 3 continents.",
    color: "#a78bfa",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate header on scroll
    gsap.fromTo(
      section.querySelector(".timeline-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Animate the marquee viewport
    gsap.fromTo(
      section.querySelector(".tl-marquee-viewport"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      }
    );
  }, []);

  // Duplicate events for seamless infinite loop
  const duplicatedEvents = [...EVENTS, ...EVENTS];

  return (
    <div className="timeline-wrapper" ref={sectionRef}>
      <div className="timeline-inner">
        {/* Header */}
        <div className="timeline-header">
          <span className="tl-eyebrow">How we got here</span>
          <h2 className="tl-title">Our Journey</h2>
          <span className="tl-watermark">journey</span>
        </div>

        {/* Auto-scrolling track */}
        <div className="tl-marquee-viewport">
          {/* Event cards */}
          <div className="tl-marquee-track">
            {duplicatedEvents.map((ev, idx) => (
              <div
                className="tl-event-card"
                key={idx}
                style={{ "--event-color": ev.color } as React.CSSProperties}
              >
                <div className="tl-event-accent" />
                <div className="tl-event-year">{ev.year}</div>
                <div className="tl-event-name">{ev.name}</div>
                <div className="tl-event-desc">{ev.desc}</div>
              </div>
            ))}
          </div>

          {/* Timeline line */}
          <div className="tl-line-bar" />

          {/* Year markers (synced scroll) */}
          <div className="tl-year-row">
            {duplicatedEvents.map((ev, idx) => (
              <div className="tl-year-label" key={idx}>
                {ev.year}
              </div>
            ))}
          </div>
        </div>

        <div className="tl-hint">Hover to pause</div>
      </div>
    </div>
  );
}
