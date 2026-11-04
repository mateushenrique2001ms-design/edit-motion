import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const ViewsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  const cardSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const titleBlur = interpolate(frame, [0, 12], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Contador animado até 1.284.950
  const countProgress = interpolate(frame, [25, 110], [0, 1284950], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const formattedCount = Math.floor(countProgress).toLocaleString('pt-BR');

  // Curva do gráfico SVG crescendo
  const graphProgress = interpolate(frame, [30, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          filter: `blur(${titleBlur}px)`,
          textAlign: 'center',
          marginBottom: 35,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: '#F43F5E',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          [ MITO DERRUBADO ]
        </div>

        <div
          style={{
            fontFamily: "'Anybody', sans-serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}
        >
          "NÃO VÃO CHEGAR A
          <br />
          LUGAR NENHUM?"
        </div>
      </div>

      {/* Card Monumental de 1 MILHÃO DE VIEWS */}
      <div
        style={{
          transform: `scale(${cardSpring}) translateY(${interpolate(cardSpring, [0, 1], [50, 0])}px)`,
          opacity: cardSpring,
          width: '100%',
          maxWidth: 740,
          backgroundColor: 'rgba(255, 255, 255, 0.035)',
          borderTop: '1px solid rgba(245, 158, 11, 0.6)',
          borderLeft: '1px solid rgba(245, 158, 11, 0.3)',
          borderRight: '1px solid rgba(245, 158, 11, 0.15)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
          borderRadius: 30,
          padding: '36px 36px',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 70px rgba(245, 158, 11, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '6px 16px',
              borderRadius: 8,
            }}
          >
            ● TRAÇÃO ORGÂNICA
          </span>
          <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 600 }}>Últimos 30 dias</span>
        </div>

        {/* Número Gigante */}
        <div
          style={{
            fontFamily: "'Anybody', sans-serif",
            fontSize: 92,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #FFFFFF 20%, #FDE68A 60%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 35px rgba(245, 158, 11, 0.4)',
            marginBottom: 20,
          }}
        >
          +{formattedCount}
        </div>

        {/* Gráfico SVG de Crescimento Exponencial */}
        <div style={{ width: '100%', height: 140, position: 'relative', marginBottom: 20 }}>
          <svg viewBox="0 0 600 140" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Linha de Base */}
            <line x1="0" y1="130" x2="600" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Área preenchida com gradiente */}
            <path
              d={`M 0 130 Q 200 120, 350 70 T ${600 * graphProgress} ${130 - 110 * graphProgress} L ${600 * graphProgress} 130 Z`}
              fill="url(#areaGradient)"
            />

            {/* Linha Traçada */}
            <path
              d={`M 0 130 Q 200 120, 350 70 T ${600 * graphProgress} ${130 - 110 * graphProgress}`}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Ponto de Pico */}
            {graphProgress > 0.8 && (
              <circle
                cx={600 * graphProgress}
                cy={130 - 110 * graphProgress}
                r="6"
                fill="#FFFFFF"
                stroke="#F59E0B"
                strokeWidth="3"
              />
            )}
          </svg>
        </div>

        {/* Tag de Validação */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 800,
            color: '#FDE68A',
            letterSpacing: '0.08em',
          }}
        >
          🔥 +1.000.000 VISUALIZAÇÕES VALIDADAS
        </div>
      </div>
    </div>
  );
};