import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#080808] to-[#050505] text-gray-400 border-t border-white/5 overflow-hidden">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
      
      {/* Contact Info Bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          
          {/* Find us */}
          <div className="flex items-start gap-4 group cursor-default">
            <div className="bg-[#A9DFBF]/10 p-3 rounded-xl group-hover:bg-[#A9DFBF]/20 transition-colors">
              <MapPin className="text-[#A9DFBF]" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Find us</h4>
              <p className="text-sm opacity-60">1010 Avenue, SW 54321, Chandigarh</p>
            </div>
          </div>

          {/* Call us */}
          <div className="flex items-start gap-4 group cursor-default">
            <div className="bg-[#A9DFBF]/10 p-3 rounded-xl group-hover:bg-[#A9DFBF]/20 transition-colors">
              <Phone className="text-[#A9DFBF]" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Call us</h4>
              <p className="text-sm opacity-60">+91 98765 43210</p>
            </div>
          </div>

          {/* Mail us */}
          <div className="flex items-start gap-4 group cursor-default">
            <div className="bg-[#A9DFBF]/10 p-3 rounded-xl group-hover:bg-[#A9DFBF]/20 transition-colors">
              <Mail className="text-[#A9DFBF]" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Mail us</h4>
              <p className="text-sm opacity-60">hello@dexze.studio</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-16 md:gap-10">
        
        {/* Brand/About Section */}
        <div>
          <Link href="/" className="mb-8 block">
            <Image 
              src="/logo.png" 
              alt="DEXZE Logo" 
              width={140} 
              height={40} 
              className="brightness-0 invert opacity-90"
            />
          </Link>
          <p className="text-sm leading-relaxed mb-8 opacity-60 max-w-sm">
            Engineering high-performance digital experiences and transformative brand identities for the next generation of ambitious industry leaders.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {["I", "L", "X"].map((item) => (
              <div 
                key={item} 
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-[#A9DFBF] hover:text-[#050505] hover:border-[#A9DFBF] transition-all duration-300 cursor-pointer text-xs font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-8 relative">
            Useful Links
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-[#A9DFBF]" />
          </h3>

          <ul className="grid grid-cols-2 gap-y-4 text-sm">
            {[
              "Home", "About Us", "Services", "Portfolio",
              "Contact", "Expert Team", "Latest News", "Support"
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#A9DFBF] hover:translate-x-1 transition-all inline-block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscription Section */}
        <div>
          <h3 className="text-white text-lg font-bold mb-8 relative">
            Subscribe
            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-[#A9DFBF]" />
          </h3>

          <p className="text-sm mb-6 opacity-60">
            Join our newsletter to receive the latest updates on design and technology.
          </p>

          <form className="relative group">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#A9DFBF]/50 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#A9DFBF] px-4 rounded-lg hover:scale-105 active:scale-95 transition-all group-hover:shadow-[0_0_15px_rgba(169,223,191,0.3)]"
            >
              <Send className="text-[#050505]" size={18} />
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider opacity-40">
          
          <p>
            © {new Date().getFullYear()} DEXZE STUDIO. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0 uppercase font-bold">
            {["Terms", "Privacy", "Cookies", "Contact"].map((item) => (
              <Link key={item} href="#" className="hover:text-[#A9DFBF] transition-colors">
                {item}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}