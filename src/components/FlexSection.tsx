'use client';
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        title: "Fullstack",
        desc: "Robust, scalable web applications built with precision.",
        // Dark coding setup, dual monitors, neon ambiance
        bg: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1600&auto=format&fit=crop&q=80",
        tag: "DEV",
    },
    {
        title: "UI / UX",
        desc: "Immersive, user-centric interfaces that resonate.",
        // Clean wireframing / design desk, overhead shot
        bg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&auto=format&fit=crop&q=80",
        tag: "DESIGN",
    },
    {
        title: "Marketing",
        desc: "Data-driven strategies to amplify your digital reach.",
        // Aerial city lights / data network glow
        bg: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1600&auto=format&fit=crop&q=80",
        tag: "GROWTH",
    },
    {
        title: "Branding",
        desc: "Unique brand identities that define your future.",
        // Elegant editorial brand identity — luxury stationery & logo on marble
        bg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80",
        tag: "IDENTITY",
    },
];

export default function FlexSection() {
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);

    // ── Header scroll-triggered entrance animations ──
    useEffect(() => {
        if (!headerRef.current) return;

        const ctx = gsap.context(() => {
            // Badge pop
            gsap.fromTo(
                badgeRef.current,
                { opacity: 0, scale: 0.6, y: 10 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Headline words stagger
            const words = headlineRef.current?.querySelectorAll(".word");
            if (words) {
                gsap.fromTo(
                    words,
                    { y: 80, opacity: 0, skewY: 6 },
                    {
                        y: 0,
                        opacity: 1,
                        skewY: 0,
                        duration: 0.9,
                        ease: "power4.out",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }

            // Subtitle fade up
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Divider scale in
            gsap.fromTo(
                dividerRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                    delay: 0.5,
                    transformOrigin: "left center",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, headerRef);

        return () => ctx.revert();
    }, []);

    // ── Slide initial state + cleanup ──
    useEffect(() => {
        const elements = slidesRef.current;

        elements.forEach((el) => {
            if (!el) return;
            gsap.set(el, { flex: 1 });
            gsap.set(el.querySelector(".slide-title"), { rotate: 90, top: "15%" });
            gsap.set(el.querySelector(".slide-content"), { opacity: 0, y: 20 });
            gsap.set(el.querySelector(".slide-tag"), { opacity: 0 });
        });

        return () => {
            elements.forEach((el) => {
                if (el) gsap.killTweensOf(el);
            });
        };
    }, []);

    // ── Hover animation ──
    const handleEnter = (index: number) => {
        slidesRef.current.forEach((el, i) => {
            if (!el) return;
            const isActive = i === index;

            gsap.to(el, {
                flex: isActive ? 3.5 : 0.7,
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto",
            });

            gsap.to(el.querySelector(".slide-title"), {
                rotate: isActive ? 0 : 90,
                top: isActive ? "12%" : "15%",
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
            });

            gsap.to(el.querySelector(".slide-content"), {
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 20,
                duration: 0.4,
                overwrite: "auto",
            });

            gsap.to(el.querySelector(".slide-tag"), {
                opacity: isActive ? 1 : 0,
                duration: 0.3,
                overwrite: "auto",
            });

            gsap.to(el.querySelector(".slide-overlay"), {
                opacity: isActive ? 0.45 : 0.75,
                duration: 0.5,
                overwrite: "auto",
            });
        });
    };

    const handleLeave = () => {
        slidesRef.current.forEach((el) => {
            if (!el) return;
            gsap.to(el, { flex: 1, duration: 0.7, ease: "power3.out", overwrite: "auto" });
            gsap.to(el.querySelector(".slide-title"), { rotate: 90, top: "15%", duration: 0.5, overwrite: "auto" });
            gsap.to(el.querySelector(".slide-content"), { opacity: 0, y: 20, duration: 0.4, overwrite: "auto" });
            gsap.to(el.querySelector(".slide-tag"), { opacity: 0, duration: 0.3, overwrite: "auto" });
            gsap.to(el.querySelector(".slide-overlay"), { opacity: 0.6, duration: 0.5, overwrite: "auto" });
        });
    };

    return (
        <div ref={sectionRef} style={{ background: "#f5f5f3" }}>
            <style>{`
                .flex-section-header {
                    padding: clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px) clamp(40px, 5vw, 60px);
                    max-width: 1600px;
                    margin: 0 auto;
                    width: 100%;
                    box-sizing: border-box;
                }

                .flex-section-meta-row {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                    flex-wrap: wrap;
                }

                .flex-section-counter {
                    display: flex;
                    gap: 32px;
                    margin-left: auto;
                }

                /* ── SLIDES: horizontal on md+, vertical on mobile ── */
                .flex-slides {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    overflow: hidden;
                }

                .flex-slide {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: pointer;
                    /* Mobile: fixed height per card */
                    height: 240px;
                    flex-shrink: 0;
                }

                /* On mobile — title always visible, horizontal, not rotated */
                .slide-title {
                    position: absolute;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.02em;
                    z-index: 10;
                    white-space: nowrap;
                    font-family: 'Inter', system-ui, sans-serif;
                    margin: 0;
                    font-size: clamp(1.5rem, 5vw, 3.5rem);
                    /* No rotation on mobile */
                    transform: rotate(0deg);
                    top: 50%;
                    left: 50%;
                    translate: -50% -50%;
                }

                /* Desc always visible on mobile */
                .slide-content {
                    position: absolute;
                    bottom: 16px;
                    left: 0;
                    right: 0;
                    padding: 0 20px;
                    z-index: 10;
                    opacity: 1;
                }

                .slide-tag {
                    display: none;
                }

                /* ── Tablet+ (640px) ── */
                @media (min-width: 640px) {
                    .flex-slide { height: 280px; }
                    .slide-content { bottom: 20px; padding: 0 28px; }
                }

                /* ── Desktop (900px+) — switch to horizontal flex + GSAP hover ── */
                @media (min-width: 900px) {
                    .flex-slides {
                        flex-direction: row;
                        height: 85vh;
                        min-height: 500px;
                        max-height: 900px;
                    }

                    .flex-slide {
                        height: auto;
                        flex: 1;
                    }

                    /* Restore GSAP-managed state on desktop */
                    .slide-title {
                        top: 15%;
                        left: 50%;
                        translate: -50% 0;
                        /* GSAP will override rotate on hover */
                        transform: rotate(90deg);
                    }

                    .slide-content {
                        opacity: 0;
                        bottom: 48px;
                        padding: 0 32px;
                    }

                    .slide-tag {
                        display: inline-block;
                    }
                }

                /* ── 4K (2560px+) ── */
                @media (min-width: 2560px) {
                    .flex-slides {
                        max-height: 1100px;
                    }
                    .flex-section-header {
                        max-width: 2000px;
                    }
                }

                /* Subtitle paragraph responsive */
                .flex-subtitle {
                    color: rgba(15,15,15,0.5);
                    font-size: clamp(15px, 1.2vw, 18px);
                    line-height: 1.7;
                    margin: 0;
                    max-width: 480px;
                    font-family: 'Inter', system-ui, sans-serif;
                    flex: 1;
                    min-width: 200px;
                }

                .flex-counter-num {
                    font-size: clamp(32px, 4vw, 48px);
                    font-weight: 800;
                    color: #0f0f0f;
                    line-height: 1;
                }

                .flex-counter-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: rgba(15,15,15,0.35);
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    margin-top: 4px;
                }
            `}</style>

            {/* ── HEADER ── */}
            <div ref={headerRef} className="flex-section-header">
                {/* Badge */}
                <span
                    ref={badgeRef}
                    style={{
                        display: "inline-block",
                        background: "rgba(192,57,43,0.08)",
                        border: "1px solid rgba(192,57,43,0.3)",
                        color: "#c0392b",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "6px 16px",
                        borderRadius: "999px",
                        marginBottom: "clamp(20px, 3vw, 32px)",
                        boxShadow: "0 0 20px rgba(192,57,43,0.1)",
                    }}
                >
                    What We Do
                </span>

                {/* Headline */}
                <h2
                    ref={headlineRef}
                    style={{
                        fontSize: "clamp(2.2rem, 7vw, 6rem)",
                        fontWeight: 800,
                        color: "#111111",
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        margin: "0 0 clamp(20px, 3vw, 28px)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    {["Services", "We", "Provide."].map((w, i) => (
                        <span
                            key={i}
                            className="word"
                            style={{ display: "inline-block", marginRight: "0.25em" }}
                        >
                            {w === "Provide." ? (
                                <em style={{ fontStyle: "italic", color: "#111111ff" }}>{w}</em>
                            ) : w}
                        </span>
                    ))}
                </h2>

                {/* Subtitle + counter */}
                <div className="flex-section-meta-row">
                    <p ref={subtitleRef} className="flex-subtitle">
                        From pixels to pipelines — we craft every layer of the digital experience with obsessive precision.
                    </p>

                    <div className="flex-section-counter">
                        <div style={{ textAlign: "center" }}>
                            <div className="flex-counter-num">04</div>
                            <div className="flex-counter-label">Disciplines</div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    ref={dividerRef}
                    style={{
                        height: "1px",
                        background: "linear-gradient(to right, rgba(192,57,43,0.5), rgba(0,0,0,0.08), transparent)",
                        marginTop: "clamp(32px, 5vw, 56px)",
                    }}
                />
            </div>

            {/* ── FLEX SLIDES ── */}
            <section className="flex-slides" onMouseLeave={handleLeave}>
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        ref={(el) => { slidesRef.current[i] = el; }}
                        onMouseEnter={() => handleEnter(i)}
                        className="flex-slide"
                    >
                        {/* Background */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url(${slide.bg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />

                        {/* Overlay */}
                        <div
                            className="slide-overlay"
                            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }}
                        />

                        {/* Tag chip (desktop only via CSS) */}
                        <span
                            className="slide-tag"
                            style={{
                                position: "absolute",
                                top: "24px",
                                right: "20px",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                color: "#E05252",
                                background: "rgba(224,82,82,0.12)",
                                border: "1px solid rgba(224,82,82,0.3)",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                zIndex: 10,
                                opacity: 0,
                            }}
                        >
                            {slide.tag}
                        </span>

                        {/* Title */}
                        <h3 className="slide-title">{slide.title}</h3>

                        {/* Content */}
                        <div className="slide-content">
                            <div style={{ width: "40px", height: "2px", background: "#ff6b6b", marginBottom: "12px" }} />
                            <p style={{
                                color: "rgba(255,255,255,0.85)",
                                fontSize: "clamp(13px, 1vw, 15px)",
                                lineHeight: 1.7,
                                margin: 0,
                                fontFamily: "'Inter', system-ui, sans-serif",
                            }}>
                                {slide.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}