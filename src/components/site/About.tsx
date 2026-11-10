import { useState, useEffect, useRef } from "react";
import { FadeInHeader, ScrollReveal } from "./SectionHeader";
import { Photo } from "./Photo";

const teamPhotoImg = "/assets/aistudio/file_000000003dbc820ea198ec33619911d3_f0babb44.png";

const stats = [
  { target: 150, suffix: "+", label: "Modelos" },
  { target: 12, suffix: "+", label: "Anos de Mercado" },
  { target: 500, suffix: "+", label: "Campanhas" },
  { target: 80, suffix: "+", label: "Marcas Parceiras" },
];

interface InstagramTag {
  id: string;
  handle: string;
  url: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

const INSTAGRAM_TAGS: InstagramTag[] = [
  {
    id: "tatimatheucci",
    handle: "@tatimatheucci",
    url: "https://www.instagram.com/tatimatheucci/",
    x: 23,
    y: 34,
  },
  {
    id: "medeirosbooker",
    handle: "@medeirosbooker",
    url: "https://www.instagram.com/medeirosbooker/",
    x: 52,
    y: 28,
  },
  {
    id: "vanuziapereira",
    handle: "@vanuziapereira.concept",
    url: "https://www.instagram.com/vanuziapereira.concept/",
    x: 77,
    y: 33,
  },
  {
    id: "kellyemanuelle",
    handle: "@kellyemanuelle_",
    url: "https://www.instagram.com/kellyemanuelle_/",
    x: 43,
    y: 56,
  },
  {
    id: "luisrolandofotografo",
    handle: "@luisrolandofotografo",
    url: "https://www.instagram.com/luisrolandofotografo/",
    x: 73,
    y: 58,
  },
];

function StatCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2500;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Fechar marcações ao clicar fora da foto
  useEffect(() => {
    if (!showTags) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (photoContainerRef.current && !photoContainerRef.current.contains(e.target as Node)) {
        setShowTags(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showTags]);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="bg-[#0a0a0a] py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        
        {/* 1. Identificação da seção Sobre */}
        <FadeInHeader className="text-center mb-8 sm:mb-10">
          <span
            className="text-[#C9A96E] uppercase tracking-widest block font-semibold mb-2"
            style={{ fontSize: "0.68rem", letterSpacing: "0.45em" }}
          >
            Sobre Nós • Her Concept Model
          </span>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-light"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Nossa Essência & Equipe
          </h2>
        </FadeInHeader>

        {/* 2. Fotografia oficial da equipe no início com marcações no estilo Instagram */}
        <ScrollReveal direction="up" delay={150}>
          <div className="relative max-w-2xl sm:max-w-3xl mx-auto w-full mb-12 sm:mb-16">
            
            {/* Moldura da Fotografia com toque interativo estilo Instagram */}
            <div
              ref={photoContainerRef}
              onClick={() => setShowTags((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowTags((prev) => !prev);
                }
              }}
              aria-label="Fotografia oficial da equipe Her Concept Model - toque para revelar as marcações do Instagram"
              className="relative z-10 overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] bg-[#121212] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              <Photo
                source={teamPhotoImg}
                alt="Equipe oficial Her Concept Model Agency"
                loading="lazy"
                decoding="async"
                width={1086}
                height={1448}
                className="w-full h-auto aspect-[1086/1448] object-contain sm:object-cover bg-[#121212] select-none pointer-events-none"
              />

              {/* Marcações de pessoas estilo Instagram (aparecem apenas ao clicar ou tocar) */}
              {showTags && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {INSTAGRAM_TAGS.map((tag) => (
                    <a
                      key={tag.id}
                      href={tag.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-[6px] bg-[#121214]/92 hover:bg-black text-white backdrop-blur-md border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.85)] transition-all duration-200 hover:scale-105 active:scale-95 group select-none -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95"
                      style={{
                        left: `${tag.x}%`,
                        top: `${tag.y}%`,
                      }}
                      title={`Acessar ${tag.handle} no Instagram`}
                    >
                      {/* Ponteiro / entalhe característico de tag do Instagram */}
                      <span
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#121214]/92 group-hover:bg-black rotate-45 border-t border-l border-white/15 pointer-events-none"
                        aria-hidden="true"
                      />
                      
                      <span className="text-[11px] sm:text-xs font-medium text-white/95 group-hover:text-white tracking-tight">
                        {tag.handle}
                      </span>
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/50 group-hover:text-white transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Moldura de detalhe dourado deslocada */}
            <div
              className="pointer-events-none absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 w-full h-full border border-[#C9A96E]/30 rounded-2xl z-0"
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        {/* 3. Título "Por Trás de Cada Sonho, Uma Equipe Que Faz Acontecer" */}
        <ScrollReveal direction="up" delay={200}>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <h3
              className="text-white text-2xl sm:text-3xl lg:text-4xl font-light leading-snug"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Por Trás de Cada Sonho,
              <br />
              <span className="text-[#C9A96E]">Uma Equipe Que Faz Acontecer</span>
            </h3>
          </div>
        </ScrollReveal>

        {/* 4. Texto institucional sobre a agência */}
        <ScrollReveal direction="up" delay={250}>
          <div className="max-w-3xl mx-auto flex flex-col gap-5 text-white/75 text-sm sm:text-base font-light leading-relaxed text-center sm:text-left">
            <p>
              Na <strong className="text-white font-medium">Her Concept Model</strong>, acreditamos que o verdadeiro talento e o sucesso no mercado da moda vão muito além dos holofotes, das câmeras e das passarelas. Por trás de cada modelo revelado e de cada conquista alcançada, existe uma equipe dedicada que acredita no potencial humano, acolhe com empatia e trabalha incansavelmente para transformar aspirações em trajetórias profissionais sólidas.
            </p>
            <p className="text-white/65">
              Sediada em Piracicaba e atuante nos principais mercados do Brasil e do exterior, nossa agência é movida por dedicação, respeito, ética e compromisso. Cada ensaio fotográfico, orientação técnica de passarela, preparação estética e estratégia de carreira é construído em conjunto — com o propósito genuíno de revelar o melhor e a singularidade de cada pessoa que passa por aqui.
            </p>
            <p className="text-white/65">
              Mais do que uma agência de modelos, a Her Concept é uma família que cresce, evolui e celebra cada nova história. Valorizamos as pessoas, promovemos o desenvolvimento contínuo e geramos oportunidades reais na indústria da moda e publicidade.
            </p>
          </div>
        </ScrollReveal>

        {/* 5. Frase de destaque */}
        <ScrollReveal direction="up" delay={300}>
          <div className="max-w-3xl mx-auto my-8 sm:my-10 w-full">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.025] border border-[#C9A96E]/40 text-center shadow-lg">
              <p
                className="text-[#FAF3E0] text-lg sm:text-2xl italic font-light leading-relaxed"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                “Juntos, transformamos potencial em oportunidade e sonhos em realidade.”
              </p>
              <span className="text-[#C9A96E] text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold mt-3 block">
                Her Concept Model Agency
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Indicadores e estatísticas da agência */}
        <ScrollReveal direction="up" delay={350}>
          <div className="max-w-3xl mx-auto pt-8 border-t border-white/10 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-[#C9A96E]"
                    style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: 300 }}
                  >
                    <StatCounter target={stat.target} suffix={stat.suffix} isVisible={isVisible} />
                  </span>
                  <span
                    className="text-white/45 uppercase"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

export default About;



