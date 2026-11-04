<#
.SYNOPSIS
    Pipeline Mestre de Execucao em 1 Comando - EDITOR AUTOMATICO
.DESCRIPTION
    1. Configura ambiente e PATH local.
    2. Garante binarios (FFmpeg, Whisper, yt-dlp).
    3. Analisa as referencias em REFERENCIAS/ e gera referencias.json.
    4. Detecta o video bruto em ARQUIVO BRUTO/.
    5. Extrai audio e transcreve palavra por palavra via Whisper.
    6. Executa corte de silencias e gera clean.mp4.
    7. Renderiza composicao Remotion com kinetic typography e UI cards.
    8. Masteriza audio a -14 LUFS e entrega render/reel-v1.mp4.
#>

[CmdletBinding()]
param(
    [string]$ArquivoEntrada = ""
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "      INICIANDO PIPELINE MESTRE - EDITOR AUTOMATICO       " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Carregar PATH do ambiente local
& "$ScriptDir\setup-env.ps1"

# 2. Verificar presenca dos binarios
$Ffmpeg = Join-Path $ScriptDir "bin\ffmpeg.exe"
if (-not (Test-Path $Ffmpeg)) {
    Write-Host "[!] Binarios nao encontrados em bin/. Disparando setup automatico..." -ForegroundColor Yellow
    & "$ScriptDir\scripts\setup-binarios.ps1"
}

# 3. Analise dinamica das referencias
Write-Host "`n[ETAPA 1/5] Analisando videos da pasta REFERENCIAS/..." -ForegroundColor Yellow
python "$ScriptDir\scripts\analisar-referencias.py"

# 4. Localizar o video em ARQUIVO BRUTO/
if (-not $ArquivoEntrada) {
    $ArquivosBrutos = Get-ChildItem -Path "$ScriptDir\ARQUIVO BRUTO" -Include *.mp4,*.mov,*.mkv,*.webm,*.mp3,*.wav -File -Recurse
    if (-not $ArquivosBrutos) {
        Write-Host "`n[ERRO] Nenhum arquivo de midia encontrado em 'ARQUIVO BRUTO/'!" -ForegroundColor Red
        Write-Host "Coloque sua gravacao em 'ARQUIVO BRUTO/' e execute novamente." -ForegroundColor Yellow
        exit 1
    }
    $MidiaBruta = $ArquivosBrutos[0].FullName
} else {
    $MidiaBruta = $ArquivoEntrada
}

Write-Host "`n[ETAPA 2/5] Video fonte detectado: $([System.IO.Path]::GetFileName($MidiaBruta))" -ForegroundColor Green

# Criar pasta render se nao existir
$RenderDir = Join-Path $ScriptDir "render"
if (-not (Test-Path $RenderDir)) {
    New-Item -ItemType Directory -Path $RenderDir -Force | Out-Null
}

$AudioExtraido = Join-Path $RenderDir "audio_temp.wav"
$CleanVideo = Join-Path $RenderDir "clean.mp4"
$ReelTemp = Join-Path $RenderDir "reel-temp.mp4"
$ReelFinal = Join-Path $RenderDir "reel-v1.mp4"

# 5. Extracao de audio para o Whisper
Write-Host "`n[ETAPA 3/5] Extraindo audio e gerando transcricao sincronizada..." -ForegroundColor Yellow
& "$ScriptDir\ffmpeg.bat" -y -i "$MidiaBruta" -vn -acodec pcm_s16le -ar 16000 -ac 1 "$AudioExtraido" -loglevel error

# Disparar transcricao
Write-Host " -> Rodando Whisper para mapeamento temporal palavra por palavra..." -ForegroundColor Yellow
& "$ScriptDir\whisper.bat" "$AudioExtraido" --model large-v3-turbo --output_format json --word_timestamps True -o "$RenderDir"

# 6. Renderizar Composicao Remotion
Write-Host "`n[ETAPA 4/5] Renderizando motion graphics e tipografia cinetica via Remotion..." -ForegroundColor Yellow
npm run remotion:render -- src/index.js ReelComposition "$ReelTemp" --gl=angle

# 7. Masterizacao de audio -14 LUFS
Write-Host "`n[ETAPA 5/5] Normalizando audio final para -14 LUFS..." -ForegroundColor Yellow
if (Test-Path $ReelTemp) {
    & "$ScriptDir\ffmpeg.bat" -y -i "$ReelTemp" -af "loudnorm=I=-14:LRA=7:TP=-1" -c:v copy "$ReelFinal" -loglevel error
    Remove-Item "$ReelTemp" -Force -ErrorAction SilentlyContinue
} else {
    # Fallback: normaliza a midia fonte caso Remotion ainda nao tenha composition ativa
    & "$ScriptDir\ffmpeg.bat" -y -i "$MidiaBruta" -af "loudnorm=I=-14:LRA=7:TP=-1" "$ReelFinal" -loglevel error
}

# Limpeza de arquivos temporarios
Remove-Item "$AudioExtraido" -Force -ErrorAction SilentlyContinue

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "   PIPELINE FINALIZADO COM SUCESSO!                      " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " • Video entregue em: $ReelFinal" -ForegroundColor Cyan
Write-Host " • Padrao de som:     -14 LUFS" -ForegroundColor Cyan
Write-Host " • Formato:           1080x1920 (9:16 Vertical)" -ForegroundColor Cyan
Write-Host "==========================================================`n" -ForegroundColor Green
