---
name: editor-automatico
description: Edita Reels e Shorts verticais (9:16) automaticamente com Remotion, HyperFrames, FFmpeg, Whisper e referências do Prompt Motion (prompt-motion.com). Executa corte de áudio/voz, alinhamento palavra por palavra, kinetic typography, cards animados de UI e mixagem a -14 LUFS.
---

# SKILL: EDITOR AUTOMÁTICO (Prompt Motion + Remotion + HyperFrames)

Skill avançada para o **Claude Code** automatizar o fluxo completo de edição de vídeo vertical 9:16: da gravação bruta até o render final polido.

---

## 1. Estrutura de Pastas de Trabalho

O projeto opera sob o diretório base:

```text
EDITOR AUTOMÁTICO/
├── ARQUIVO BRUTO/       <- Vídeos (.mp4/.mov) e áudios (.mp3/.wav) brutos da gravação
├── REFERÊNCIAS/         <- Vídeos de referência, guias de estilo e prompts de motion
├── IMAGENS/             <- Logos, ícones, prints, recortes e assets visuais (PNG/SVG/JPG)
├── render/              <- Vídeo final exportado (ex: render/reel-v1.mp4)
├── src/                 <- Composições Remotion / scripts de beats HyperFrames
├── bin/                 <- Binários locais (FFmpeg, Whisper, yt-dlp)
├── package.json         <- Remotion, HyperFrames, GSAP e Playwright
└── SKILL.md             <- Instruções deste motor de automação
```

---

## 2. Pilha de Ferramentas & Arsenal de Motion Skills

| Ferramenta / Suite | Papel no Pipeline |
|---|---|
| **FFmpeg** | Extração de áudio, normalização para `-14 LUFS`, cortes J/L, mesclagem final de trilha/SFX. |
| **Whisper (whisper-cli)** | Transcrição precisa com timestamps no nível da palavra para sincronia cinética. |
| **Remotion** | Renderização programática em React, timeline dinâmica, exportação headless acelerada. |
| **HyperFrames + GSAP** | Animação de interface, kinetic typography, easing suave (`power2.out`, `back.out(1.7)`). |
| **yt-dlp** | Download de referências ou materiais de apoio sob demanda. |
| **MediaPipe / OpenCV** | Detecção e rastreamento da boca/olhos para enquadramento inteligente e zonas seguras 9:16. |

