'use client';

const items = [
  { text: "jelly-o brownie sweet" },
  { text: "Muffin jelly gingerbread", size: "large" },
  { text: "sesame snaps chocolate", size: "medium" },
  { text: "Oat cake", size: "large" },
  { text: "jujubes cheesecake", size: "full" },
  { text: "Dragée pudding brownie", size: "medium" },
  { text: "Oat cake", size: "large" },
 
];

// Optimized: added size params (w=600, q=70) to reduce download from ~5MB → ~300KB total
const images = [
  "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1422255198496-21531f12a6e8?w=600&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90?w=600&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1476097297040-79e9e1603142?w=600&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1464652149449-f3b8538144aa?w=600&auto=format&fit=crop&q=70",
];

export default function GallerySection() {
  return (
    <section className="w-full min-h-screen bg-gray-100 px-6 py-12 md:px-16">
      <style>{`
        .gallery-card {
          position: relative;
          display: flex;
          align-items: flex-end;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          background-size: cover;
          background-position: center;
          /* GPU layer promotion — prevents layout thrash on hover */
          will-change: transform;
          transform: translateZ(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-card:hover {
          transform: translateZ(0) scale(1.03);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
          transition: background 0.3s;
        }
        .gallery-card:hover .gallery-overlay {
          background: rgba(0,0,0,0.1);
        }
      `}</style>

      <h1 className="text-3xl font-semibold mb-10">
        Nom Nom Gallery
      </h1>

      <div className="grid gap-6 auto-rows-[150px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">

        {items.map((item, i) => {
          const img = images[i % images.length];

          let sizeClass = "";
          if (item.size === "medium") sizeClass = "row-span-2";
          if (item.size === "large") sizeClass = "row-span-3";
          if (item.size === "full") sizeClass = "md:col-span-full row-span-2";

          return (
            <div
              key={i}
              className={`gallery-card shadow-lg ${sizeClass}`}
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="gallery-overlay" />

              <div className="relative z-10 bg-white/90 text-gray-700 text-sm px-4 py-3 w-full">
                <span className="font-semibold mr-2 text-black">
                  {i + 1}.
                </span>
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}