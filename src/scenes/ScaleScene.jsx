import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const ScaleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  const blur = interpolate(frame, [0, 14], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Contador de vídeos 1 até 100
  const videoCount = Math.floor(
    interpolate(frame, [15, 80], [1, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const meterWidth = interpolate(frame, [15, 80], [5, 100], {
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
        padding: '0 50px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${containerSpring})`,
          opacity: containerSpring,
          filter: `blur(${blur}px)`,
          width: '100%',
          maxWidth: 720,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: '#F59E0B',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 20,
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '8px 22px',
            borderRadius: 999,
          }}
        >
          [ ESCALA LIVRE ]
        </div>

        <div
          style={{
            fontFamily: "'Anybody', sans-serif",
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginBottom: 40,
          }}
        >
          VOCÊ FAZ <span style={{ color: '#10B981' }}>1</span> OU{' '}
          <span style={{ color: '#F59E0B' }}>100</span>
        </div>

        {/* Card do Medidor de Produção */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            borderTop: '1px solid rgba(255, 255, 255, 0.22)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: 28,
            padding: '40px 36px',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
          }}
        >
          {/* Display Numérico Gigante */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: "'Anybody', sans-serif",
                fontSize: 120,
                fontWeight: 900,
                lineHeight: 1,
                color: '#FDE68A',
                letterSpacing: '-0.04em',
                textShadow: '0 0 35px rgba(245, 158, 11, 0.4)',
              }}
            >
              {videoCount}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 700,
                color: '#94A3B8',
              }}
            >
              / REELS
            </span>
          </div>

          {/* Barra de Progresso / Energia */}
          <div
            style={{
              height: 16,
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 999,
              overflow: 'hidden',
              marginBottom: 30,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${meterWidth}%`,
                background: 'linear-gradient(90deg, #10B981, #F59E0B)',
                borderRadius: 999,
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)',
              }}
            />
          </div>

          {/* Tags de Custo Zero */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 10,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 600 }}>Custo de API</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#10B981' }}>R$ 0,00</div>
            </div>

            <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)' }} />

            <div>
              <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 600 }}>Limite</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B' }}>INFINITO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};