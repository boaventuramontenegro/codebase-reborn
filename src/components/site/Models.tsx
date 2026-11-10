import { FadeInHeader } from "./SectionHeader";
import StackedDeck from "./StackedDeck";

export function Models() {
  return (
    <section id="modelos" className="bg-[#0a0a0a] py-20 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInHeader className="text-center mb-8 sm:mb-12">
          <span
            className="text-[#C9A96E] uppercase block mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}
          >
            Casting Exclusivo
          </span>
          <h2
            className="text-white mb-3"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Nosso Casting
          </h2>
          <p
            className="text-white/50 max-w-sm mx-auto"
            style={{ fontSize: "0.85rem", lineHeight: 1.8 }}
          >
            Clique ou toque nos cards empilhados para revelar os detalhes de cada perfil
          </p>
        </FadeInHeader>

        {/* Stacked Layered Photo Deck */}
        <StackedDeck />
      </div>
    </section>
  );
}
