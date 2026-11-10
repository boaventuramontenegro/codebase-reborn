import React, { useState, useEffect, useRef } from 'react';
import './StackedDeck.css';
import { Photo } from './Photo';

export interface ModelTalent {
  id: string;
  image: string;
  name?: string;
}

export const CASTING_MODELS: ModelTalent[] = [
  {
    id: '1',
    name: '',
    image: '/assets/aistudio/file_0000000001f0820eb004d2587eb5eff6_a5bf1e29.png',
  },
  {
    id: '2',
    name: '',
    image: '/assets/aistudio/file_00000000eda0820e89850ca3107ab61c_33822d32.png',
  },
  {
    id: '3',
    name: '',
    image: '/assets/aistudio/file_00000000a438820e9a0da912247da7a3_7530579c.png',
  },
  {
    id: '4',
    name: '',
    image: '/assets/aistudio/file_00000000f594820eabf0dd011f27dd44_c5c794c5.png',
  },
  {
    id: '5',
    name: '',
    image: '/assets/aistudio/file_000000001694820e9365df115b98bfd9_fa47df15.png',
  },
  {
    id: '6',
    name: '',
    image: '/assets/aistudio/file_00000000378c820ea18d37d20ac5dc41_3d50fd05.png',
  },
  {
    id: '7',
    name: '',
    image: '/assets/aistudio/file_0000000033f4820ea2f0288b35df7891_6b07adc3.png',
  },
];

