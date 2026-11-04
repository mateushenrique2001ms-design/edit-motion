import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CAPTIONS = [
  { text: "Essa skill do Claude", start: 0, end: 40 },
  { text: "FAZ REELS ILIMITADOS", start: 40, end: 85, highlight: true },
  { text: "Qualquer estilo, sem crédito.", start: 85, end: 115 },
  { text: "Deixa eu te mostrar como funciona.", start: 115, end: 165 },
  { text: "Esses reels são feitos em CÓDIGO", start: 165, end: 220, highlight: true },
  { text: "Código de verdade montando cada quadro", start: 220, end: 275 },
  { text: "E NÃO um modelo de vídeo de IA", start: 275, end: 340, danger: true },
  { text: "tentando adivinhar.", start: 340, end: 405 },
  { text: "Sem medidor de crédito", start: 405, end: 460 },
  { text: "NEM CUSTO POR VÍDEO", start: 460, end: 510, highlight: true },
  { text: "Você faz 1 ou 100.", start: 510, end: 570 },
  { text: "Primeira coisa: os reels devem ser ruins?", start: 570, end: 650 },
  { text: "Olha esses do meu perfil.", start: 650, end: 710 },
  { text: "Todos foram feitos assim.", start: 710, end: 765 },
  { text: "Eles não vão chegar a lugar nenhum?", start: 765, end: 830 },
  { text: "+1 MILHÃO DE VIEWS", start: 830, end: 915, highlight: true },
  { text: "nos últimos 30 dias.", start: 915, end: 975 },
  { text: "O Claude tá mudando a distribuição.", start: 975, end: 1045 },
  { text: 'Comenta "CLAUDE" agora', start: 1045, end: 1115, highlight: true },
  { text: "que eu te mando os detalhes!", start: 1115, end: 1182 },
];

export const Subtitles = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const current = CAPTIONS.find((c) => frame >= c.start && frame < c.end);
  if (!current) return null;

  const wordSpring = spring({
    frame: frame - current.start,
    fps,
    config: { damping: 14, stiffness: 220 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 160,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
        zIndex: 900,
        pointerEvents: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${wordSpring})`,
          backgroundColor: current.highlight
            ? 'rgba(217, 119, 6, 0.22)'
            : current.danger
            ? 'rgba(239, 68, 68, 0.22)'
            : 'rgba(5, 6, 8, 0.82)',
          borderTop: current.highlight
            ? '1.5px solid rgba(245, 158, 11, 0.7)'
            : current.danger
            ? '1.5px solid rgba(248, 113, 113, 0.7)'
            : '1.5px solid rgba(255, 255, 255, 0.2)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(30px)',
          borderRadius: 24,
          padding: '18px 40px',
          boxShadow: current.highlight
            ? '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(245, 158, 11, 0.35)'
            : '0 20px 50px rgba(0,0,0,0.8)',
        }}
      >
        <span
          style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: current.highlight
              ? '#FDE68A'
              : current.danger
              ? '#FCA5A5'
              : '#FFFFFF',
            textAlign: 'center',
            textShadow: '0 4px 14px rgba(0,0,0,0.9)',
          }}
        >
          {current.text}
        </span>
      </div>
    </div>
  );
};