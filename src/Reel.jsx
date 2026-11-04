import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Background } from './components/Background';
import { Subtitles } from './components/Subtitles';
import { HookScene } from './scenes/HookScene';
import { CodeScene } from './scenes/CodeScene';
import { VsScene } from './scenes/VsScene';
import { ScaleScene } from './scenes/ScaleScene';
import { ProofScene } from './scenes/ProofScene';
import { ViewsScene } from './scenes/ViewsScene';
import { CtaScene } from './scenes/CtaScene';

export const Reel = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07080B' }}>
      {/* Áudio Principal da Voz */}
      <Audio src={staticFile('audio.mp3')} volume={1.0} />

      {/* Background Cinético com Mesh, Grid e Grain */}
      <Background />

      {/* Trilha de Sound Design (SFX Pontuais) */}
      <Sequence from={2} durationInFrames={30}>
        <Audio src={staticFile('sfx/whoosh.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={25} durationInFrames={20}>
        <Audio src={staticFile('sfx/pop.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={45} durationInFrames={20}>
        <Audio src={staticFile('sfx/pop.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={65} durationInFrames={20}>
        <Audio src={staticFile('sfx/stamp.wav')} volume={0.4} />
      </Sequence>

      {/* Transição Cena 2: Código */}
      <Sequence from={105} durationInFrames={30}>
        <Audio src={staticFile('sfx/swoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={125} durationInFrames={40}>
        <Audio src={staticFile('sfx/type.wav')} volume={0.3} />
      </Sequence>

      {/* Transição Cena 3: Versus */}
      <Sequence from={225} durationInFrames={30}>
        <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={240} durationInFrames={30}>
        <Audio src={staticFile('sfx/stamp.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={290} durationInFrames={30}>
        <Audio src={staticFile('sfx/glitch.wav')} volume={0.3} />
      </Sequence>

      {/* Transição Cena 4: Escala */}
      <Sequence from={405} durationInFrames={30}>
        <Audio src={staticFile('sfx/swoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={510} durationInFrames={30}>
        <Audio src={staticFile('sfx/ding.wav')} volume={0.35} />
      </Sequence>

      {/* Transição Cena 5: Prova */}
      <Sequence from={570} durationInFrames={30}>
        <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={650} durationInFrames={30}>
        <Audio src={staticFile('sfx/pop.wav')} volume={0.35} />
      </Sequence>

      {/* Transição Cena 6: Views (+1 Milhão) */}
      <Sequence from={765} durationInFrames={30}>
        <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={830} durationInFrames={45}>
        <Audio src={staticFile('sfx/boom.wav')} volume={0.4} />
        <Audio src={staticFile('sfx/shimmer.wav')} volume={0.3} />
      </Sequence>

      {/* Transição Cena 7: CTA */}
      <Sequence from={990} durationInFrames={30}>
        <Audio src={staticFile('sfx/whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={1050} durationInFrames={20}>
        <Audio src={staticFile('sfx/click.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={1080} durationInFrames={30}>
        <Audio src={staticFile('sfx/ding.wav')} volume={0.45} />
      </Sequence>

      {/* Cenas Visuais */}
      <Sequence from={0} durationInFrames={105} name="Hook">
        <HookScene />
      </Sequence>

      <Sequence from={105} durationInFrames={120} name="Code">
        <CodeScene />
      </Sequence>

      <Sequence from={225} durationInFrames={180} name="Versus">
        <VsScene />
      </Sequence>

      <Sequence from={405} durationInFrames={165} name="Scale">
        <ScaleScene />
      </Sequence>

      <Sequence from={570} durationInFrames={195} name="Proof">
        <ProofScene />
      </Sequence>

      <Sequence from={765} durationInFrames={225} name="Views">
        <ViewsScene />
      </Sequence>

      <Sequence from={990} durationInFrames={192} name="CTA">
        <CtaScene />
      </Sequence>

      {/* Legendas de Alto Impacto */}
      <Subtitles />
    </AbsoluteFill>
  );
};