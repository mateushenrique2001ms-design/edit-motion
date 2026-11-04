import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CODE_LINES = [
  { n: '01', code: "import { Engine, Frame } from '@anthropic/motion';", c: '#A78BFA' },
  { n: '02', code: "", c: '#FFFFFF' },
  { n: '03', code: "// Renderização determinística em código puro", c: '#64748B' },
  { n: '04', code: "export const ReelEngine = ({ frame, audio }) => {", c: '#F43F5E' },
  { n: '05', code: "  const beat = syncWithSpeech(audio.wave, frame);", c: '#FDE68A' },
  { n: '06', code: "  const viewport = autoScale({ aspect: '9:16' });", c: '#34D399' },
  { n: '07', code: "  return (", c: '#F43F5E' },
  { n: '08', code: "    <Canvas width={1080} height={1920} fps={60}>", c: '#38BDF8' },
  { n: '09', code: "      <KineticLayer spring={beat.punch} />", c: '#FBBF24' },
  { n: '10', code: "      <AudioReactiveWave track={audio} />", c: '#EC4899' },
  { n: '11', code: "    </Canvas>", c: '#38BDF8' },
  { n: '12', code: "  );", c: '#F43F5E' },
  { n: '13', code: "};", c: '#F43F5E' },
];

export const CodeScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170 },
  });

  const blur = interpolate(frame, [0, 14], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const visibleLines = Math.min(CODE_LINES.length, Math.floor(frame / 5) + 1);

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
      {/* Título de Seção Técnica */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 24,
          fontWeight: 700,
          color: '#34D399',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 30,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          padding: '10px 24px',
          borderRadius: 999,
        }}
      >
        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#34D399', boxShadow: '0 0 12px #34D399' }} />
        <span>Arquitetura em Código Puro</span>
      </div>

      {/* Janela de IDE VS Code Realista */}
      <div
        style={{
          transform: `scale(${windowSpring})`,
          opacity: windowSpring,
          filter: `blur(${blur}px)`,
          width: '100%',
          maxWidth: 760,
          backgroundColor: '#090D16',
          borderTop: '1px solid rgba(255, 255, 255, 0.25)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(52, 211, 153, 0.15)',
        }}
      >
        {/* Barra de Janela / Abas */}
        <div
          style={{
            height: 60,
            backgroundColor: '#0E1422',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            justifyContent: 'space-between',
          }}
        >
          {/* Botões Mac OS */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10B981' }} />
          </div>

          {/* Aba Ativa */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#090D16',
              padding: '8px 20px',
              borderRadius: '10px 10px 0 0',
              borderTop: '2px solid #38BDF8',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 19,
              color: '#F8FAFC',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#38BDF8' }}>TSX</span>
            <span>engine-motion.tsx</span>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              color: '#34D399',
              fontWeight: 700,
            }}
          >
            ● 60 FPS
          </div>
        </div>

        {/* Linhas de Código com JetBrains Mono */}
        <div
          style={{
            padding: '28px 24px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            lineHeight: 1.65,
            position: 'relative',
          }}
        >
          {CODE_LINES.slice(0, visibleLines).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 20 }}>
              <span style={{ color: '#475569', width: 32, textAlign: 'right', userSelect: 'none', fontWeight: 600 }}>
                {item.n}
              </span>
              <span style={{ color: item.c, fontWeight: 500 }}>{item.code}</span>
            </div>
          ))}

          {/* Cursor de Digitação Ativo */}
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 22,
              backgroundColor: '#38BDF8',
              marginLeft: 52,
              opacity: Math.sin(frame * 0.35) > 0 ? 1 : 0,
            }}
          />
        </div>

        {/* Terminal Embutido no Rodapé do Editor */}
        <div
          style={{
            backgroundColor: '#06080F',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#10B981', fontWeight: 800 }}>✓ COMPILED</span>
            <span style={{ color: '#64748B' }}>in 14ms (0 alucinações)</span>
          </div>
          <span style={{ color: '#F59E0B', fontWeight: 700 }}>RENDER: EXACT_FRAME</span>
        </div>
      </div>
    </div>
  );
};