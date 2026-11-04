import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Easing profissional: blur-to-sharp + scale
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  const titleSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const card1Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const card2Spring = spring({
    frame: frame - 48,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  // Blur de entrada
  const titleBlur = interpolate(frame, [6, 18], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Blur = interpolate(frame, [25, 38], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Blur = interpolate(frame, [48, 62], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Badge Topo com Logo Oficial Claude */}
      <div
        style={{
          transform: `scale(${logoSpring}) translateY(${interpolate(logoSpring, [0, 1], [-40, 0])}px)`,
          opacity: logoSpring,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: 'rgba(217, 119, 6, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          padding: '14px 28px',
          borderRadius: 999,
          marginBottom: 44,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 35px rgba(245, 158, 11, 0.25)',
        }}
      >
        <Img
          src={staticFile('img/claude-simbolo.svg')}
          style={{ width: 34, height: 34 }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#FDE68A',
            textTransform: 'uppercase',
          }}
        >
          Anthropic Claude Engine
        </span>
      </div>

      {/* Título Principal em Anybody Black */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          filter: `blur(${titleBlur}px)`,
          textAlign: 'center',
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            fontWeight: 700,
            color: '#94A3B8',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          [ NOVA SKILL NATIVA ]
        </div>
        <div
          style={{
            fontFamily: "'Anybody', sans-serif",
            fontSize: 104,
            lineHeight: 0.94,
            fontWeight: 900,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(145deg, #FFFFFF 20%, #FDE68A 65%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            textShadow: '0 10px 40px rgba(245, 158, 11, 0.25)',
          }}
        >
          REELS
          <br />
          ILIMITADOS
        </div>
      </div>

      {/* Cartões Flutuantes com Glassmorphism Real e Chanfro */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: '100%',
          maxWidth: 720,
        }}
      >
        {/* Card 1: Qualquer Estilo */}
        <div
          style={{
            transform: `translateY(${interpolate(card1Spring, [0, 1], [60, 0])}px) scale(${card1Spring})`,
            opacity: card1Spring,
            filter: `blur(${card1Blur}px)`,
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            borderTop: '1px solid rgba(255, 255, 255, 0.22)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(35px)',
            borderRadius: 24,
            padding: '26px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32 }}>⚡</span>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Qualquer Estilo
              </div>
              <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 500 }}>
                VSL, Motion Graphics, Kinetic UI
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              color: '#34D399',
              backgroundColor: 'rgba(52, 211, 153, 0.14)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              padding: '8px 18px',
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            NATIVO
          </span>
        </div>

        {/* Card 2: Sem Crédito */}
        <div
          style={{
            transform: `translateY(${interpolate(card2Spring, [0, 1], [60, 0])}px) scale(${card2Spring})`,
            opacity: card2Spring,
            filter: `blur(${card2Blur}px)`,
            backgroundColor: 'rgba(217, 119, 6, 0.08)',
            borderTop: '1px solid rgba(245, 158, 11, 0.5)',
            borderLeft: '1px solid rgba(245, 158, 11, 0.25)',
            borderRight: '1px solid rgba(245, 158, 11, 0.15)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
            backdropFilter: 'blur(35px)',
            borderRadius: 24,
            padding: '26px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 50px rgba(217, 119, 6, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 32 }}>🔥</span>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#FDE68A', letterSpacing: '-0.02em' }}>
                Sem Créditos
              </div>
              <div style={{ fontSize: 20, color: '#FBBF24', fontWeight: 500 }}>
                Zero consumo de tokens por vídeo
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              color: '#F59E0B',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              padding: '8px 18px',
              borderRadius: 12,
              fontWeight: 800,
            }}
          >
            0 TOKENS
          </span>
        </div>
      </div>
    </div>
  );
};