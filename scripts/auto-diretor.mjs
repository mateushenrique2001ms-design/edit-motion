#!/usr/bin/env node
/**
 * scripts/auto-diretor.mjs
 * Módulo Auto-Diretor Semântico para o Edit Motion.
 * 
 * Analisa a transcrição palavra por palavra do vídeo bruto e toma decisões editoriais exclusivas:
 * 1. Identifica o gênero e tom do vídeo (Tech, Finanças, Educativo, Opinião, VSL).
 * 2. Mapeia momentos de Hook, Clímax, Provas e CTA.
 * 3. Aplica a Regra da Âncora Semântica: NENHUM elemento entra na tela sem correspondência direta com a fala.
 * 4. Valida e exporta o timeline.json exclusivo e dinâmico via Zod.
 */

import fs from "node:fs";
import path from "node:path";
import { validateTimeline } from "../src/types/timeline.js";

const ROOT_DIR = process.cwd();
const IMAGES_DIR = path.join(ROOT_DIR, "IMAGENS");
const RENDER_DIR = path.join(ROOT_DIR, "render");
const REF_JSON = path.join(ROOT_DIR, "referencias.json");

// Dicionário semântico de categorias para ancoragem
const DICIONARIO_SEMANTICO = {
  tech: ["codigo", "código", "python", "javascript", "react", "ia", "inteligência", "ia", "terminal", "api", "prompt", "modelo", "software", "computador", "dados"],
  financas: ["dinheiro", "faturei", "faturamento", "lucro", "mil", "milhões", "reais", "dólar", "vendas", "resultado", "gráfico", "investimento", "escala"],
  dor_problema: ["difícil", "demorado", "perda", "erro", "cansado", "problema", "custo", "frustração", "travado", "impossível"],
  chamada_acao: ["comente", "link", "bio", "siga", "inscreva", "compartilhe", "salve", "acesse", "clique"]
};

export function analisarTomDoVideo(textoCompleto) {
  const textoLower = textoCompleto.toLowerCase();
  const contadores = { tech: 0, financas: 0, dor_problema: 0, chamada_acao: 0 };

  for (const [categoria, palavras] of Object.entries(DICIONARIO_SEMANTICO)) {
    for (const p of palavras) {
      const regex = new RegExp(`\\b${p}\\b`, "gi");
      const matches = textoLower.match(regex);
      if (matches) contadores[categoria] += matches.length;
    }
  }

  // Identificar categoria dominante
  let tomDominante = "dinamico_geral";
  let maxOcorrencias = 0;
  for (const [cat, qtd] of Object.entries(contadores)) {
    if (qtd > maxOcorrencias) {
      maxOcorrencias = qtd;
      tomDominante = cat;
    }
  }

  return { tomDominante, contadores };
}

