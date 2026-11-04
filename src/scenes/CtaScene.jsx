import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const CtaScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  const cardSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const titleBlur = interpolate(frame, [0, 12], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Digitação da palavra "CLAUDE" letra por letra entre frames 35 e 70
  const ctaWord = "CLAUDE";
  const typedCount = Math.floor(
    interpolate(frame, [35, 65], [0, ctaWord.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const currentTyped = ctaWord.slice(0, typedCount);

  // Aparece confirmação de envio após frame 85
  const isSent = frame > 85;

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
            color: '#38BDF8',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          [ A NOVA DISTRIBUIÇÃO ]
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
          O CLAUDE MUDOU
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FDE68A 20%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            O JOGO DO VÍDEO
          </span>
        </div>
      </div>

      {/* Mockup de Interface Instagram / Comentário */}
      <div
        style={{
          transform: `scale(${cardSpring}) translateY(${interpolate(cardSpring, [0, 1], [50, 0])}px)`,
          opacity: cardSpring,
          width: '100%',
          maxWidth: 720,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          borderTop: '1px solid rgba(255, 255, 255, 0.25)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 28,
          padding: '36px 32px',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(245, 158, 11, 0.18)',
        }}
      >
        {/* Cabeçalho do Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Img
              src={staticFile('img/instagram.svg')}
              style={{ width: 32, height: 32 }}
            />
            <span style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>
              Comente no Reel
            </span>
          </div>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              color: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              padding: '6px 14px',
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            ● RESPOSTA AUTOMÁTICA
          </span>
        </div>

        {/* Input de Comentário */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0A0D16',
            border: `2px solid ${isSent ? '#10B981' : '#F59E0B'}`,
            borderRadius: 20,
            padding: '20px 24px',
            marginBottom: 24,
            boxShadow: `0 0 25px ${isSent ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 16 }}>💬</span>
          <div
            style={{
              flex: 1,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 32,
              fontWeight: 900,
              color: '#FDE68A',
              letterSpacing: '0.08em',
            }}
          >
            {currentTyped}
            {!isSent && (
              <span
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: 32,
                  backgroundColor: '#F59E0B',
                  marginLeft: 6,
                  opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>

          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              backgroundColor: isSent ? '#10B981' : '#F59E0B',
              color: '#050608',
              fontSize: 20,
              fontWeight: 800,
              padding: '12px 24px',
              borderRadius: 14,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            {isSent ? 'ENVIADO ✓' : 'PUBLICAR'}
          </div>
        </div>

        {/* Notificação de DM Enviada */}
        <div
          style={{
            opacity: isSent ? 1 : 0.4,
            transform: isSent ? 'scale(1)' : 'scale(0.97)',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 16,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 22 }}>⚡</span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: isSent ? '#6EE7B7' : '#94A3B8',
            }}
          >
            {isSent
              ? 'Todos os detalhes enviados diretamente no seu Direct!'
              : 'O bot envia a skill completa instantaneamente no direct'}
          </span>
        </div>
      </div>
    </div>
  );
};