# Editor Automático · Skill para Claude Code

> Motor inteligente para o **Claude Code** para corte, animação e finalização automatizada de vídeos verticais (Reels e Shorts 9:16) unindo **Remotion**, **HyperFrames**, **FFmpeg**, **Whisper** e o design system de **[Prompt Motion](https://prompt-motion.com/)**.

---

## 📁 Estrutura de Pastas

```text
EDITOR AUTOMÁTICO/
├── ARQUIVO BRUTO/       # Vídeos e áudios brutos da gravação (.mp4, .mov, .mp3, .wav)
├── REFERÊNCIAS/         # Referências de edição, recortes e notas técnicas
├── IMAGENS/             # Imagens, prints, logos e elementos visuais de apoio
├── render/              # Vídeos finais exportados (.mp4)
├── src/                 # Composições Remotion / Beats e cenas HyperFrames
├── bin/                 # Executáveis locais pré-configurados (FFmpeg, Whisper, yt-dlp)
├── SKILL.md             # Definição e pipeline da skill para o Claude Code
├── PROMPT-MOTION.md     # Especificação de Motion Graphics do Prompt Motion
├── package.json         # Dependências do Remotion, HyperFrames e Playwright
└── setup-env.ps1        # Script para carregar o PATH de todas as ferramentas
```

---

## ⚡ Pilha Tecnológica Integrada

- **[Remotion](https://www.remotion.dev/)**: Criação de vídeos programáticos em React e renderização headless.
- **[HyperFrames](https://hyperframes.dev/)**: Animações de alta fidelidade em canvas/DOM com GSAP.
- **[FFmpeg](https://ffmpeg.org/)**: Processamento de vídeo, cortes sem perdas e normalização de loudness a `-14 LUFS`.
- **[Whisper (whisper.cpp)](https://github.com/ggerganov/whisper.cpp)**: Transcrição automatizada com precisão palavra por palavra.
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)**: Download rápido de mídias e referências em alta resolução.
- **[Prompt Motion](https://prompt-motion.com/)**: Referência de Kinetic Typography, layouts Split Screen e sound design.

---

## 🎨 Arsenal de Motion Skills Instalado no Claude (`~/.claude/skills/`)

1. **Motion Graphics Studio & Vídeo Programático**:
   - `motion-graphics-studio` (haidrrrry/claude-remotion-skill): estúdio completo de motion graphics com Remotion — kinetic typography, transições, overlays (vignette, grain, mesh gradients), sound design e direção de arte.
   - **Suíte Oficial Remotion** (`remotion-dev/skills`):
     - `remotion-best-practices`: regras de ouro de arquitetura e timing
     - `remotion-markup`: tipografia cinética, layouts e transições de tela
     - `remotion-captions`: legendagem e sincronia de fala
     - `remotion-maps`: rotas e mapas animados com Mapbox/Cesium
     - `remotion-studio` & `remotion-render`: pré-visualização ao vivo e exportação CLI
     - `remotion-create`, `remotion-multimedia`, `remotion-interactivity`, `remotion-saas`

2. **Animação Vetorial & Timeline (GSAP Suite Oficial)**:
   - `gsap-core`: tweens, eases e sintaxe moderna
   - `gsap-timeline`: orquestração de sequências complexas
   - `gsap-scrolltrigger`: animações guiadas por scroll e scrub
   - `gsap-plugins`: MorphSVG, MotionPath, SplitText, Flip
   - `gsap-react` & `gsap-frameworks`: integração com React, Next.js e ciclo de vida
   - `gsap-performance` & `gsap-utils`: otimização de render e funções matemáticas

3. **Motion 3D, Shaders & WebGL (Three.js Suite)**:
   - `threejs-animation`: animações esqueléticas, morph targets e keyframes
   - `threejs-shaders`: GLSL customizado, shaders de pós-processamento e efeitos visuais
   - `threejs-react-three-fiber`: ecossistema R3F/Drei para animações declarativas
   - `threejs-postprocessing`, `threejs-materials`, `threejs-lighting`, `threejs-fundamentals`

4. **Micro-Interações & Vetores Lottie**:
   - `motion-design` / `lottie-motion-design` (LottieFiles): princípios de motion design, animações dotLottie, máquinas de estado e renderização interativa.

5. **Animações Técnicas & Explicativas**:
   - `manim` / `manim-skill` (ManimCE): pipeline completo Python para renderizar animações geométricas, equações vetoriais e vídeos didáticos.

6. **Motor de Edição Automática de Reels**:
   - `reel` / `skill-reel` (Felpborges/skill-reel): corte pelo som, eliminação de vícios e motor VSL 9:16 a −14 LUFS.

---

## 🚀 Como Usar no Claude Code

1. Instale ou aponte esta skill no Claude Code:
   ```bash
   git clone <url-do-repositorio> ~/.claude/skills/editor-automatico
   ```
2. No Claude Code, basta colocar seu arquivo na pasta `ARQUIVO BRUTO/` e executar:
   ```text
   edita o vídeo bruto em ARQUIVO BRUTO usando as referências de prompt-motion
   ```
3. O Claude executará o ciclo completo:
   - Limpeza de pausas e gaguejos via Whisper + FFmpeg.
   - Sincronia de legendas cinéticas (Kinetic Typography).
   - Inserção de cards e elementos de `IMAGENS/` ancorados nas palavras-chave.
   - Renderização final e normalização em `render/reel-v1.mp4`.

---

## 🛠️ Configuração do Ambiente Local

Para carregar todas as ferramentas locais na sua sessão do PowerShell:
```powershell
.\setup-env.ps1
```

E para instalar as dependências do ecossistema Node:
```bash
npm install
```
