"use client";

import React from "react";
import "./TeamSection.css";

const TEAM_MEMBERS = [
  {
    name: "Franklin Carlson",
    role: "UX Designer",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Antonia Moore",
    role: "Product Designer",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Travis Lynch",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    twitter: "#",
    linkedin: "#",
  },
];

export default function TeamSection() {
  return (
    <section className="team-section">
      <span className="team-subtitle">meet our</span>
      <h2 className="team-heading">Team</h2>
      <p className="team-desc">
        Small on headcount, enormous on output. Every person here is a
        craftsperson who obsesses over the details.
      </p>
      <span className="bg-watermark">team</span>

      <div className="team-cards">
        {TEAM_MEMBERS.map((member, idx) => (
          <div className="team-card" key={idx}>
            <img src={member.img} alt={member.name} />
            <div className="team-card-content">
              <h3>{member.name.toLowerCase()}</h3>
              <p>{member.role.toLowerCase()}</p>
              <ul>
                <li>
                  <a href={member.twitter} aria-label={`${member.name} Twitter`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={member.linkedin} aria-label={`${member.name} LinkedIn`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
