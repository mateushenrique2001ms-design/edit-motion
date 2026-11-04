# Padrões de Design Motion Graphics (prompt-motion.com)

Guia de referência e especificações técnicas de animações inspiradas no ecossistema **Prompt Motion** (`https://prompt-motion.com/`).

---

## 1. Princípios Fundamentais

1. **Movimento Intencional**: Cada movimento de câmera, texto ou card serve para reter a atenção ou ilustrar diretamente uma palavra-chave dita pelo interlocutor.
2. **Animação Orientada a Beats**: A entrada de elementos visuais acontece rigorosamente no timestamp exato (em milissegundos) em que a palavra-chave é proferida.
3. **Alto Contraste & Legibilidade**: Fundo escuro com camadas de profundidade (gradientes mesh sutis, vignette, micro-textura) e elementos de primeiro plano com tipografia em peso pesado (`Bold` / `ExtraBold` / `Black`).

---

## 2. Paleta de Cores e Estilo Visual

- **Base Escura**: `#0A0A0C`, `#121217`, `#181820`
- **Acentos e Destaques**:
  - Destaque Amarelo Neon: `#FFE600` ou `#FFD000`
  - Destaque Verde Neon: `#00FF88`
  - Destaque Roxo/Azul Elétrico: `#6366F1`, `#3B82F6`
  - Branco Puro para Leitura: `#FFFFFF`
  - Cinza de Apoio: `#94A3B8`, `#64748B`

---

## 3. Tipografia Cinética (Kinetic Typography)

- **Famílias Tipográficas Homologadas**:
  - Títulos e Palavras de Impacto: `Anybody`, `Plus Jakarta Sans`, `Inter`, `Syne`
  - Código, Dados e Métricas: `JetBrains Mono`
- **Regras de Exibição**:
  - Posição horizontal centralizada.
  - Alinhamento vertical na faixa dos 65% a 75% da altura da tela (abaixo do queixo/peito, acima da zona de comentários).
  - Nunca exceder 3 a 5 palavras por grupo de exibição.
  - Animação de entrada rápida (100ms a 150ms) usando curva `power2.out`.

---

## 4. Cards de Interface Dinâmica (UI Cards & Split Screens)

- **Estrutura dos Cards**:
  - `border-radius: 24px`
  - `background: rgba(22, 22, 30, 0.85)`
  - `backdrop-filter: blur(16px)`
  - `border: 1px solid rgba(255, 255, 255, 0.12)`
  - `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7)`
- **Transições de Câmera**:
  - **Full Screen**: Câmera fechada no apresentador com punch-in leve (1.0 -> 1.12) nas frases de impacto.
  - **Split Screen**: Apresentador deslocado para card lateral/inferior enquanto o card de conteúdo (código, print, gráfico, demonstração) assume o palco principal.

---

## 5. Sound Design (SFX) Integrado

- **Pop / Tap**: Para surgimento instantâneo de pills, badges e tags.
- **Swoosh / Whoosh**: Para entradas de cards grandes, slides laterais e mudanças de tela.
- **Type / Click**: Para digitação de código ou texto letra por letra.
- **Riser / Boom**: Para momentos de clímax, revelação de dados ou conclusão de raciocínio.
- **Normalização de Áudio**: Efeitos mixados a −20 dBFS para nunca mascarar a voz principal. Master final a −14 LUFS.
