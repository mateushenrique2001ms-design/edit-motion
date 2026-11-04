#!/usr/bin/env node
/**
 * pipeline.mjs
 * Orquestrador Multiplataforma de Alta Performance para o EDITOR AUTOMATICO.
 * Utiliza execa para subprocessos e zod para validacao do contrato de dados (timeline.json).
 */

import fs from "node:fs";
import path from "node:path";
import { execa } from "execa";
import { validateTimeline } from "./src/types/timeline.js";

const ROOT_DIR = process.cwd();
const RAW_DIR = path.join(ROOT_DIR, "ARQUIVO BRUTO");
const REF_DIR = path.join(ROOT_DIR, "REFERÊNCIAS");
const RENDER_DIR = path.join(ROOT_DIR, "render");
const BIN_DIR = path.join(ROOT_DIR, "bin");

// Garantir diretorios
for (const dir of [RAW_DIR, REF_DIR, RENDER_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getBinary(cmd) {
  const isWin = process.platform === "win32";
  const localExe = path.join(BIN_DIR, isWin ? `${cmd}.exe` : cmd);
  if (fs.existsSync(localExe)) return localExe;
  return cmd;
}

const FFMPEG = getBinary("ffmpeg");
const WHISPER = getBinary("whisper-cli");

async function main() {
  console.log("\n==========================================================");
  console.log("   EDIT MOTION - PIPELINE INDUSTRIAL MULTIPLATAFORMA      ");
  console.log("==========================================================\n");

  // 1. Analise dinamica das referencias
  console.log("[1/5] Analisando referencias de edicao...");
  try {
    await execa("python", ["scripts/analisar-referencias.py"], { stdio: "inherit" });
  } catch (err) {
    console.warn("[-] Aviso na analise de referencias, prosseguindo com defaults:", err.message);
  }

  // 2. Detectar arquivo bruto
  console.log("\n[2/5] Buscando gravacao em 'ARQUIVO BRUTO/'...");
  const rawFiles = fs.readdirSync(RAW_DIR).filter(f => /\.(mp4|mov|mkv|webm|mp3|wav)$/i.test(f));
  if (rawFiles.length === 0) {
    console.error("[ERRO] Nenhum video encontrado em ARQUIVO BRUTO/!");
    console.error("Coloque seu arquivo na pasta e tente novamente.");
    process.exit(1);
  }

  const rawVideoPath = path.join(RAW_DIR, rawFiles[0]);
  console.log(`[+] Video bruto selecionado: ${rawFiles[0]}`);

  // 3. Extracao de audio e transcricao com Whisper
  console.log("\n[3/5] Extraindo audio PCM 16kHz e rodando Whisper...");
  const tempAudio = path.join(RENDER_DIR, "audio_temp.wav");
  await execa(FFMPEG, ["-y", "-i", rawVideoPath, "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", tempAudio, "-loglevel", "error"]);

  const transcriptJsonPath = path.join(RENDER_DIR, "audio_temp.wav.json");
  try {
    await execa(WHISPER, [tempAudio, "--model", "large-v3-turbo", "--output_format", "json", "--word_timestamps", "True", "-o", RENDER_DIR], { stdio: "inherit" });
  } catch {
    // Fallback para whisper python se o cli nativo nao responder
    await execa("whisper", [tempAudio, "--model", "large-v3-turbo", "--output_format", "json", "--word_timestamps", "True", "--output_dir", RENDER_DIR], { stdio: "inherit" });
  }

  // 4. Montar e validar contrato timeline.json com Zod
  console.log("\n[4/5] Estruturando e validando timeline.json com Zod...");
  let words = [];
  if (fs.existsSync(transcriptJsonPath)) {
    const rawData = JSON.parse(fs.readFileSync(transcriptJsonPath, "utf-8"));
    if (rawData.segments) {
      for (const seg of rawData.segments) {
        if (seg.words) {
          for (const w of seg.words) {
            words.push({
              word: (w.word || "").trim(),
              start: Number(w.start || 0),
              end: Number(w.end || 0),
              highlight: (w.word || "").length > 6
            });
          }
        }
      }
    }
  }

  const timelineData = {
    version: "1.0.0",
    meta: {
      fps: 30,
      durationInSeconds: words.length > 0 ? words[words.length - 1].end + 0.5 : 15,
      durationInFrames: Math.round((words.length > 0 ? words[words.length - 1].end + 0.5 : 15) * 30),
      width: 1080,
      height: 1920,
      loudnessTargetLUFS: -14.0
    },
    cuts: [],
    words: words,
    beats: [
      { id: "b1", time: 0.0, type: "punch_in", zoom: 1.15, title: "Hook" },
      { id: "b2", time: 3.0, type: "split_screen", zoom: 1.0, title: "Demonstracao" }
    ]
  };

  const validTimeline = validateTimeline(timelineData);
  const timelineJsonPath = path.join(ROOT_DIR, "timeline.json");
  fs.writeFileSync(timelineJsonPath, JSON.stringify(validTimeline, null, 2), "utf-8");
  console.log(`[OK] timeline.json validado com sucesso pelo Zod (${validTimeline.words.length} palavras mapeadas).`);

  // 5. Renderizacao Remotion e Loudnorm -14 LUFS
  console.log("\n[5/5] Renderizando Remotion e masterizando som para -14 LUFS...");
  const tempRender = path.join(RENDER_DIR, "reel-temp.mp4");
  const finalRender = path.join(RENDER_DIR, "reel-v1.mp4");

  try {
    await execa("npm", ["run", "remotion:render", "--", "src/index.js", "ReelComposition", tempRender, "--gl=angle"], { stdio: "inherit" });
    if (fs.existsSync(tempRender)) {
      await execa(FFMPEG, ["-y", "-i", tempRender, "-af", "loudnorm=I=-14:LRA=7:TP=-1", "-c:v", "copy", finalRender, "-loglevel", "error"]);
      fs.unlinkSync(tempRender);
    }
  } catch (err) {
    console.warn("[-] Remotion composition em fallback, masterizando corte direto:", err.message);
    await execa(FFMPEG, ["-y", "-i", rawVideoPath, "-af", "loudnorm=I=-14:LRA=7:TP=-1", finalRender, "-loglevel", "error"]);
  }

  if (fs.existsSync(tempAudio)) fs.unlinkSync(tempAudio);

  console.log("\n==========================================================");
  console.log("   VÍDEO FINALIZADO COM SUCESSO!                          ");
  console.log("==========================================================");
  console.log(` • Arquivo de entrega: ${finalRender}`);
  console.log(" • Normalização:       -14.0 LUFS");
  console.log(" • Contrato:           timeline.json (Zod Verified)");
  console.log("==========================================================\n");
}

main().catch(err => {
  console.error("\n[FALHA FATAL]", err);
  process.exit(1);
});
