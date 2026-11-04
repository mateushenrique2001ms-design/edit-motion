# 🎬 Tutorial: Fluxo de Trabalho para Vídeos Virais no Instagram (Reels 9:16)

Guia prático e técnico de produção de alta retenção no **Instagram / TikTok**, adaptando dinamicamente o estilo dos **vídeos colocados na pasta `REFERÊNCIAS/`** somado às referências visuais de **[Prompt Motion](https://prompt-motion.com/)** e a automação do ecossistema **Remotion + HyperFrames + Whisper + FFmpeg**.

---

## 1. Anatomia do Reel de Alta Retenção (0 a 60s)

A retenção do algoritmo do Instagram é definida nos primeiros **3 segundos** e sustentada a cada **1.5 a 2 segundos** por estímulos visuais ou auditivos sincronizados com a fala.

```text
[00:00 - 00:03] ──> O GANCHO (HOOK DE IMPACTO)
                    • Zoom 1.15x imediato no rosto ou corte seco
                    • Legenda em CAIXA ALTA com cor de contraste (amarelo/verde neon)
                    • SFX de impacto (Whoosh + Boom grave)

[00:03 - 00:15] ──> O PROBLEMA / TENSÃO
                    • Tela dividida (Split Screen): Apresentador em card inferior/lateral
                    • Entrada de mockup de UI / print do problema com sombra profunda
                    • B-Roll animado ilustrando a dor

[00:15 - 00:45] ──> A REVELAÇÃO & DEMONSTRAÇÃO (ESTILO PROMPT MOTION)
                    • Troca de ritmo a cada frase-chave
                    • Palavras de impacto disparam micro-animações (Cards, Logos, Ícones)
                    • Kinetic Typography: 2 a 3 palavras por linha que pulsam com a voz

[00:45 - 00:60] ──> CHAMADA PARA AÇÃO (CTA)
                    • Retorno para câmera cheia (Full Screen)
                    • Badge animado com o comando de ação ("Comente X", "Link na Bio")
                    • SFX de confirmação (Click / Ding)
```

---

## 2. Preparação de Mídia e Pastas

Organize seus materiais nas pastas do projeto:

```text
EDITOR AUTOMÁTICO/
├── ARQUIVO BRUTO/       <- Jogue o vídeo bruto gravado (ex: gravar_01.mp4)
├── REFERÊNCIAS/         <- Coloque qualquer vídeo que você queira que sirva de modelo de edição
├── IMAGENS/             <- Logos, prints de telas, ícones SVG, fotos de apoio
└── render/              <- Onde sairá o vídeo final aprovado (reel-v1.mp4)
```

---

## 3. As 5 Fases do Fluxo Automatizado Baseado em Referências

### FASE 0: Análise Dinâmica da Pasta REFERÊNCIAS/
> **Objetivo**: Extrair a identidade de edição de qualquer vídeo que você colocar na pasta modelo.
- Frequência e ritmo dos cortes (segundos por frase).
- Padrão de escala (Close / Médio / Split).
- Posicionamento e cores predominantes nos elementos gráficos.

---

### FASE 1: Corte Cirúrgico do Áudio (Whisper + FFmpeg)
> **Objetivo**: Eliminar respiradas, "ééés", pausas mortas acima de 0.35s e erros de gravação.

1. **Transcrição Palavra por Palavra**:
   O Whisper mapeia a energia de cada fonema com timestamps exatos:
   ```bash
   .\whisper.bat "ARQUIVO BRUTO/video.mp4" --model large-v3-turbo --word_timestamps True --output_format json
   ```
2. **Corte no Vale de Silêncio**:
   O corte nunca é feito no meio de uma onda sonora. O FFmpeg executa cortes em micro-fades de 15ms para evitar qualquer clique ou estalo sonoro.

---

### FASE 2: Direção de Enquadramento e Zona Segura 9:16
> **Objetivo**: Rosto sempre visível, sem competir com a interface do Instagram.

1. **Zona Segura (Safe Zone)**:
   - Topo: Deixar livres os primeiros **250px** (nome do usuário e cabeçalho).
   - Rodapé: Deixar livres os últimos **320px** (área de comentários, legenda e áudio).
   - Lateral Direita: Deixar margem de **120px** (ícones de curtir, comentar e compartilhar).
2. **Enquadramento com MediaPipe / OpenCV**:
   O rosto do apresentador é detectado automaticamente para garantir que cards flutuantes nunca cubram olhos ou boca.

---

### FASE 3: Kinetic Typography (Padrão Prompt Motion)
> **Objetivo**: Prender os olhos do espectador palavra por palavra.

1. **Tipografia de Alto Contraste**:
   - Fonte primária: `Anybody-Bold` ou `PlusJakartaSans-Bold`.
   - Cores: Fundo escuro com texto Branco `#FFFFFF` e destaque em Amarelo Neon `#FFE600`.
2. **Animação de Pulso na Palavra Falada**:
   - Conforme a palavra é dita, ela recebe um `scale(1.08)` e troca para a cor de destaque, voltando para `1.0` logo em seguida.
   - Posição: Centrada horizontalmente na faixa dos 68% da altura vertical da tela.

---

### FASE 4: Peças de Interface Animada (UI Cards & Split Screens)
> **Objetivo**: Inspirado nas referências da pasta. Cada termo técnico vira um objeto tridimensional ou de interface.

1. **Cards Flutuantes com Glassmorphism**:
   - `background: rgba(18, 18, 24, 0.90)`
   - `border: 1px solid rgba(255, 255, 255, 0.15)`
   - `border-radius: 24px`
   - `box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5)`
2. **Easing Suave no GSAP / HyperFrames**:
   - Entrada de cards: `gsap.from(card, { y: 60, opacity: 0, duration: 0.45, ease: "power3.out" })`
   - Saída de cards: `gsap.to(card, { opacity: 0, scale: 0.95, duration: 0.25, ease: "power2.in" })`

---

### FASE 5: Sound Design de Precisão e Masterização −14 LUFS
> **Objetivo**: Áudio potente, sem distorção e com peso em fones e alto-falantes de celular.

1. **Efeitos Sonoros (SFX)**:
   - Na entrada de cada card de UI: `swoosh.wav` ou `pop.wav` a `-20 dB`.
   - Na revelação de métricas/dados: `ding.wav` ou `stamp.wav` a `-18 dB`.
   - Nas transições de cena: `whoosh.wav` com corte seco de áudio.
2. **Normalização Final**:
   ```bash
   .\ffmpeg.bat -i render/reel-temp.mp4 -af "loudnorm=I=-14:LRA=7:TP=-1" -c:v copy render/reel-v1.mp4
   ```

---

## 4. Como Executar o Fluxo no Claude Code

Com a skill e as ferramentas instaladas, basta executar no Claude Code:

```text
edita o vídeo de ARQUIVO BRUTO se baseando nos vídeos da pasta REFERÊNCIAS/:
- Extrai o ritmo e o padrão visual dos vídeos de referência
- Aplica o corte de áudio sem silêncios e sem vícios
- Aplica a tipografia cinética estilo prompt-motion
- Adiciona os cards de IMAGENS/ ancorados nas palavras-chave da fala
- Normaliza o som para -14 LUFS
- Entrega o resultado em render/reel-v1.mp4
```

O Claude Code aciona o pipeline, gera a composição e entrega o arquivo final pronto para postagem.
