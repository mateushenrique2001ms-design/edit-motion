import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const REEL_PREVIEWS = [
  { img: 'img/car-01.jpg', tag: 'VSL KINETIC' },
  { img: 'img/car-02.jpg', tag: 'UI MOTION' },
  { img: 'img/car-03.jpg', tag: '100% CÓDIGO' },
];

export const ProofScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  const cardsSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const titleBlur = interpolate(frame, [0, 12], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          filter: `blur(${titleBlur}px)`,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: '#94A3B8',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          [ PROVA DE CAMPO ]
        </div>

        <div
          style={{
            fontFamily: "'Anybody', sans-serif",
            fontSize: 58,
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}
        >
          "DEVEM SER RUINS?"
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FDE68A 20%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            OLHA ESSES DO MEU PERFIL:
          </span>
        </div>
      </div>

      {/* Grid / Leque de Vídeos Reais com Perspectiva */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          transform: `scale(${cardsSpring}) translateY(${interpolate(cardsSpring, [0, 1], [60, 0])}px)`,
          opacity: cardsSpring,
          perspective: 1000,
        }}
      >
        {REEL_PREVIEWS.map((item, idx) => {
          const rotateY = idx === 0 ? -6 : idx === 2 ? 6 : 0;
          return (
            <div
              key={idx}
              style={{
                width: 220,
                height: 390,
                borderRadius: 24,
                overflow: 'hidden',
                backgroundColor: '#0E131F',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(245, 158, 11, 0.12)',
                transform: `rotateY(${rotateY}deg)`,
                position: 'relative',
              }}
            >
              <Img
                src={staticFile(item.img)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Tag sobre o card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 12,
                  right: 12,
                  backgroundColor: 'rgba(5, 6, 8, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 12,
                  padding: '8px 10px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#FDE68A',
                    letterSpacing: '0.08em',
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 35,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          color: '#34D399',
          fontWeight: 700,
          letterSpacing: '0.1em',
          backgroundColor: 'rgba(52, 211, 153, 0.12)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          padding: '10px 24px',
          borderRadius: 999,
        }}
      >
        ✦ 100% PRODUZIDOS VIA CLAUDE ENGINE
      </div>
    </div>
  );
};