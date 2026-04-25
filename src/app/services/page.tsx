"use client";

import React, { useState } from 'react';

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className="services-page">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap");

        .services-page {
          background-color: #111827; /* gray-900 */
          min-height: 100vh;
        }

        h2 {
          font-family: "Playfair Display", serif;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
        }

        .card {
          position: relative;
          overflow: hidden;
          background-color: #1f2937; /* gray-800 */
          padding: 2.5rem; /* p-10 */
          transition: box-shadow 0.6s;
          z-index: 1;
        }

        .card::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          transition: 0.6s;
          z-index: 0;
          background-color: #4f46e5;
        }

        .card:hover {
          box-shadow: 0.063rem 0.063rem 1.25rem 0.375rem rgb(0 0 0 / 53%);
        }

        .card:nth-child(1)::before {
          bottom: 0;
          right: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%);
        }

        .card:nth-child(2)::before {
          bottom: 0;
          left: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 0% 100%);
        }

        .card:nth-child(3)::before {
          top: 0;
          right: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 100% 0%);
        }

        .card:nth-child(4)::before {
          top: 0;
          left: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 0% 0%);
        }

        .card p, .card ul {
          transition: 0.8s;
          position: relative;
          z-index: 10;
        }

        .card:hover::before {
          clip-path: circle(110vw at 100% 100%);
        }

        .card:hover p, .card:hover li {
          color: #fff;
        }

        .circle {
          display: none;
        }

        @media (min-width: 62.5rem) {
          .circle {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        }

        .card:nth-child(1) .circle {
          background: url("https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
            no-repeat 50% 50% / cover;
          bottom: 0;
          right: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%);
        }

        .card:nth-child(2) .circle {
          background: url("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
            no-repeat 50% 50% / cover;
          bottom: 0;
          left: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 0% 100%);
        }
        
        .card:nth-child(3) .circle {
          background: url("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
            no-repeat 50% 50% / cover;
          top: 0;
          right: 0;
          clip-path: circle(calc(6.25rem + 7.5vw) at 100% 0%);
        }

        /* Startup Section Styles */
        @import url(https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400);

        .startup-header {
          background-image: linear-gradient(to bottom, rgba(17, 24, 39, 0.7) 0%, rgba(17, 24, 39, 1) 100%), url(https://i.imgur.com/HS5coix.jpg);
          background-size: cover;
          background-position: center;
          text-align: center;
          padding: 6rem 1rem 4rem;
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .startup-header h1 {
          margin: 0;
          padding: 0 0 0.5em;
          /* Matching Section 2 sizes: text-4xl md:text-5xl xl:text-6xl */
          font-size: clamp(2.5rem, 8vw, 4.5rem); 
          color: #fff;
          font-weight: 700;
          line-height: 1.1;
          max-width: 1000px;
          font-family: "Alegreya Sans", sans-serif;
          letter-spacing: -0.02em;
        }

        .startup-header h1 span {
          display: block;
          font-size: 0.45em;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #6366f1; /* indigo-500 */
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .startup-header button.invite {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75em 2em;
          font-size: 1.25rem;
          color: #fff;
          font-weight: 400;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(4px);
          border: #fff 2px solid;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: "Alegreya Sans", sans-serif;
        }

        .startup-header button.invite:hover {
          background: #fff;
          color: #111;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .wrap {
          margin: 4em auto;
          max-width: 1100px;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
        }

        .grid-startup {
          text-align: center;
          color: white;
          padding: 1rem;
        }

        .grid-startup h2 {
          font-family: "Playfair Display", serif;
          /* Matching card headings: text-2xl xl:text-3xl */
          font-size: clamp(1.5rem, 4vw, 1.875rem);
          margin-bottom: 1rem;
          color: #fff;
        }

        .grid-startup p {
          font-family: "Alegreya Sans", sans-serif;
          font-weight: 300;
          font-size: 1.15rem;
          line-height: 1.6;
          color: #9ca3af; /* text-gray-400 */
        }

        .modal-custom {
          padding: 2.5rem;
          width: calc(100% - 2rem);
          max-width: 550px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -45%) scale(0.95);
          background: #fff;
          border-radius: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1000;
          color: #111;
          text-align: left;
        }

        .modal--init {
          visibility: visible;
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .modal-custom h3 { 
          margin-top: 0; 
          color: #4f46e5; 
          font-size: 1.5rem;
          line-height: 1.3;
          font-family: "Alegreya Sans", sans-serif;
        }

        .modal-custom p {
          color: #4b5563;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .modal-custom a { color: #4f46e5; text-decoration: underline; font-weight: 500; }

        .modal-custom .x { 
          display: inline-block;
          margin-top: 1rem;
          color: #9ca3af;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: color 0.2s;
        }

        .modal-custom .x:hover { color: #111; }

        /* Marquee Styles */
        .marquee-container {
          background: #ffffff;
          overflow: hidden;
          padding: 1.25rem 0;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(0,0,0,0.1);
          position: relative;
          z-index: 50;
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: marquee-scroll 30s linear infinite;
        }

        .marquee-item {
          font-family: "Alegreya Sans", sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #000000;
          text-transform: uppercase;
          padding-right: 4rem;
          letter-spacing: 0.05em;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }


      `}</style>

      {/*section - 1 */}
      <header className="startup-header">
        <h1><span>An app you didn't know you needed</span> SIMPLIFIED.</h1>
        <button className="invite" onClick={() => setModalOpen(true)}>Request Invite</button>
      </header>

      <div className="wrap">
        <div className="grid-startup">
          <h2>Fast</h2>
          <p>A revolutionary way to enhance your day-to-day life, quickly.</p>
        </div>
        
        <div className="grid-startup">
          <h2>Easy</h2>
          <p>Everything you do, do it with gracious ease. Easily.</p>
        </div>
        
        <div className="grid-startup">
          <h2>Reliable</h2>
          <p>Reliably rely on our service that's built on reliability.</p>
        </div>
      </div>

      <div className={`modal-custom ${modalOpen ? 'modal--init' : ''}`}>
        <h3>Ha! You don't get an invite. You think we'd let you use our service that easily?</h3>
        <p>
          Just kidding. I think these startups are awesome and I'd love to launch my own one day. It's still fun to pick on them, though.
        </p>
        <p>
          If you found this amusing please <a href="https://www.mattboldt.com" target="_blank" rel="noopener noreferrer">see my blog</a> where I do other cool things.
        </p>
        <a href="#" className="x" onClick={(e) => { e.preventDefault(); setModalOpen(false); }}>exit</a>
      </div>
        {/*section - 1 end*/}

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="marquee-item">
              CREATIVE DESIGN • DIGITAL STRATEGY • AI SOLUTIONS • BRANDING • DEVELOPMENT • MOTION GRAPHICS •
            </span>
          ))}
        </div>
      </div>
      

    </main>
  );
}