### Arsenal de Skills Conectadas no Claude Code (`~/.claude/skills/`):
- **Motion Graphics Studio**: `motion-graphics-studio` (Remotion art direction, mesh gradients, grain, sound design).
- **Suíte Oficial Remotion**: `remotion-best-practices`, `remotion-markup`, `remotion-captions`, `remotion-maps`, `remotion-studio`, `remotion-render`, `remotion-create`, `remotion-multimedia`, `remotion-interactivity`, `remotion-saas`.
- **GSAP Suite Oficial**: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins` (MorphSVG, SplitText, Flip), `gsap-react`, `gsap-frameworks`, `gsap-performance`, `gsap-utils`.
- **Three.js 3D & Shaders Suite**: `threejs-animation`, `threejs-shaders`, `threejs-react-three-fiber`, `threejs-postprocessing`, `threejs-materials`, `threejs-lighting`, `threejs-fundamentals`.
- **Micro-Interações Lottie**: `motion-design`, `lottie-motion-design`.
- **Animações Técnicas & Didáticas**: `manim`, `manim-skill` (ManimCE).
- **Motor de Edição Automática de Reels**: `reel` / `skill-reel` (corte pelo som, detecção de vícios, -14 LUFS).

---

## 3. Diretrizes de Design do Prompt Motion (`prompt-motion.com`)

Toda animação e composição deve seguir os padrões de Motion Graphics consagrados no **Prompt Motion**:

1. **Kinetic Typography (Tipografia Cinética)**:
   - Texto sincronizado à fala com marcação milissegundo a milissegundo.
   - Destaque em cores primárias (amarelo vibrante, verde neon ou branco em alto contraste sobre fundo escuro).
   - Efeito de escala/punch sutil (1.0 -> 1.08) na palavra atual falada.
   - Posição mantida na zona segura vertical (nunca cobrir a boca nem encostar nos botões do Instagram/TikTok).

2. **Dynamic UI Cards (Peças de Interface Animadas)**:
   - Apresentador alternando entre tela cheia com punch-in e tela dividida com card flutuante.
   - Cards com cantos arredondados (`rounded-2xl` a `rounded-3xl`), sombra profunda (`box-shadow: 0 20px 40px rgba(0,0,0,0.4)`), borda sutil (`border: 1px solid rgba(255,255,255,0.1)`).
   - Glassmorphism com backdrop blur sutil.

3. **Sound Design Cirúrgico**:
   - Cada entrada de card tem um SFX correspondente (`pop.wav`, `whoosh.wav`, `stamp.wav`).
   - Cada corte ou transição de bloco de fala tem um `swoosh` suave ou corte seco com energia.
   - Volume de efeitos calibrado entre `-18 dB` e `-22 dB`, garantindo clareza total da voz do apresentador.
   - Áudio final normalizado em **−14 LUFS** com teto de pico em **−1.0 dBFS**.

---

## 4. Pipeline de Execução Passo a Passo

### Passo 1: Ingestão e Verificação
1. Verificar novos arquivos em `ARQUIVO BRUTO/`.
2. Identificar a resolução e framerate do vídeo fonte via `ffprobe`:
   ```bash
   .\ffprobe.bat -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "ARQUIVO BRUTO/video.mp4"
   ```

### Passo 2: Extração de Áudio e Transcrição com Whisper
1. Extrair faixa de áudio limpa:
   ```bash
   .\ffmpeg.bat -i "ARQUIVO BRUTO/video.mp4" -vn -acodec pcm_s16le -ar 16000 -ac 1 temp_audio.wav
   ```
2. Gerar transcrição palavra por palavra:
   ```bash
   .\whisper.bat temp_audio.wav --model large-v3-turbo --output_format json --word_timestamps True
   ```
3. Mapear silêncios, pausas mortas (> 0.4s) e vícios de linguagem ("ééé", "tipo", repetições acidentais).

### Passo 3: Corte Editorial e Limpeza
1. Executar corte automatizado eliminando os trechos rejeitados.
2. Aplicar cortes em vales de energia sonora para evitar estalos de áudio (crossfade de 15ms).
3. Gerar vídeo bruto limpo: `render/clean.mp4` e mapa temporal sincronizado `palavras.json`.

### Passo 4: Composição de Motion (Remotion / HyperFrames)
1. Integrar as referências visuais de `REFERÊNCIAS/` e assets de `IMAGENS/`.
2. Definir a timeline de beats:
   - Transições de enquadramento (Zoom 1.0x -> 1.15x -> Split Screen).
   - Cards e mockups de tela subindo em coordenadas de destaque.
   - Legenda cinética acompanhando a voz.
3. Pré-visualizar ou compilar os frames da composição.

### Passo 5: Render e Pós-produção de Áudio
1. Renderizar o vídeo 1080x1920 a 30fps/60fps:
   ```bash
   npm run remotion:render -- src/index.ts ReelComposition render/reel-v1.mp4
   # OU via HyperFrames
   npx hyperframes render src/index.html -o render/reel-v1.mp4 --fps 30 --width 1080 --height 1920
   ```
2. Processar mixagem de áudio com filtro `loudnorm`:
   ```bash
   .\ffmpeg.bat -i render/reel-v1.mp4 -af "loudnorm=I=-14:LRA=7:TP=-1" -c:v copy render/reel-v1-final.mp4
   ```

---

## 5. Regras da Casa (Invariantes de Qualidade)

1. **Rosto Livre**: Nenhum card de texto ou gráfico pode cobrir os olhos ou a boca do apresentador.
2. **Zona Segura 9:16**: Manter elementos interativos longe dos 250px do topo e 320px do rodapé (área ocupada pela interface do Instagram/TikTok).
3. **Sem Cortes Bruscos em Palavras**: Jamais cortar a cauda de uma consoante ou o ataque de uma vogal.
4. **Precisão de Cor e Nitidez**: Manter o espaço de cor Rec.709 ou sRGB fiel ao original.
5. **Autonomia Completa**: Recebido o arquivo bruto, entregar o vídeo em `render/` totalmente finalizado e com relatório de métricas.
