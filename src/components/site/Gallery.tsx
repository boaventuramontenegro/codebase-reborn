import { useState, useEffect } from "react";
import { FadeInHeader } from "./SectionHeader";
import DriftWall from "./DriftWall";

const GALLERY_ITEMS = [
  {
    image: "/assets/aistudio/file_00000000a0a8820e931b8d4f8b0b8405_d08cf085.png",
    title: "Editorial Red Elegance",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_000000002094820eab98b883df8dcc5f_1bd1bd6d.png",
    title: "Editorial High Fashion & Jewels",
    position: "center 22%",
  },
  {
    image: "/assets/aistudio/file_00000000d224820eb0264d7e9f912d42_284abaa4.png",
    title: "Streetwear Masculino Urban",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_000000009648820e98a04f590b9487a5_ef7e411d.png",
    title: "Fitness & Lifestyle Masculino",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_000000001428820e95038f0151396209_d4658c3e.png",
    title: "Beauty & Acessórios Finos",
    position: "center 30%",
  },
  {
    image: "/assets/aistudio/file_000000004654820eb958e4e99c3bc462_e1df7dd9.png",
    title: "Produção Artística Steampunk",
    position: "center 15%",
  },
  {
    image: "/assets/aistudio/file_00000000831c820e9786124384575aae_1e0736b0.png",
    title: "Cena Teatral & Cinema de Época",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_000000008064820ea33c9a96ddbc4000_4a28cefe.png",
    title: "Produção Artística Caracterização",
    position: "center 25%",
  },
  {
    image: "/assets/aistudio/file_0000000086c8820e8c9449d7314ec87e_1b2b573c.png",
    title: "Editorial Día de los Muertos",
    position: "center 25%",
  },
  {
    image: "/assets/aistudio/file_000000004900820e9b34c4d996e517fa_dda65a12.png",
    title: "Beauty & Hair Styling",
    position: "center 25%",
  },
  {
    image: "/assets/aistudio/file_000000009ad4820ea6186380703098da_0553593e.png",
    title: "Editorial Fantasia Dark Fairy",
    position: "center 15%",
  },
  {
    image: "/assets/aistudio/file_00000000446c820ea0e0690fde5ff338_4e56729c.png",
    title: "Comercial & Jeanswear",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_00000000a420820eb8b7f74cc35e858b_585eaa36.png",
    title: "Alfaiataria Masculina & Sunglasses",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_00000000ef34820e8d1022b5ed07fd50_29925b80.png",
    title: "Comercial Prime & Automotivo",
    position: "center 22%",
  },
  {
    image: "/assets/aistudio/file_0000000057e0820e8c66efaa687e2e88_95d4687e.png",
    title: "Street Style & Urban Life",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_00000000b004820e9993065cb0f0c9f9_dff4d9fe.png",
    title: "Ensaio Casal Minimalista",
    position: "center 20%",
  },
  {
    image: "/assets/aistudio/file_000000001c30820ea2a03e071eec44db_ae87a44e.png",
    title: "Noiva Editorial & Alta Costura",
    position: "center 22%",
  },
  {
    image: "/assets/aistudio/file_000000006f30820e8eb54bcb2b2cc277_1a4d93bc.png",
    title: "Alfaiataria Noivos & Moda Festa",
    position: "center 20%",
  },
];

export function Gallery() {
  const [config, setConfig] = useState({
    columns: 5,
    tileWidth: 190,
    tileHeight: 140,
    gap: 16,
    tilt: 12,
    turn: -10,
    scale: 1.18,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 640) {
        // Mobile screen: calculate tile width so 3 columns fit 100% inside container
        const calcTileW = Math.max(88, Math.min(105, Math.floor((w - 32) / 3.3)));
        setConfig({
          columns: 3,
          tileWidth: calcTileW,
          tileHeight: Math.floor(calcTileW * 0.72),
          gap: 10,
          tilt: 5,
          turn: -4,
          scale: 1.0,
        });
      } else if (w <= 1024) {
        setConfig({
          columns: 4,
          tileWidth: 145,
          tileHeight: 105,
          gap: 14,
          tilt: 10,
          turn: -8,
          scale: 1.1,
        });
      } else {
        setConfig({
          columns: 5,
          tileWidth: 190,
          tileHeight: 140,
          gap: 16,
          tilt: 12,
          turn: -10,
          scale: 1.18,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="galeria" className="bg-[#111111] py-20 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeInHeader className="text-center mb-10 sm:mb-12">
          <span
            className="text-[#C9A96E] uppercase block mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}
          >
            Nosso Trabalho
          </span>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
            }}
          >
            Galeria
          </h2>
          <p
            className="text-white/40 max-w-sm mx-auto"
            style={{ fontSize: "0.85rem", lineHeight: 1.8 }}
          >
            Explore o universo Her Concept através de produções marcantes e exclusivas
          </p>
        </FadeInHeader>

        {/* DriftWall Gallery Container */}
        <div className="w-full h-[480px] sm:h-[600px] md:h-[680px] rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative">
          <DriftWall
            items={GALLERY_ITEMS}
            columns={config.columns}
            tileWidth={config.tileWidth}
            tileHeight={config.tileHeight}
            gap={config.gap}
            radius={14}
            tilt={config.tilt}
            turn={config.turn}
            scale={config.scale}
            perspective={1200}
            speed={12}
            dim={0.95}
            fade={0.8}
            grayscale={false}
            overlayColor="#000000"
          />
        </div>
      </div>
    </section>
  );
}
