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
