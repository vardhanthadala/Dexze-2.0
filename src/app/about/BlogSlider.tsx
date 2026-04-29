"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./BlogSlider.css";

const VALUES_DATA = [
  {
    title: "Craft-first thinking",
    text: "We obsess over every pixel, interaction, and line of code. Quality is never a checkbox — it's the foundation.",
    code: "VALUE 01",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Radical transparency",
    text: "No jargon. No hidden processes. We communicate clearly, share progress openly, and own our mistakes.",
    code: "VALUE 02",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Velocity with intent",
    text: "Speed matters, but never at the cost of direction. We move fast with a clear map in hand.",
    code: "VALUE 03",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Human-centered design",
    text: "Real people use what we build. Empathy isn't a soft skill here — it's a hard requirement.",
    code: "VALUE 04",
    img: "https://images.unsplash.com/photo-1531403001884-48a7768a9ee8?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Continuous learning",
    text: "The best teams never stop growing. We invest in knowledge, experimentation, and curiosity.",
    code: "VALUE 05",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Long-term partnership",
    text: "We're not a vendor. We're collaborators invested in your success well beyond the launch date.",
    code: "VALUE 06",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const swiper = new Swiper(sliderRef.current, {
      modules: [EffectFade, Mousewheel],
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      mousewheel: {
        invert: false,
      },
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  return (
    <div className="blog-slider swiper-container" ref={sliderRef}>
      <div className="blog-slider__wrp swiper-wrapper">
        {VALUES_DATA.map((val, idx) => (
          <div className="blog-slider__item swiper-slide" key={idx}>
            <div className="blog-slider__img">
              <img src={val.img} alt={val.title} />
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">{val.code}</span>
              <div className="blog-slider__title">{val.title}</div>
              <div className="blog-slider__text">{val.text}</div>
              <a href="#contact" className="blog-slider__button">GET IN TOUCH</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
