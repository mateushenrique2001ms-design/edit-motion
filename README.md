# Editor Automático · Skill para Claude Code

> Motor inteligente para o **Claude Code** para corte, animação e finalização automatizada de vídeos verticais (Reels e Shorts 9:16) unindo **Remotion**, **HyperFrames**, **FFmpeg**, **Whisper** e o design system de **[Prompt Motion](https://prompt-motion.com/)**.

---

## ⚡ Instalação Rápida em Máquina Nova (Quickstart)

Se você acabou de clonar este repositório em um computador novo:

```bash
# 1. Clonar o projeto
git clone https://github.com/mateushenrique2001ms-design/edit-motion.git
cd edit-motion

# 2. Instalar dependências (Node e Python)
npm install
pip install numpy mediapipe opencv-python-headless

# 3. Baixar os binários automáticos (FFmpeg, Whisper e modelo large-v3-turbo)
npm run setup:bins

# 4. Rodar o editor automático
npm run pipeline
```

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

- **[After Effects MCP & Skill](https://github.com/ishu86/after-effects-mcp)**: Controle e automação direta do Adobe After Effects (70+ ferramentas MCP para comps, layers, keyframes, expressões e render).
- **[Remotion](https://www.remotion.dev/)**: Criação de vídeos programáticos em React e renderização headless.
- **[Three.js / React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)**: Mockups 3D de aparelhos (iPhone/Mac), iluminação e texturas realistas para prints.
- **[HyperFrames](https://hyperframes.dev/)**: Animações de alta fidelidade em canvas/DOM com GSAP.
- **[Zod](https://zod.dev/)**: Validação estrita do contrato de dados da timeline (`timeline.json`).
- **[Execa](https://github.com/sindresorhus/execa)**: Execução assíncrona robusta e multiplataforma de subprocessos.
- **[FFmpeg](https://ffmpeg.org/)**: Processamento de vídeo, cortes sem perdas e normalização de loudness a `-14 LUFS`.
- **[Whisper (whisper.cpp)](https://github.com/ggerganov/whisper.cpp)**: Transcrição automatizada com precisão palavra por palavra.
- **[Auto B-Roll](scripts/auto-broll.py)**: Download automático de cenas e vídeos de apoio verticais (Pexels API).
- **[Prompt Motion](https://prompt-motion.com/)**: Referência de Kinetic Typography, layouts Split Screen e sound design.

---

## 🎨 Arsenal de Motion Skills Instalado no Claude (`~/.claude/skills/`)

0. **Adobe After Effects Suite & MCP**:
   - `after-effects` / `after-effects-mcp`: Automação completa do Adobe After Effects através de **70+ ferramentas MCP** — criação de composições, layers de texto/shape, keyframes, interpolações físicas (spring, bounce, elastic), expressões avançadas, presets cinemáticos e exportação. Extensão CEP vinculada em `AppData/Roaming/Adobe/CEP/extensions/com.aemcp.panel`.

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

## 🚀 Como Executar o Editor Automático

### 1. Execução Completa em 1 Comando:
Basta rodar na raiz do projeto:
```powershell
.\executar.ps1
# OU via npm
npm run auto-edit
```
Ele executa o pipeline ponta a ponta:
1. Carrega o PATH e verifica todos os binários essenciais.
2. Analisa os vídeos em `REFERÊNCIAS/` e calibra o `referencias.json`.
3. Detecta a gravação bruta em `ARQUIVO BRUTO/`.
4. Roda o Whisper para transcrição com timestamps palavra por palavra.
5. Renderiza as legendas cinéticas e cards animados com Remotion.
6. Normaliza o áudio final para **−14 LUFS** e entrega em `render/reel-v1.mp4`.

---

## 🛠️ Configuração e Ferramentas

- **Pipeline Multiplataforma (Node.js + Execa + Zod)**:
  ```bash
  npm run pipeline
  ```
- **Busca e Download Automático de B-Rolls**:
  ```bash
  npm run auto-broll
  # OU passando palavras-chave específicas:
  python scripts/auto-broll.py -k "artificial intelligence" "finance" "coding"
  ```
- **Instalar/Baixar Binários Ausentes (FFmpeg, Whisper, yt-dlp)**:
  ```powershell
  npm run setup:bins
  ```
- **Recalcular Métricas das Referências**:
  ```powershell
  npm run analisar:ref
  ```
- **Configurar PATH Local no PowerShell**:
  ```powershell
  .\setup-env.ps1
  ```
