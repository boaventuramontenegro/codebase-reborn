import React, { useState, useEffect } from "react";

// WhatsApp oficial da Her Concept Model Agency (+55 19 99867-5962)
const OFFICIAL_WHATSAPP_NUMBER = "5519998675962";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const heroElement = document.getElementById("home") || document.querySelector("section");
      const footerElement = document.querySelector("footer");

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      // 1. Oculta se estiver no Hero (topo do site)
      let inHero = scrollY < 200;
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        if (heroRect.bottom > 150) {
          inHero = true;
        }
      }

      // 2. Oculta se o rodapé/footer estiver visível no viewport
      let inFooter = false;
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        if (footerRect.top <= windowHeight - 50) {
          inFooter = true;
        }
      }

      // Visível apenas quando NÃO estiver nem no Hero nem no Footer
      setIsVisible(!inHero && !inFooter);
    };

    // Avalia ao carregar e nos eventos de scroll e resize
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Encontrei o site da Her Concept Model Agency e gostaria de conversar."
  )}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="w-14 h-14 rounded-full bg-[#0d0d12] hover:bg-[#141418] text-[#C9A96E] flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 border border-[#C9A96E]/40 hover:border-[#C9A96E] active:scale-95 group"
        style={{
          boxShadow: "0 10px 25px -5px rgba(201, 169, 110, 0.25), 0 0 15px rgba(201, 169, 110, 0.15)",
        }}
      >
        {/* Ícone do WhatsApp em Dourado */}
        <svg
          className="w-7 h-7 fill-[#C9A96E] transition-transform duration-300 group-hover:scale-110 shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
