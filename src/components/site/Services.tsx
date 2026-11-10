import { useState, useEffect } from "react";
import { Users, Building2, Camera } from "lucide-react";
import { FadeInHeader, ScrollReveal } from "./SectionHeader";

const services = [
  {
    icon: Users,
    title: "Agenciamento de Modelos",
    desc: "Selecionamos modelos, atrizes/atores e influencers que têm o sonho de se profissionalizar no ramo da moda. Produzimos material, oferecemos cursos e agenciamos.",
  },
  {
    icon: Building2,
    title: "Aluguel de Estúdio de Fotografia",
    desc: "Alugamos estúdio fotográfico, com direito a flashes e acessórios, ao camarim, banheiros, cozinha e áreas externas. Contamos também com serviço de internet.",
  },
  {
    icon: Camera,
    title: "Estúdio de Fotografia",
    desc: "Fazemos fotos em estúdio e fotos externas, com acompanhamento de um produtor para auxiliar nas questões de looks, maquiagem, cabelo e produção de objetos.",
  },
];

const faqItems = [
  {
    question: "Como funciona o agenciamento de modelos na Her Concept?",
    answer:
      "Selecionamos modelos, atrizes/atores e influenciadores digitais com perfil profissional. Produzimos material fotográfico, oferecemos orientação e cursos de capacitação, e fazemos a gestão ativa da carreira e apresentações no mercado da moda.",
  },
  {
    question: "Preciso ter experiência prévia para ser agenciado pela Her Concept?",
    answer:
      "Não é necessário ter experiência prévia. Na Her Concept, buscamos potencial, atitude e vocação. Oferecemos preparação técnica e direcionamento completo para novos talentos.",
  },
  {
    question: "O que está incluso no aluguel do estúdio de fotografia?",
    answer:
      "O aluguel do nosso estúdio inclui estrutura completa equipada com flashes e acessórios de iluminação, camarim privativo, banheiros, cozinha de apoio, áreas externas e internet para produções com total conforto.",
  },
  {
    question: "Como funcionam as produções no Estúdio de Fotografia?",
    answer:
      "Realizamos fotos em estúdio e em locações externas, com o acompanhamento exclusivo de um produtor para auxiliar na definição de looks, maquiagem, cabelo e produção de objetos.",
  },
  {
    question: "A avaliação de perfil para agenciamento possui algum custo?",
    answer:
      "Não. A avaliação inicial de perfil e o atendimento de apresentação de serviços são totalmente gratuitos, sigilosos e sem compromisso.",
  },
];

export function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".faq-item-container")) {
        setOpenFaq(null);
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  const toggleFaq = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="servicos" className="bg-[#0a0a0a] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInHeader className="text-center mb-20">
          <span
            className="text-[#C9A96E] uppercase block mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}
          >
            O Que Oferecemos
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
            Nossos Serviços
          </h2>
          <p className="text-white/50 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            Soluções completas de agenciamento de modelos e estúdio de fotografia em Piracicaba e SP, com estrutura de alto padrão e equipe dedicada.
          </p>
        </FadeInHeader>

        {/* Services Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={i} delay={i * 120} direction="up" duration={700}>
                <div className="bg-[#0a0a0a] p-10 group hover:bg-[#141414] transition-colors duration-300 h-full flex flex-col justify-between border border-white/5 hover:border-[#C9A96E]/30">
                  <div className="mb-6">
                    <div className="mb-6 w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
                      <Icon className="text-[#C9A96E]" size={22} />
                    </div>
                    <h3
                      className="text-white mb-4"
                      style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", fontWeight: 300 }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-white/50" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>
                      {service.desc}
                    </p>
                  </div>
                  <div className="w-8 h-px bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/60 transition-all duration-500" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-28 max-w-4xl mx-auto">
          <FadeInHeader className="text-center mb-14">
            <span
              className="text-[#C9A96E] uppercase block mb-3"
              style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}
            >
              Dúvidas Frequentes
            </span>
            <h3
              className="text-white"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              Perguntas Frequentes
            </h3>
          </FadeInHeader>

          <div className="flex flex-col border-t border-white/10">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <ScrollReveal key={index} delay={index * 80} direction="up" duration={600}>
                  <div className="faq-item-container border-b border-white/10 py-5 transition-all duration-300">
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={(e) => toggleFaq(e, index)}
                      className="w-full flex items-center justify-between text-left cursor-pointer bg-transparent border-none text-white hover:text-[#C9A96E] transition-colors duration-200 py-1"
                    >
                      <span
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: "1.1rem",
                          fontWeight: 300,
                        }}
                      >
                        {item.question}
                      </span>
                    </button>

                      <div id={`faq-answer-${index}`} hidden={!isOpen} className="pt-3 pb-1">
                        <p
                          className="text-white/60 leading-relaxed"
                          style={{ fontSize: "0.9rem", lineHeight: 1.8 }}
                        >
                          {item.answer}
                        </p>
                      </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
