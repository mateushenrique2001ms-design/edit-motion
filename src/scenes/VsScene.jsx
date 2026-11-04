import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const VsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1Spring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170 },
  });

  const card2Spring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 170 },
  });

  const card1Blur = interpolate(frame, [0, 14], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Blur = interpolate(frame, [18, 32], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Glitch no card IA
  const glitchOffset = frame > 30 && frame % 12 < 3 ? (Math.sin(frame * 2) * 6) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 45px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 22,
          fontWeight: 800,
          color: '#94A3B8',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 35,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '8px 20px',
          borderRadius: 999,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        A Grande Diferença
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          width: '100%',
          maxWidth: 720,
        }}
      >
        {/* Card 1: Motor em Código (O Vencedor) */}
        <div
          style={{
            transform: `translateY(${interpolate(card1Spring, [0, 1], [-50, 0])}px) scale(${card1Spring})`,
            opacity: card1Spring,
            filter: `blur(${card1Blur}px)`,
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            borderTop: '1px solid rgba(52, 211, 153, 0.6)',
            borderLeft: '1px solid rgba(52, 211, 153, 0.3)',
            borderRight: '1px solid rgba(52, 211, 153, 0.15)',
            borderBottom: '1px solid rgba(52, 211, 153, 0.08)',
            borderRadius: 24,
            padding: '30px 36px',
            backdropFilter: 'blur(35px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 50px rgba(16, 185, 129, 0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "'Anybody', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: '#34D399',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              ✓ Motor em Código
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: '#10B981',
                color: '#050608',
                fontSize: 18,
                fontWeight: 900,
                padding: '6px 14px',
                borderRadius: 8,
                letterSpacing: '0.05em',
              }}
            >
              100% EXATO
            </span>
          </div>

          <div style={{ color: '#E2E8F0', fontSize: 24, lineHeight: 1.55, fontWeight: 500 }}>
            • Renderização determinística quadro a quadro<br />
            • Textos nítidos em qualquer resolução<br />
            • Sincronia perfeita com a timeline de áudio
          </div>
        </div>

        {/* Divisor Versus com Linha e Flare */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
          <span
            style={{
              fontFamily: "'Anybody', sans-serif",
              fontSize: 26,
              fontWeight: 900,
              color: '#F59E0B',
              letterSpacing: '0.2em',
              textShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
            }}
          >
            VERSUS
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
        </div>

        {/* Card 2: Modelo IA Tentando Adivinhar */}
        <div
          style={{
            transform: `translateY(${interpolate(card2Spring, [0, 1], [50, 0])}px) scale(${card2Spring}) translateX(${glitchOffset}px)`,
            opacity: card2Spring,
            filter: `blur(${card2Blur}px)`,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            borderTop: '1px solid rgba(248, 113, 113, 0.5)',
            borderLeft: '1px solid rgba(248, 113, 113, 0.25)',
            borderRight: '1px solid rgba(248, 113, 113, 0.12)',
            borderBottom: '1px solid rgba(248, 113, 113, 0.06)',
            borderRadius: 24,
            padding: '30px 36px',
            backdropFilter: 'blur(35px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 45px rgba(239, 68, 68, 0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "'Anybody', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: '#F87171',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              ✗ Vídeo IA Generativo
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                border: '1px solid #EF4444',
                color: '#FCA5A5',
                fontSize: 17,
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: 8,
              }}
            >
              ALUCINAÇÃO
            </span>
          </div>

          <div style={{ color: '#94A3B8', fontSize: 24, lineHeight: 1.55, fontWeight: 500 }}>
            • Textos borrados e sem leitura clara<br />
            • Limite de créditos e filas de espera lentas<br />
            • Custo crescente por minuto gerado
          </div>
        </div>
      </div>
    </div>
  );
};