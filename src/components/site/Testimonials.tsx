import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInHeader, ScrollReveal } from "./SectionHeader";

const testimonials = [
  {
    name: "Jac Christofoletti",
    quote:
      "Agência séria, com profissionais competentes. Sempre a disposição para ajudar e buscar os melhores jobs pra seus modelos. Confio e indico de olhos fechados🙏🏼👊🏼❤️",
  },
  {
    name: "Bruna Marchioni",
    quote:
      "Experiência fantástica, ótimos profissionais, parceiros de qualidade, muita capacidade e competência com os serviços prestados e disponibilizado aos modelos.",
  },
  {
    name: "Adriana Ferreira",
    quote:
      "Agência muito boa super indico ,ótimo atendimento...venham fzr parte da Her Concept Model vcs não vão se arrepender ....",
  },
  {
    name: "Vanessa Meneghetti Calçada",
    quote:
      "Excelentes profissionais na agência! Uma experiência incrível! Parabéns pela qualidade.",
  },
  {
    name: "Ana Helena Bacchin",
    quote:
      "Ótima agência em Piracicaba, tem um profissionalismo excelente!!",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section className="bg-[#070707] py-28 px-6 border-t border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInHeader className="text-center mb-20">
          <span
            className="text-[#C9A96E] uppercase block mb-3 font-semibold"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}
          >
            Depoimentos
          </span>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            O Que Dizem Sobre Nós
          </h2>
          <p className="text-white/50 max-w-lg mx-auto" style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
            A confiança e o reconhecimento dos nossos talentos e clientes são o nosso maior compromisso.
          </p>
        </FadeInHeader>

        {/* Desktop View: Responsive Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 120} direction="up" duration={800}>
              <div className="bg-[#0f0f0f] border border-white/10 p-8 sm:p-10 rounded-[24px] flex flex-col justify-between hover:border-[#C9A96E]/50 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 group h-full">
                {/* Quote */}
                <p
                  className="text-white/80 mb-8 italic"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "0.98rem",
                    lineHeight: 1.8,
                  }}
                >
                  "{item.quote}"
                </p>

                {/* Author Highlighted */}
                <div className="pt-4 border-t border-white/5">
                  <h4
                    className="text-[#C9A96E] font-medium"
                    style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
                  >
                    {item.name}
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View: Carousel */}
        <ScrollReveal direction="up">
          <div className="md:hidden relative">
            <div className="overflow-hidden py-2">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((item, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2">
                    <div className="bg-[#0f0f0f] border border-white/10 p-8 sm:p-10 rounded-[24px] shadow-2xl shadow-black/80 flex flex-col justify-between min-h-[260px]">
                      {/* Quote */}
                      <p
                        className="text-white/80 mb-8 italic"
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: "0.98rem",
                          lineHeight: 1.8,
                        }}
                      >
                        "{item.quote}"
                      </p>

                      {/* Author Highlighted */}
                      <div className="pt-4 border-t border-white/5">
                        <h4
                          className="text-[#C9A96E] font-medium"
                          style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
                        >
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls Mobile */}
            <div className="flex items-center justify-between mt-6 px-2">
              <button
                onClick={prev}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 transition-all duration-300 border-none cursor-pointer rounded-full ${
                      currentIndex === idx ? "w-6 bg-[#C9A96E]" : "w-1.5 bg-white/20"
                    }`}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Próximo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


