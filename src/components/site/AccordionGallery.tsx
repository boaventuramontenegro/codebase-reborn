import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './AccordionGallery.css';

export interface AccordionItem {
  image: string;
  label: string;
  category?: string;
  stats?: string;
  number?: string;
  link?: string;
  alt?: string;
}

export const DEFAULT_TALENTS: AccordionItem[] = [
  {
    number: '01',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    label: 'Sofia Mendes',
    category: 'Fashion & Editorial',
    stats: '178 cm • Bust 84 • Waist 60',
  },
  {
    number: '02',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    label: 'Lucas Silva',
    category: 'Commercial & Runway',
    stats: '187 cm • Chest 98 • Waist 78',
  },
  {
    number: '03',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80',
    label: 'Camila Andrade',
    category: 'Beauty & Fashion',
    stats: '176 cm • Bust 82 • Waist 59',
  },
  {
    number: '04',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    label: 'Ana Torres',
    category: 'Haute Couture',
    stats: '180 cm • Bust 85 • Waist 61',
  },
  {
    number: '05',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    label: 'Gabriel Santos',
    category: 'Editorial & Men',
    stats: '186 cm • Chest 96 • Waist 76',
  },
  {
    number: '06',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80',
    label: 'Pedro Lima',
    category: 'Runway & Fitness',
    stats: '188 cm • Chest 100 • Waist 80',
  },
];

export interface AccordionGalleryProps {
  items?: AccordionItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  items = DEFAULT_TALENTS,
  defaultIndex = -1,
  accentColor = '#c9a96e',
  overlayColor = '#08080a',
  textColor = '#ffffff',
  height = 480,
  gap = 12,
  radius = 8,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(340);

  const vertical = orientation === 'vertical';
  const count = items.length;

  // Active state initialized to defaultIndex (-1 by default, no card open)
  const [active, setActive] = useState<number>(defaultIndex);

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        // If active === -1, no panel is active (all flat rot = 0)
        const rot = active === -1 ? 0 : isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        // Expand active panel or keep equal size (1) when active === -1 or inactive
        const targetGrow = isActive ? grow : 1;

        tl.to(panel, { flexGrow: targetGrow, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = active === -1 ? 0 : Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive || active === -1 ? 0 : 0.85) : 0;
          const dim = isActive ? 0 : active === -1 ? 0.12 : 0.45;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive || active === -1 ? 0 : shift,
              y: vertical ? (isActive || active === -1 ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': dim,
              duration: dur,
              ease,
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced,
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => {
    const handleTouchOutside = (e: TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setActive(-1);
      }
    };
    document.addEventListener('touchstart', handleTouchOutside);
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
      tlRef.current?.kill();
    };
  }, []);

  const handleEnter = (i: number) => {
    if (trigger === 'hover' && typeof window !== 'undefined' && window.innerWidth > 768) {
      setActive(i);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && typeof window !== 'undefined' && window.innerWidth > 768) {
      setActive(-1);
    }
  };

  // Toggle behavior: clicking an active card closes it (setActive(-1)); clicking an inactive card opens it.
  const handleClick = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (i === active) {
      setActive(-1);
    } else {
      setActive(i);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (i === active) {
        setActive(-1);
      } else {
        setActive(i);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      onMouseLeave={handleMouseLeave}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `clamp(320px, 42vw, ${height}px)`,
      } as React.CSSProperties}
      role="list"
      aria-label="Casting Models Accordion Gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const numFormatted = item.number || (i < 9 ? `0${i + 1}` : `${i + 1}`);
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={i}
            ref={(el: HTMLDivElement | HTMLAnchorElement | null) => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={(e: React.MouseEvent) => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            {/* Top Micro-Typography Editorial Badge */}
            <span className="ag-panel__badge" aria-hidden="true">
              <span className="ag-panel__number">{numFormatted}</span>
              <span className="ag-panel__tag">HC / MODEL</span>
            </span>

            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(el: HTMLSpanElement | null) => {
                  mediaRefs.current[i] = el;
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ''}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(el: HTMLSpanElement | null) => {
                    barRefs.current[i] = el;
                  }}
                />
                <span
                  className="ag-panel__text flex flex-col"
                  ref={(el: HTMLSpanElement | null) => {
                    textRefs.current[i] = el;
                  }}
                >
                  {item.category && (
                    <span className="ag-panel__category">{item.category}</span>
                  )}
                  <span>{item.label}</span>
                  {item.stats && (
                    <span className="ag-panel__stats">{item.stats}</span>
                  )}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
