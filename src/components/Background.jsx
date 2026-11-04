import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const Background = () => {
  const frame = useCurrentFrame();

  const glowX = interpolate(Math.sin(frame * 0.02), [-1, 1], [30, 70]);
  const glowY = interpolate(Math.cos(frame * 0.02), [-1, 1], [35, 65]);

  // Cálculo de timecode
  const totalSeconds = frame / 30;
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  const frames = Math.floor(frame % 30).toString().padStart(2, '0');
  const timecode = `00:${mins}:${secs}:${frames}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050608',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Grid técnico com perspectiva */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.6,
        }}
      />

      {/* Orbe âmbar primário (identidade Claude) */}
      <div
        style={{
          position: 'absolute',
          left: `${glowX}%`,
          top: `${glowY}%`,
          width: 900,
          height: 900,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.28) 0%, rgba(245, 158, 11, 0.08) 40%, rgba(0,0,0,0) 75%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Orbe ciano/índigo secundário */}
      <div
        style={{
          position: 'absolute',
          left: `${100 - glowX}%`,
          top: `${100 - glowY}%`,
          width: 800,
          height: 800,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(14, 165, 233, 0.06) 45%, rgba(0,0,0,0) 75%)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />

      {/* Vinheta escura cinematográfica */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(3, 4, 6, 0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grain analógico via SVG */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      >
        <filter id="hudNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hudNoise)" />
      </svg>

      {/* HUD: Quatro cantoneiras de mira (estilo filmadora da referência) */}
      {/* Top Left */}
      <div style={{ position: 'absolute', top: 50, left: 50, width: 28, height: 28, borderTop: '2px solid rgba(245, 158, 11, 0.4)', borderLeft: '2px solid rgba(245, 158, 11, 0.4)', pointerEvents: 'none' }} />
      {/* Top Right */}
      <div style={{ position: 'absolute', top: 50, right: 50, width: 28, height: 28, borderTop: '2px solid rgba(245, 158, 11, 0.4)', borderRight: '2px solid rgba(245, 158, 11, 0.4)', pointerEvents: 'none' }} />
      {/* Bottom Left */}
      <div style={{ position: 'absolute', bottom: 70, left: 50, width: 28, height: 28, borderBottom: '2px solid rgba(245, 158, 11, 0.4)', borderLeft: '2px solid rgba(245, 158, 11, 0.4)', pointerEvents: 'none' }} />
      {/* Bottom Right */}
      <div style={{ position: 'absolute', bottom: 70, right: 50, width: 28, height: 28, borderBottom: '2px solid rgba(245, 158, 11, 0.4)', borderRight: '2px solid rgba(245, 158, 11, 0.4)', pointerEvents: 'none' }} />

      {/* HUD Header Topo */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 90,
          right: 90,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18,
          color: 'rgba(255, 255, 255, 0.45)',
          letterSpacing: '0.12em',
          pointerEvents: 'none',
          zIndex: 800,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444', boxShadow: '0 0 10px #EF4444' }} />
          <span style={{ color: '#F1F5F9', fontWeight: 700 }}>REC [60 FPS]</span>
        </div>

        <div style={{ color: '#F59E0B', fontWeight: 600 }}>
          {timecode}
        </div>

        <div>
          <span>ENGINE: </span>
          <span style={{ color: '#38BDF8', fontWeight: 700 }}>CLAUDE_VSL</span>
        </div>
      </div>

      {/* Barra de progresso contínua no topo absoluto */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 6,
          width: `${(frame / 1182) * 100}%`,
          background: 'linear-gradient(90deg, #F59E0B, #EC4899, #8B5CF6, #10B981)',
          boxShadow: '0 0 16px rgba(245, 158, 11, 0.8)',
          zIndex: 1000,
        }}
      />
    </AbsoluteFill>
  );
};