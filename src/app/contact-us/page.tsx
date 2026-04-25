"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactUs() {
    const [selectedProject, setSelectedProject] = useState("web");
    const [activeNav, setActiveNav] = useState("SERVICES");
    const [isSent, setIsSent] = useState(false);
    const [shake, setShake] = useState(false);

    const navContent = {
        SERVICES: {
            title: "Our Expertise",
            text: "We specialize in high-end digital experiences, from interactive web platforms to cutting-edge AI integrations. Our team blends Y2K aesthetics with futuristic performance."
        },
        TEAM: {
            title: "The Visionaries",
            text: "A collective of designers, developers, and dreamers dedicated to pushing the boundaries of the digital frontier. We don't just build; we resonate."
        },
        PROJECTS: {
            title: "Selected Work",
            text: "Explore our archive of digital artifacts and successful collaborations. From minimalist portfolios to complex enterprise systems, we deliver precision."
        },
        PARTNERS: {
            title: "Strategic Alliances",
            text: "We collaborate with global brands and innovative startups to create resonance. Our partners trust us to define their digital future."
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        if (form.checkValidity()) {
            setIsSent(true);
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="contact-page-body">
            <style jsx global>{`
        .contact-page-body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
          background: #ddd;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .contact-page-container {
          display: flex;
          width: 100%;
          max-width: 860px;
          min-height: 580px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 200px;
          min-width: 200px;
          background: #E05252;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
        }

        .logo {
          width: 68px;
          height: 68px;
          background: white;
          border-radius: 50%;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .logo svg { width: 48px; height: 48px; }

        nav {
          display: flex;
          flex-direction: column;
          gap: 22px;
          flex: 1;
        }

        .nav-item {
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.09em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0;
          user-select: none;
          position: relative;
          padding-left: 0;
        }
        .nav-item::before { 
          content: '—'; 
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 11px;
        }
        .nav-item.active { 
          color: white; 
          padding-left: 20px;
        }
        .nav-item.active::before { 
          left: 0;
          opacity: 1;
        }
        .nav-item:hover { color: rgba(255,255,255,0.85); }
        .nav-item:active { transform: scale(0.96); }

        .sidebar-footer { margin-top: auto; }
        .find-us {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.07em;
          margin-bottom: 10px;
        }
        .social-icons { display: flex; gap: 10px; }
        .social-icon {
          width: 24px; height: 24px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
        }
        .social-icon svg { width: 12px; height: 12px; fill: none; stroke: rgba(255,255,255,0.55); stroke-width: 1.2; }

        /* ── MAIN ── */
        .main {
          flex: 1;
          background: #F5F4F2;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 36px;
          background: white;
          border-bottom: 1px solid #eee;
        }

        .back-btn, .idea-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888;
          cursor: pointer;
          transition: color 0.15s;
          text-decoration: none;
        }
        .back-btn:hover, .idea-btn:hover { color: #333; }
        .back-btn svg, .idea-btn svg {
          width: 14px; height: 14px;
          stroke: currentColor; fill: none; stroke-width: 1.5;
          stroke-linecap: round; stroke-linejoin: round;
        }

        /* ── FORM AREA ── */
        .form-area {
          flex: 1;
          padding: 36px 52px 36px;
          overflow-y: auto;
        }

        .form-title {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 10;
        }
        .form-title .subtitle {
          font-size: 12px;
          color: #E05252;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          position: relative;
          display: inline-block;
          text-transform: uppercase;
          font-weight: 500;
        }
        .form-title .subtitle::before,
        .form-title .subtitle::after {
          content: '';
          position: absolute;
          top: 50%; width: 30px; height: 1px;
          background: #E05252;
          opacity: 0.3;
        }
        .form-title .subtitle::before { right: calc(100% + 12px); }
        .form-title .subtitle::after  { left:  calc(100% + 12px); }
        
        .form-title h2 {
          font-size: clamp(18px, 4.5vw, 26px);
          font-weight: 400;
          color: #222222;
          line-height: 1.4;
          max-width: 680px;
          margin: 0 auto;
          display: block;
        }

        @media (max-width: 600px) {
          .form-title { margin-bottom: 24px; }
          .form-title h2 { font-size: 17px; line-height: 1.5; }
          .form-title .subtitle::before, .form-title .subtitle::after { width: 15px; }
        }

        @media (max-width: 600px) {
          .form-title h2 {
            font-size: 16px;
            padding: 0 10px;
          }
        }

        .section-label {
          font-size: 11px;
          color: #aaa;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
        }

        /* ── RADIO ── */
        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          margin-bottom: 28px;
          align-items: center;
        }
        .radio-opt {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #999;
          user-select: none;
          transition: color 0.15s;
        }
        .radio-opt.active { color: #333; }
        .radio-circle {
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 1.5px solid #ccc;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s;
        }
        .radio-circle.checked { border-color: #E05252; }
        .radio-circle.checked::after {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #E05252;
        }

        /* ── FIELDS ── */
        .fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        .fields-row.two { grid-template-columns: 1fr 1fr; }

        .field { display: flex; flex-direction: column; gap: 4px; }
        .field-label {
          font-size: 10px;
          color: #bbb;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .field-label.required::after {
          content: ' *';
          color: #E05252;
          font-weight: bold;
        }
        .field-label.accent { color: #E05252; }

        .field input,
        .field select {
          background: transparent;
          border: none;
          border-bottom: 1px solid #D8D5D0;
          padding: 6px 0;
          font-size: 13px;
          color: #333;
          font-family: inherit;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .field input::placeholder { color: #ccc; }
        .field input.accent-val { color: #E05252; }
        .field input:focus,
        .field select:focus { border-bottom-color: #E05252; }
        .field select { cursor: pointer; }
        .field select option { background: #fff; color: #333; }

        /* ── MESSAGE ── */
        .message-field { margin-bottom: 28px; }
        .message-label {
          font-size: 11px;
          color: #bbb;
          letter-spacing: 0.03em;
          margin-bottom: 10px;
        }
        .message-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #D8D5D0;
          padding: 6px 0;
          font-size: 13px;
          color: #555;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .message-input:focus { border-bottom-color: #E05252; }
        .message-input::placeholder { color: #ccc; }

        /* ── SEND ── */
        .send-row { display: flex; justify-content: center; margin-top: 4px; }
        .send-btn {
          background: #4e5e72;
          color: white;
          border: none;
          padding: 13px 60px;
          font-size: 14px;
          font-family: inherit;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.2s;
        }
        .send-btn:hover { background: #3a4a5a; }

        /* ── SUCCESS ── */
        .success-overlay {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: 16px;
          padding: 40px;
          animation: fadeIn 0.4s ease;
        }
        .success-overlay.show { display: flex; }

        .contact-page-container.shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }

        /* ── TEAM SECTION ── */
        .team-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: 20px 0;
          animation: fadeIn 0.5s ease;
        }

        .team-card {
          height: 379px;
          width: 250px;
          background: #333;
          border-radius: 10px;
          transition: background 0.8s;
          overflow: hidden;
          box-shadow: 0 40px 63px -60px #000000;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .team-card-border {
          height: 350px;
          width: 230px;
          background: transparent;
          border-radius: 10px;
          transition: border 1s;
          position: relative;
          z-index: 2;
        }

        .team-card:hover .team-card-border {
          border: 1px solid white;
        }

        .team-card h2 {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: white;
          margin: 20px;
          opacity: 0;
          transition: opacity 1s;
          font-size: 20px;
          font-weight: 300;
          text-align: center;
        }

        .team-card:hover h2 {
          opacity: 1;
        }

        .team-icons {
          position: absolute;
          fill: #fff;
          color: #fff;
          height: 130px;
          top: 180px;
          width: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          opacity: 0;
          transition: opacity 1s;
        }

        .team-card:hover .team-icons {
          opacity: 1;
        }

        .team-icons svg {
          width: 18px;
          height: 18px;
          fill: white;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .team-icons svg:hover { transform: scale(1.2); }

        .card0 {
          background: url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg') center center no-repeat;
          background-size: cover;
        }
        .card0:hover {
          background: url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg') left center no-repeat;
          background-size: 600px;
        }

        .card1 {
          background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0 caravana/28d2e684e7859a0dd17fbd0cea00f8a9.jpg') center center no-repeat;
          background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg') center center no-repeat;
          background-size: cover;
        }
        .card1:hover {
          background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg') left center no-repeat;
          background-size: 600px;
        }

        .card2 {
          background: url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg') center center no-repeat;
          background-size: cover;
        }
        .card2:hover {
          background: url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg') left center no-repeat;
          background-size: 600px;
        }

        /* ── PROJECTS MARQUEE SECTION ── */
        .projects-marquee-section {
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
          animation: fadeIn 0.5s ease;
          position: relative;
        }

        .marquee-container {
          display: flex;
          width: 200%; /* Enough to hold two copies */
          animation: marqueeScroll 40s linear infinite;
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cards {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
        }

        .cards__item {
          width: 320px;
          flex-shrink: 0;
          padding: 1rem;
        }

        .card {
          background-color: white;
          border-radius: 0.25rem;
          box-shadow: 0 20px 40px -14px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
          border: 1px solid #ececec;
        }

        .card:hover .card__image {
          filter: contrast(100%);
        }

        .card__content {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          padding: 1.2rem;
          text-align: left;
        }

        .card__image {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          filter: contrast(70%);
          position: relative;
          transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);
        }
        .card__image::before {
          content: "";
          display: block;
          padding-top: 56.25%; /* 16:9 aspect ratio */
        }

        .card__title {
          color: #696969;
          font-size: 1.1rem;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .card__text {
          flex: 1 1 auto;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          color: #999;
        }

        .card__btn {
          background-color: white;
          border: 1px solid #cccccc;
          color: #696969;
          padding: 0.6rem;
          text-transform: lowercase;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
        }
        .card__btn:hover {
          background: #4e5e72;
          color: white;
          border-color: #4e5e72;
        }

        .img-fence { background-image: url(https://unsplash.it/800/600?image=59); }
        .img-river { background-image: url(https://unsplash.it/800/600?image=11); }
        .img-record { background-image: url(https://unsplash.it/800/600?image=39); }
        .img-flowers { background-image: url(https://unsplash.it/800/600?image=82); }

        @media (max-width: 600px) {
          .cards__item { width: 260px; }
          .card__title { font-size: 1rem; }
        }

        /* ── PARTNERS SECTION ── */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          width: 100%;
          animation: fadeIn 0.5s ease;
        }

        .square-holder {
          padding: 30px;
          border: 1px solid #cecece;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f1f1f1;
          min-height: 180px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .square-holder:hover {
          border-color: #E05252;
          background-color: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .square-holder img {
          max-width: 100%;
          max-height: 100px;
          filter: grayscale(100%);
          transition: all 0.3s;
          object-fit: contain;
        }

        .square-holder:hover img {
          filter: none;
          transform: scale(1.05);
        }

        @media (max-width: 600px) {
          .partners-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 12px;
          }
          .square-holder { min-height: 120px; padding: 15px; }
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .envelope-wrap {
          position: relative;
          width: 100px;
          height: 72px;
        }
        .env-letter {
          position: absolute;
          top: -10px; left: 50%;
          transform: translateX(-50%);
          width: 60px; height: 46px;
          background: white;
          border-radius: 2px 2px 0 0;
          z-index: 2;
          box-shadow: 0 -2px 6px rgba(0,0,0,0.06);
        }
        .env-body {
          position: absolute;
          bottom: 0; left: 0;
          width: 100px; height: 60px;
          background: #e9dc9d;
          border-radius: 0 0 10px 10px;
          z-index: 3;
        }
        .env-left, .env-right {
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 0;
          z-index: 4;
        }
        .env-left {
          border-bottom: 32px solid #d4c87a;
          border-right: 50px solid transparent;
        }
        .env-right {
          left: 50px;
          border-bottom: 32px solid #d4c87a;
          border-left: 50px solid transparent;
        }
        .env-flap {
          position: absolute;
          top: -4px; left: 0;
          width: 100px; height: 52px;
          overflow: hidden;
          z-index: 1;
        }
        .env-flap::before {
          content: '';
          position: absolute; top: 0; left: -10px;
          width: 120px; height: 52px;
          background: #d4c87a;
          transform: rotate(28deg);
          transform-origin: 0 0;
        }
        .env-flap::after {
          content: '';
          position: absolute; top: 0; right: -10px;
          width: 120px; height: 52px;
          background: #d4c87a;
          transform: rotate(-28deg);
          transform-origin: 100% 0;
        }
        .success-text {
          font-size: 13px;
          color: #888;
          letter-spacing: 0.03em;
          margin-top: 6px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 680px) {
          .contact-page-container { flex-direction: column; max-width: 100%; }
          .sidebar { width: 100%; flex-direction: row; align-items: center; padding: 16px 20px; gap: 20px; min-width: unset; }
          .logo { margin-bottom: 0; width: 48px; height: 48px; }
          nav { flex-direction: row; flex: 1; gap: 14px; }
          .sidebar-footer { display: none; }
          .form-area { padding: 24px 20px; }
          .fields-row { grid-template-columns: 1fr 1fr; }
          .fields-row.two { grid-template-columns: 1fr; }
        }
        @media (max-width: 420px) {
          .fields-row { grid-template-columns: 1fr; }
          .radio-group { gap: 14px; }
          .form-area { padding: 20px 16px; }
          .send-btn { padding: 12px 40px; }
        }
        @media (min-width: 1400px) {
          .contact-page-container { max-width: 1000px; }
          .form-area { padding: 40px 72px; }
        }
        @media (min-width: 2000px) {
          .contact-page-body { font-size: 1.15rem; }
          .contact-page-container { max-width: 1200px; min-height: 700px; }
          .sidebar { width: 240px; min-width: 240px; }
          .form-area { padding: 48px 90px; }
          .form-title h2 { font-size: 28px; }
        }
        @media (min-width: 3000px) {
          .contact-page-body { font-size: 1.4rem; }
          .contact-page-container { max-width: 1600px; min-height: 900px; }
          .sidebar { width: 300px; min-width: 300px; }
          .form-title h2 { font-size: 34px; }
        }
      `}</style>

            <div className={`contact-page-container ${shake ? "shake" : ""}`}>
                {/* SIDEBAR */}
                <div className="sidebar">
                    <div className="logo">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="24" cy="26" rx="15" ry="13" fill="#f0f0f0" />
                            <ellipse cx="24" cy="23" rx="11" ry="10" fill="white" />
                            <ellipse cx="20" cy="20" rx="2.2" ry="2.8" fill="#555" />
                            <ellipse cx="28" cy="20" rx="2.2" ry="2.8" fill="#555" />
                            <ellipse cx="20" cy="20.5" rx="0.9" ry="1.1" fill="white" />
                            <ellipse cx="28" cy="20.5" rx="0.9" ry="1.1" fill="white" />
                            <path d="M21 25.5 Q24 28 27 25.5" stroke="#bbb" stroke-width="1.2" fill="none" stroke-linecap="round" />
                            <ellipse cx="24" cy="27" rx="2.2" ry="1.1" fill="#e8a0a0" />
                            <path d="M14 11 Q10.5 4 15 9" stroke="#e8e8e8" stroke-width="3" fill="none" stroke-linecap="round" />
                            <path d="M34 11 Q37.5 4 33 9" stroke="#e8e8e8" stroke-width="3" fill="none" stroke-linecap="round" />
                        </svg>
                    </div>
                    <nav>
                        {["SERVICES", "TEAM", "PROJECTS", "PARTNERS"].map((item) => (
                            <div
                                key={item}
                                className={`nav-item ${activeNav === item ? "active" : ""}`}
                                onClick={() => setActiveNav(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </nav>
                    <div className="sidebar-footer">
                        <div className="find-us">Find us</div>
                        <div className="location-info" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', lineHeight: '1.4' }}>
                            77 Resonance Way,<br />
                            Cyber Hub, DX 2077
                        </div>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <svg viewBox="0 0 12 12"><rect x="1.5" y="1.5" width="9" height="9" rx="2.5" /><circle cx="6" cy="6" r="2" /><circle cx="8.8" cy="3.2" r="0.6" fill="rgba(255,255,255,0.6)" stroke="none" /></svg>
                            </a>
                            <a href="#" className="social-icon">
                                <svg viewBox="0 0 12 12"><path d="M1 2.5 C3 5 5 6 6 6 C7 6 9 5 11 2.5" /><path d="M1.5 2 Q2.5 9 6 9.5 Q9.5 9 10.5 2" /></svg>
                            </a>
                            <a href="#" className="social-icon">
                                <svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.5" /><path d="M2 6 Q4 4.2 6 6 Q8 7.8 10 6" /><path d="M6 1.5 Q5 4 6 6 Q7 8 6 10.5" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* MAIN */}
                <div className="main">
                    <div className="topbar">
                        <Link href="/" className="back-btn">
                            <svg viewBox="0 0 14 14"><path d="M9 2L4 7L9 12" /></svg>
                            Back
                        </Link>
                        <div className="idea-btn">
                            <svg viewBox="0 0 16 16"><circle cx="8" cy="7" r="4.5" /><path d="M6 13h4" /><path d="M8 2V1M8 13v1M2 7H1M15 7h-1M4.22 4.22l-.7-.7M12.48 4.22l.7-.7" stroke-linecap="round" /></svg>
                            Idea
                        </div>
                    </div>

                    {!isSent ? (
                        <form className="form-area" onSubmit={handleSend}>
                            <div className="form-title">
                                <div className="subtitle">{activeNav === "SERVICES" ? "Tell us About" : navContent[activeNav as keyof typeof navContent].title}</div>
                                <h2>{activeNav === "SERVICES" ? "Your project" : navContent[activeNav as keyof typeof navContent].text}</h2>
                            </div>

                            {activeNav === "SERVICES" && (
                                <>
                                    <div className="section-label">What you need</div>
                                    <div className="radio-group">
                                        {[
                                            { id: "mobile", label: "Mobile App" },
                                            { id: "web", label: "Web Development" },
                                            { id: "redesign", label: "reDesign" },
                                            { id: "aiapps", label: "AI Apps" },
                                        ].map((opt) => (
                                            <div
                                                key={opt.id}
                                                className={`radio-opt ${selectedProject === opt.id ? "active" : ""}`}
                                                onClick={() => setSelectedProject(opt.id)}
                                            >
                                                <span className={`radio-circle ${selectedProject === opt.id ? "checked" : ""}`}></span>
                                                {opt.label}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="fields-row">
                                        <div className="field">
                                            <span className="field-label required">Name</span>
                                            <input type="text" placeholder="Your name" required />
                                        </div>
                                        <div className="field">
                                            <span className="field-label accent required">eMail</span>
                                            <input type="email" className="accent-val" placeholder="your@email.com" required />
                                        </div>
                                        <div className="field">
                                            <span className="field-label">Budget</span>
                                            <select defaultValue="">
                                                <option value="" disabled></option>
                                                <option>Under $5,000</option>
                                                <option>$5,000 – $15,000</option>
                                                <option>$15,000 – $50,000</option>
                                                <option>$50,000 – $100,000</option>
                                                <option>$100,000+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="fields-row two">
                                        <div className="field">
                                            <span className="field-label required">Mobile number</span>
                                            <input type="tel" placeholder="+1 000 000 0000" pattern="[0-9+ \-]{10,18}" required />
                                        </div>
                                        <div className="field">
                                            <span className="field-label">Service</span>
                                            <select defaultValue="">
                                                <option value="" disabled></option>
                                                <option>UI / UX</option>
                                                <option>Web Apps</option>
                                                <option>Digital Marketing</option>
                                                <option>AI Apps</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="message-field">
                                        <div className="message-label">Your Message. Describe your project simple &amp; intriguing</div>
                                        <input className="message-input" type="text" placeholder="" />
                                    </div>

                                    <div className="send-row">
                                        <button type="submit" className="send-btn">Send</button>
                                    </div>
                                </>
                            )}

                            {activeNav === "TEAM" && (
                                <div className="team-container">
                                    {[
                                        { id: "card0", name: "Al Pacino" },
                                        { id: "card1", name: "Ben Stiller" },

                                    ].map((member) => (
                                        <div key={member.id} className={`team-card ${member.id}`}>
                                            <div className="team-card-border">
                                                <h2>{member.name}</h2>
                                                <div className="team-icons">
                                                    <svg viewBox="0 0 24 24"><path d="M24 10.14l-3.532.353 2.855 2.14-1.137 3.523L19.332 14 16.477 16.156l-1.137-3.523 2.855-2.14-3.532-.353L12 7l-2.663 3.14-3.532.353 2.855 2.14-1.137 3.523L10.385 14l2.855 2.156 1.137 3.523-2.855-2.14 3.532-.353L12 21l2.663-3.14 3.532-.353-2.855-2.14 1.137-3.523L13.615 14l-2.855-2.156-1.137-3.523 2.855 2.14-3.532.353L12 3l2.663 3.14z" /></svg>
                                                    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                                    <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.865 8.139 6.839 9.465.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.136 22 16.411 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeNav === "PROJECTS" && (
                                <div className="projects-marquee-section">
                                    <div className="marquee-container">
                                        <ul className="cards">
                                            {[
                                                { title: "Flex", text: "Shorthand for flex-grow, flex-shrink and flex-basis combined. Default is 0 1 auto.", img: "img-fence" },
                                                { title: "Flex Grow", text: "Defines the ability for a flex item to grow if necessary. It accepts unitless proportions.", img: "img-river" },
                                                { title: "Flex Shrink", text: "Defines the ability for a flex item to shrink if necessary. Negative numbers are invalid.", img: "img-record" },
                                                { title: "Flex Basis", text: "Defines the default size of an element before remaining space is distributed.", img: "img-flowers" }
                                            ].map((item, idx) => (
                                                <li key={idx} className="cards__item">
                                                    <div className="card">
                                                        <div className={`card__image ${item.img}`}></div>
                                                        <div className="card__content">
                                                            <div className="card__title">{item.title}</div>
                                                            <p className="card__text">{item.text}</p>
                                                            <button className="card__btn">view project</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* Duplicate for infinite loop */}
                                        <ul className="cards" aria-hidden="true">
                                            {[
                                                { title: "Flex", text: "Shorthand for flex-grow, flex-shrink and flex-basis combined. Default is 0 1 auto.", img: "img-fence" },
                                                { title: "Flex Grow", text: "Defines the ability for a flex item to grow if necessary. It accepts unitless proportions.", img: "img-river" },
                                                { title: "Flex Shrink", text: "Defines the ability for a flex item to shrink if necessary. Negative numbers are invalid.", img: "img-record" },
                                                { title: "Flex Basis", text: "Defines the default size of an element before remaining space is distributed.", img: "img-flowers" }
                                            ].map((item, idx) => (
                                                <li key={idx + 4} className="cards__item">
                                                    <div className="card">
                                                        <div className={`card__image ${item.img}`}></div>
                                                        <div className="card__content">
                                                            <div className="card__title">{item.title}</div>
                                                            <p className="card__text">{item.text}</p>
                                                            <button className="card__btn">view project</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeNav === "PARTNERS" && (
                                <div className="partners-grid">
                                    {[
                                        "https://www.pmits.co.uk/portals/0/images/partners/solar-communications-200.png",
                                        "https://www.pmits.co.uk/portals/0/images/partners/cbf-200.png",
                                        "https://www.pmits.co.uk/portals/0/images/partners/gxs-200.png",
                                        "https://www.pmits.co.uk/portals/0/images/partners/jpr-200.png",
                                        "https://www.pmits.co.uk/portals/0/images/partners/talk-internet-200.png",
                                        "https://www.pmits.co.uk/Portals/0/img/opera3_logo.png",
                                        "https://www.pmits.co.uk/Portals/0/pegasus-logo.png",
                                        "https://www.pmits.co.uk/Portals/0/sage business partner.jpg"
                                    ].map((url, idx) => (
                                        <div key={idx} className="square-holder">
                                            <img src={url} alt={`partner-${idx}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </form>
                    ) : (
                        <div className="success-overlay show">
                            <div className="envelope-wrap">
                                <div className="env-flap"></div>
                                <div className="env-letter"></div>
                                <div className="env-body"></div>
                                <div className="env-left"></div>
                                <div className="env-right"></div>
                            </div>
                            <div className="success-text">Thank you for your message</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