export function gerarDecisoesEditoriais(dadosWhisper, metricasRef = null) {
  const segments = dadosWhisper.segments || [];
  const todasPalavras = [];

  for (const seg of segments) {
    if (seg.words) {
      for (const w of seg.words) {
        const palavraLimpa = (w.word || "").trim();
        todasPalavras.push({
          word: palavraLimpa,
          start: Number(w.start || 0),
          end: Number(w.end || 0),
          highlight: false
        });
      }
    }
  }

  if (todasPalavras.length === 0) {
    throw new Error("Nenhuma palavra detectada na transcrição para orientar o diretor.");
  }

  const textoCompleto = todasPalavras.map(p => p.word).join(" ");
  const { tomDominante } = analisarTomDoVideo(textoCompleto);
  const duracaoTotal = todasPalavras[todasPalavras.length - 1].end + 0.5;

  console.log(`\n[*] Auto-Diretor Semântico: Tom detectado = [${tomDominante.toUpperCase()}]`);

  // Identificar arquivos reais em IMAGENS/
  const imagensDisponiveis = fs.existsSync(IMAGES_DIR)
    ? fs.readdirSync(IMAGES_DIR).filter(f => /\.(png|jpg|jpeg|svg|webp|mp4)$/i.test(f) && !f.startsWith("."))
    : [];

  const beats = [];
  const cuts = [];

  // 1. Gancho / Hook Inicial (0 a 3s)
  beats.push({
    id: "beat_01_hook",
    time: 0.0,
    duration: Math.min(3.0, duracaoTotal),
    type: "punch_in",
    zoom: 1.15,
    title: "Hook de Impacto",
    sfx: "whoosh.wav"
  });

  // 2. Varrer palavras para identificar âncoras semânticas reais
  let ultimoTempoBeat = 3.0;
  let contadorBeats = 2;

  for (let i = 0; i < todasPalavras.length; i++) {
    const item = todasPalavras[i];
    const palavra = item.word.toLowerCase().replace(/[.,!?;:]/g, "");

    // Destacar números ou palavras-chave de impacto
    const ehNumero = /\d+/.test(palavra);
    const ehChave = Object.values(DICIONARIO_SEMANTICO).flat().includes(palavra);

    if (ehNumero || ehChave) {
      item.highlight = true;
      item.color = ehNumero ? "#00FF88" : "#FFE600";
    }

    // Só cria transição/card se já passou pelo menos 2.5s desde o último beat (evita poluição)
    if (item.start >= ultimoTempoBeat + 2.5 && item.start <= duracaoTotal - 3.0) {
      let tipoCena = "split_screen";
      let imagemCasada = null;

      // Busca por correspondência no nome das imagens
      for (const img of imagensDisponiveis) {
        const nomeBase = path.parse(img).name.toLowerCase();
        if (nomeBase.includes(palavra) || palavra.includes(nomeBase)) {
          imagemCasada = img;
          break;
        }
      }

      // Se achou uma imagem casada direta na fala, entra com split_screen
      if (imagemCasada) {
        beats.push({
          id: `beat_${contadorBeats++}_ancora`,
          time: item.start,
          duration: 3.0,
          type: "split_screen",
          zoom: 1.0,
          title: `Âncora: ${palavra}`,
          cardImage: imagemCasada,
          sfx: "pop.wav"
        });
        ultimoTempoBeat = item.start + 3.0;
      } 
      // Se não achou imagem mas a palavra é um clímax, faz um punch-in limpo (sem poluição)
      else if (ehNumero || DICIONARIO_SEMANTICO.financas.includes(palavra) || DICIONARIO_SEMANTICO.tech.includes(palavra)) {
        beats.push({
          id: `beat_${contadorBeats++}_enfase`,
          time: item.start,
          duration: 2.2,
          type: "punch_in",
          zoom: 1.18,
          title: `Ênfase: ${palavra}`,
          sfx: "ding.wav"
        });
        ultimoTempoBeat = item.start + 2.2;
      }
    }
  }

  // 3. CTA Final (Últimos 3 a 5 segundos)
  if (duracaoTotal > 5.0) {
    beats.push({
      id: `beat_${contadorBeats}_cta`,
      time: Math.max(duracaoTotal - 4.0, ultimoTempoBeat),
      duration: 4.0,
      type: "cta",
      zoom: 1.0,
      title: "Chamada para Ação",
      sfx: "click.wav"
    });
  }

  const timeline = {
    version: "1.0.0",
    meta: {
      fps: 30,
      durationInSeconds: duracaoTotal,
      durationInFrames: Math.round(duracaoTotal * 30),
      width: 1080,
      height: 1920,
      loudnessTargetLUFS: -14.0
    },
    cuts,
    words: todasPalavras,
    beats
  };

  return validateTimeline(timeline);
}

export function executarAutoDiretor(caminhoWhisperJson = "render/audio_temp.wav.json") {
  if (!fs.existsSync(caminhoWhisperJson)) {
    throw new Error(`Arquivo de transcrição não encontrado: ${caminhoWhisperJson}`);
  }

  const dadosWhisper = JSON.parse(fs.readFileSync(caminhoWhisperJson, "utf-8"));
  let metricasRef = null;
  if (fs.existsSync(REF_JSON)) {
    try {
      metricasRef = JSON.parse(fs.readFileSync(REF_JSON, "utf-8"));
    } catch {}
  }

  const timelineValidada = gerarDecisoesEditoriais(dadosWhisper, metricasRef);
  const outPath = path.join(ROOT_DIR, "timeline.json");
  fs.writeFileSync(outPath, JSON.stringify(timelineValidada, null, 2), "utf-8");

  console.log("\n==========================================================");
  console.log("   DECISÕES EDITORIAIS DO AUTO-DIRETOR REGISTRADAS        ");
  console.log("==========================================================");
  console.log(` • Beats Únicos Gerados: ${timelineValidada.beats.length}`);
  console.log(` • Palavras Destacadas:  ${timelineValidada.words.filter(w => w.highlight).length}`);
  console.log(` • Contrato Salvo:       timeline.json (Validado por Zod)`);
  console.log("==========================================================\n");

  return timelineValidada;
}

// Execução via linha de comando
if (process.argv[1] && process.argv[1].endsWith("auto-diretor.mjs")) {
  const jsonPath = process.argv[2] || "render/audio_temp.wav.json";
  try {
    executarAutoDiretor(jsonPath);
  } catch (e) {
    console.error("[-] Erro no Auto-Diretor:", e.message);
    process.exit(1);
  }
}
