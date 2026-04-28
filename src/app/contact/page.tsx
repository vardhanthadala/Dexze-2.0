"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import * as THREE from "three";

// ── THREE.JS BACKGROUND COMPONENT ──
const ThreeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current; // snapshot ref for safe cleanup
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 1500;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: "#E05252",
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        camera.position.z = 3;

        // ── Cancellable RAF loop ──
        let rafId: number;
        const animate = () => {
            rafId = requestAnimationFrame(animate);
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(rafId);           // stop the loop first
            window.removeEventListener("resize", handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement); // safe: uses snapshot, not live ref
            }
            particles.geometry.dispose();
            (particles.material as THREE.PointsMaterial).dispose();
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
        />
    );
};

// ── MAIN PAGE ──
export default function ContactBooking() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSent, setIsSent] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const contentRef = useRef<HTMLDivElement>(null);
    // Ref to keep a stable gsap context for event-handler animations
    const gsapCtxRef = useRef<gsap.Context | null>(null);

    const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

    // ── Reset scroll & run entrance animations ──
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".booking-container", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2,
            });
            gsap.from(".booking-header h1, .booking-header p", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.6,
            });
            gsap.from(".calendar-section, .form-section", {
                opacity: 0,
                x: (i: number) => (i === 0 ? -30 : 30),
                duration: 1,
                ease: "power3.out",
                delay: 0.8,
            });
        }, contentRef);

        gsapCtxRef.current = ctx;
        return () => {
            ctx.revert();
            gsapCtxRef.current = null;
        };
    }, []);

    // Calendar helpers
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handlePrevMonth = useCallback(() => {
        setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
    }, []);

    const handleNextMonth = useCallback(() => {
        setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
    }, []);

    // Scoped slot animation — targets a specific ref, not a global selector
    const slotsContainerRef = useRef<HTMLDivElement>(null);

    const handleDateSelect = useCallback((day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const todayCheck = new Date();
        todayCheck.setHours(0, 0, 0, 0);
        if (newDate < todayCheck) return;
        setSelectedDate(newDate);
        setSelectedTime(null);

        // Animate via ref — no global string selector
        requestAnimationFrame(() => {
            if (slotsContainerRef.current) {
                gsap.fromTo(
                    slotsContainerRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    }, [currentMonth]);

    const bookingContainerRef = useRef<HTMLDivElement>(null);
    const contentSplitRef = useRef<HTMLDivElement>(null);
    const bookingHeaderRef = useRef<HTMLDivElement>(null);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        if (form.checkValidity() && selectedDate && selectedTime) {
            // Success: fade out content then show success state
            const targets = [contentSplitRef.current, bookingHeaderRef.current].filter(Boolean);
            gsap.to(targets, {
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                onComplete: () => setIsSent(true),
            });
        } else {
            // Shake error animation via ref
            if (bookingContainerRef.current) {
                gsap.fromTo(
                    bookingContainerRef.current,
                    { x: -10 },
                    {
                        x: 10,
                        duration: 0.1,
                        repeat: 4,
                        yoyo: true,
                        ease: "none",
                        onComplete: () => {
                            if (bookingContainerRef.current) {
                                gsap.set(bookingContainerRef.current, { x: 0 });
                            }
                        },
                    }
                );
            }
        }
    }, [selectedDate, selectedTime]);

    const monthName = currentMonth.toLocaleString("default", { month: "long" });

    return (
        <div className="booking-page" ref={contentRef}>
            <ThreeBackground />

            <style>{`
                .booking-page {
                    min-height: 100vh;
                    background: #050505;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    padding: 40px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    overflow-x: hidden;
                }

                .booking-container {
                    width: 100%;
                    max-width: 1000px;
                    background: rgba(15, 15, 15, 0.85);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    z-index: 1;
                }

                .booking-header {
                    padding: 40px;
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .booking-header h1 {
                    font-size: 36px;
                    font-weight: 800;
                    color: #ffffff;
                    margin-bottom: 12px;
                    letter-spacing: -0.02em;
                }

                .booking-header p {
                    color: #888;
                    font-size: 16px;
                }

                .content-split {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    min-height: 500px;
                }

                .calendar-section {
                    padding: 40px;
                    background: rgba(18, 18, 18, 0.3);
                    border-right: 1px solid rgba(255,255,255,0.05);
                }

                .calendar-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .calendar-nav h2 {
                    font-size: 18px;
                    font-weight: 600;
                    color: #eee;
                }

                .nav-btn {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .nav-btn:hover { background: #E05252; border-color: #E05252; }

                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 8px;
                }

                .weekday {
                    font-size: 11px;
                    font-weight: 700;
                    color: #444;
                    text-align: center;
                    padding-bottom: 15px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .day {
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    color: #888;
                }

                .day:hover:not(.disabled) {
                    background: rgba(255,255,255,0.08);
                    color: #fff;
                    transform: scale(1.1);
                }

                .day.active {
                    background: #E05252 !important;
                    color: white !important;
                    font-weight: 600;
                    box-shadow: 0 8px 20px rgba(224, 82, 82, 0.4);
                    transform: scale(1.1);
                }

                .day.disabled { color: #222; cursor: not-allowed; }

                .day.today {
                    border: 1px solid rgba(224, 82, 82, 0.5);
                    color: #E05252;
                }

                .slots-container {
                    margin-top: 32px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .slots-title {
                    font-size: 12px;
                    font-weight: 700;
                    color: #555;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .slots-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }
                .slot-btn {
                    padding: 12px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    color: #777;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: center;
                }
                .slot-btn:hover:not(.active) { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #fff; }
                .slot-btn.active {
                    background: rgba(224, 82, 82, 0.15);
                    border-color: #E05252;
                    color: #E05252;
                    font-weight: 600;
                    box-shadow: 0 4px 15px rgba(224, 82, 82, 0.1);
                }

                .form-section {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    background: rgba(15, 15, 15, 0.5);
                }

                .form-group { margin-bottom: 24px; }

                .form-group label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    color: #555;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .form-group label.required::after { content: ' *'; color: #E05252; }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 16px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    font-size: 15px;
                    color: #fff;
                    outline: none;
                    transition: all 0.3s;
                    font-family: inherit;
                    box-sizing: border-box;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: #E05252;
                    background: rgba(255, 255, 255, 0.04);
                    box-shadow: 0 0 0 4px rgba(224, 82, 82, 0.1);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder { color: #333; }

                .submit-btn {
                    width: 100%;
                    padding: 18px;
                    background: #E05252;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-top: 10px;
                    text-decoration: none;
                    display: inline-block;
                    text-align: center;
                }
                .submit-btn:hover {
                    background: #ff4d4d;
                    transform: translateY(-4px);
                    box-shadow: 0 15px 30px rgba(224, 82, 82, 0.4);
                }
                .submit-btn:active { transform: translateY(-2px); }
                .submit-btn:disabled {
                    background: #1a1a1a;
                    color: #444;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }

                .success-msg {
                    padding: 80px 40px;
                    text-align: center;
                    animation: fadeIn 0.8s ease;
                }

                .success-icon {
                    width: 80px;
                    height: 80px;
                    background: #E05252;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 32px;
                    font-size: 40px;
                    box-shadow: 0 20px 40px rgba(224, 82, 82, 0.3);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 800px) {
                    .content-split { grid-template-columns: 1fr; }
                    .calendar-section { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
                }

                @media (max-width: 480px) {
                    .booking-header h1 { font-size: 28px; }
                    .calendar-section, .form-section { padding: 30px 20px; }
                }
            `}</style>

            <div ref={bookingContainerRef} className="booking-container">
                {!isSent ? (
                    <>
                        <div ref={bookingHeaderRef} className="booking-header">
                            <h1>Book a Session</h1>
                            <p>Select your ideal slot and let&apos;s create something extraordinary.</p>
                        </div>

                        <div ref={contentSplitRef} className="content-split">
                            {/* CALENDAR */}
                            <div className="calendar-section">
                                <div className="calendar-nav">
                                    <button className="nav-btn" onClick={handlePrevMonth}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <h2>{monthName} {currentMonth.getFullYear()}</h2>
                                    <button className="nav-btn" onClick={handleNextMonth}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="calendar-grid">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                        <div key={day} className="weekday">{day}</div>
                                    ))}

                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} className="day" />
                                    ))}

                                    {Array.from({ length: days }).map((_, i) => {
                                        const dayNum = i + 1;
                                        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                                        const isPast = d < today;
                                        const isSelected = selectedDate?.toDateString() === d.toDateString();
                                        const isToday = d.toDateString() === today.toDateString();

                                        return (
                                            <div
                                                key={dayNum}
                                                className={`day ${isPast ? "disabled" : ""} ${isSelected ? "active" : ""} ${isToday ? "today" : ""}`}
                                                onClick={() => !isPast && handleDateSelect(dayNum)}
                                            >
                                                {dayNum}
                                            </div>
                                        );
                                    })}
                                </div>

                                {selectedDate && (
                                    <div ref={slotsContainerRef} className="slots-container">
                                        <div className="slots-title">Available Times</div>
                                        <div className="slots-grid">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    className={`slot-btn ${selectedTime === slot ? "active" : ""}`}
                                                    onClick={() => setSelectedTime(slot)}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* FORM */}
                            <form className="form-section" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="required">Full Name</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label className="required">Email Address</label>
                                    <input type="email" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Project Brief</label>
                                    <textarea rows={4} placeholder="What are we building today?" required />
                                </div>

                                {selectedDate && selectedTime && (
                                    <div style={{ marginBottom: "20px", padding: "16px", background: "rgba(224, 82, 82, 0.08)", borderRadius: "16px", border: "1px solid rgba(224, 82, 82, 0.2)" }}>
                                        <div style={{ fontSize: "11px", color: "#666", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>
                                            Meeting Summary
                                        </div>
                                        <div style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>
                                            {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} @ {selectedTime}
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={!selectedDate || !selectedTime}
                                >
                                    {!selectedDate ? "Pick a Date" : !selectedTime ? "Pick a Time" : "Confirm Session"}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="success-msg">
                        <div className="success-icon">✓</div>
                        <h1 style={{ fontSize: "32px", color: "#fff", marginBottom: "16px" }}>Session Confirmed!</h1>
                        <p style={{ color: "#888", marginBottom: "40px", lineHeight: "1.8", fontSize: "18px" }}>
                            We&apos;ve reserved your slot for <br />
                            <strong style={{ color: "#E05252" }}>
                                {selectedDate?.toLocaleDateString()} at {selectedTime}
                            </strong>.<br />
                            Check your inbox for the calendar invite.
                        </p>
                        <Link
                            href="/"
                            className="submit-btn"
                            style={{ textDecoration: "none", display: "inline-block", width: "auto", padding: "16px 48px" }}
                        >
                            Explore More
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