export function StackedDeck() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag tracking state
  const isDraggingRef = useRef<boolean>(false);
  const hasMovedRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startIndexRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close deck ONLY when clicking/tapping OUTSIDE containerRef
  useEffect(() => {
    const handlePointerDownOutside = (event: PointerEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside as EventListener);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside as EventListener);
    };
  }, []);

  const count = CASTING_MODELS.length;

  // Handle pointer down (mouse or touch) to initiate drag session without forcing deck open
  const handleStartDrag = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = clientX;
    startYRef.current = clientY;
    startIndexRef.current = selectedIndex ?? 0;
  };

  const handleEndDrag = () => {
    isDraggingRef.current = false;
  };

  // Controlled drag / scrub logic with step threshold to reduce sensitivity
  const handleMove = (clientX: number, clientY: number, isDirectInteraction: boolean = false) => {
    if (!stageRef.current) return;

    if (isDraggingRef.current || isDirectInteraction) {
      const deltaX = clientX - startXRef.current;
      const deltaY = clientY - startYRef.current;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Se o movimento for predominantemente vertical (scroll de página), ignora e permite scroll natural
      if (absY > 10 && absY > absX * 1.2) {
        if (selectedIndex !== null && absY > 30) {
          setSelectedIndex(null);
        }
        isDraggingRef.current = false;
        return;
      }

      // Se o movimento for predominantemente horizontal, inicia/navega a abertura do deck
      if (absX > 8 && absX > absY) {
        hasMovedRef.current = true;
        if (selectedIndex === null) {
          setSelectedIndex(0);
          startIndexRef.current = 0;
        }

        const stepDistance = isMobile ? 55 : 70; // Distance in px required to switch cards
        const stepChange = Math.trunc(-deltaX / stepDistance);

        let targetIndex = startIndexRef.current + stepChange;
        // Strict clamping between 0 and count - 1 (NO LOOPING)
        targetIndex = Math.max(0, Math.min(count - 1, targetIndex));
        setSelectedIndex(targetIndex);
      }
    }
  };

  return (
    <div ref={containerRef} className="stacked-deck-container">
      {/* Interactive Deck Stage */}
      <div
        ref={stageRef}
        className="stacked-deck-stage"
        onPointerDown={(e) => handleStartDrag(e.clientX, e.clientY)}
        onPointerMove={(e) => {
          if (e.buttons === 1) {
            handleMove(e.clientX, e.clientY, false);
          }
        }}
        onPointerUp={handleEndDrag}
        onPointerCancel={handleEndDrag}
        onTouchStart={(e) => {
          if (e.touches && e.touches[0]) {
            handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
          }
        }}
        onTouchEnd={handleEndDrag}
      >
        {CASTING_MODELS.map((model, i) => {
          const isSelected = selectedIndex === i;
          const isDeckMode = selectedIndex === null;

          let transformStyle = '';
          let opacityStyle = 1;
          let zIndexStyle = i + 1;

          if (isDeckMode) {
            // Estado empilhado/abanado inicial (fan deck): cards sobrepostos e levemente rotacionados
            const midIndex = (count - 1) / 2;
            const diff = i - midIndex;
            const xOffset = diff * (isMobile ? 18 : 30);
            const yOffset = Math.abs(diff) * (isMobile ? 3 : 5);
            const rot = diff * (isMobile ? 3.2 : 4.8);

            transformStyle = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rot}deg) scale(1)`;
            opacityStyle = 1;
            zIndexStyle = count - i;
          } else {
            // Estado ativo/selecionado: fanning contínuo em torno do card selecionado
            if (i < selectedIndex) {
              // Cards anteriores (já passados): empilham para a ESQUERDA
              const dist = selectedIndex - i;
              const stackTaper = Math.min(dist - 1, 4) * (isMobile ? 12 : 20);
              const xOffset = -(isMobile ? 65 : 120) - stackTaper;
              const yOffset = Math.min(dist, 5) * (isMobile ? 3 : 5);
              const rot = -6 - Math.min(dist, 5) * (isMobile ? 2.5 : 3.5);
              const scale = Math.max(0.82, 1 - Math.min(dist, 5) * 0.035);

              transformStyle = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rot}deg) scale(${scale})`;
              opacityStyle = Math.max(0.35, 1 - dist * 0.1);
              zIndexStyle = i + 1;
            } else if (i > selectedIndex) {
              // Cards posteriores (próximos): empilham para a DIREITA atrás do selecionado
              const dist = i - selectedIndex;
              const stackTaper = Math.min(dist - 1, 4) * (isMobile ? 12 : 20);
              const xOffset = (isMobile ? 65 : 120) + stackTaper;
              const yOffset = Math.min(dist, 5) * (isMobile ? 3 : 5);
              const rot = 6 + Math.min(dist, 5) * (isMobile ? 2.5 : 3.5);
              const scale = Math.max(0.82, 1 - Math.min(dist, 5) * 0.035);

              transformStyle = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rot}deg) scale(${scale})`;
              opacityStyle = Math.max(0.35, 1 - dist * 0.1);
              zIndexStyle = count - i;
            } else {
              // Card focado/selecionado em destaque no CENTRO
              transformStyle = `translate3d(0px, 0px, 0) rotate(0deg) scale(${isMobile ? 1.04 : 1.08})`;
              opacityStyle = 1;
              zIndexStyle = 50;
            }
          }

          return (
            <div
              key={model.id}
              role="button"
              tabIndex={0}
              aria-label={`Ver fotografia ${i + 1} do casting Her Concept`}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedIndex(i);
                }
                if (e.key === 'Escape') setSelectedIndex(null);
              }}
              className={`stacked-card ${isSelected ? 'is-expanded' : ''} ${!isDeckMode && !isSelected ? 'is-side' : ''}`}
              style={{
                transform: transformStyle,
                opacity: opacityStyle,
                zIndex: zIndexStyle,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasMovedRef.current) {
                  setSelectedIndex(i);
                  startXRef.current = e.clientX;
                  startYRef.current = e.clientY;
                  startIndexRef.current = i;
                }
              }}
            >
              <div className="stacked-card__inner">
                {/* Photo */}
                <div className="stacked-card__image-wrap">
                  <Photo
                    source={model.image}
                    alt={`Retrato de modelo do casting Her Concept em Piracicaba — fotografia ${i + 1}`}
                    className="stacked-card__image"
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={1200}
                    draggable={false}
                  />
                  <div className="stacked-card__overlay" />
                </div>

                {/* Top Badge (Brand only) */}
                <div className="stacked-card__top-badge">
                  <span className="stacked-card__brand">HC / CASTING</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="stacked-deck-hint">
        Deslize suavemente para navegar entre as fotos <span className="stacked-deck-hint__dot">•</span> Toque fora do deck para fechar
      </p>
    </div>
  );
}

export default StackedDeck;
