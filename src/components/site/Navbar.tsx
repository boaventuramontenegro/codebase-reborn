import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "Sobre", "Casting", "Galeria", "Serviços", "FAQ", "Contato"];

  const scrollTo = (id: string) => {
    let target = id
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c");
    if (target === "casting") target = "modelos";
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex flex-col">
          <span
            className="cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#FAF3E0] via-[#D8B26E] to-[#A88242] bg-clip-text text-transparent hover:opacity-80"
            style={{
              fontFamily: "'Cinzel', 'Bodoni Moda', 'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              fontWeight: 500,
              letterSpacing: "0.32em",
              filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))",
            }}
            onClick={() => scrollTo("home")}
          >
            HER CONCEPT
          </span>
          <span
            className="text-[#C9A96E]/80 tracking-[0.55em] mt-0.5"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 300,
              letterSpacing: "0.55em",
            }}
          >
            MODEL AGENCY
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-white/70 hover:text-[#C9A96E] transition-colors duration-300 cursor-pointer border-none bg-transparent"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 bg-transparent border-none cursor-pointer"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/98 px-6 py-8 flex flex-col gap-6">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-white/80 hover:text-[#C9A96E] transition-colors text-left bg-transparent border-none cursor-pointer"
              style={{ fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
