<#
.SYNOPSIS
    Script de Setup e Download Automatizado dos Binarios Locais (FFmpeg, Whisper, yt-dlp e modelo Whisper).
.DESCRIPTION
    Verifica a presenca dos executaveis essenciais na pasta bin/.
    Caso algum esteja ausente, realiza o download e configuracao automatica.
#>

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
$BinDir = Join-Path $ProjectDir "bin"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   SETUP DE BINARIOS LOCAIS - EDITOR AUTOMATICO           " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $BinDir)) {
    New-Item -ItemType Directory -Path $BinDir -Force | Out-Null
    Write-Host "[+] Pasta bin/ criada em: $BinDir" -ForegroundColor Green
}

# 1. Checar yt-dlp
$YtDlpExe = Join-Path $BinDir "yt-dlp.exe"
if (-not (Test-Path $YtDlpExe)) {
    Write-Host "[*] Baixando yt-dlp oficial do GitHub..." -ForegroundColor Yellow
    $YtDlpUrl = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
    Invoke-WebRequest -Uri $YtDlpUrl -OutFile $YtDlpExe
    Write-Host "[OK] yt-dlp.exe instalado com sucesso." -ForegroundColor Green
} else {
    Write-Host "[OK] yt-dlp.exe ja presente em bin/." -ForegroundColor Green
}

# 2. Checar FFmpeg e FFprobe
$FfmpegExe = Join-Path $BinDir "ffmpeg.exe"
$FfprobeExe = Join-Path $BinDir "ffprobe.exe"
if ((-not (Test-Path $FfmpegExe)) -or (-not (Test-Path $FfprobeExe))) {
    Write-Host "[*] FFmpeg/FFprobe nao encontrados em bin/." -ForegroundColor Yellow
    # Verifica se existe no PATH global do sistema
    $SystemFfmpeg = Get-Command "ffmpeg" -ErrorAction SilentlyContinue
    if ($SystemFfmpeg) {
        $SourceDir = Split-Path -Parent $SystemFfmpeg.Source
        Write-Host "[*] Copiando FFmpeg detectado no sistema ($SourceDir)..." -ForegroundColor Yellow
        Copy-Item (Join-Path $SourceDir "ffmpeg.exe") $FfmpegExe -Force -ErrorAction SilentlyContinue
        Copy-Item (Join-Path $SourceDir "ffprobe.exe") $FfprobeExe -Force -ErrorAction SilentlyContinue
        Copy-Item (Join-Path $SourceDir "ffplay.exe") (Join-Path $BinDir "ffplay.exe") -Force -ErrorAction SilentlyContinue
    }
    
    # Se ainda nao estiver presente, faz o download do release oficial do Gyan
    if (-not (Test-Path $FfmpegExe)) {
        Write-Host "[*] Baixando build estavel do FFmpeg (gyan.dev)..." -ForegroundColor Yellow
        $ZipUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
        $ZipPath = Join-Path $env:TEMP "ffmpeg-essentials.zip"
        Invoke-WebRequest -Uri $ZipUrl -OutFile $ZipPath
        
        Write-Host "[*] Extraindo binarios para bin/..." -ForegroundColor Yellow
        $ExtractDir = Join-Path $env:TEMP "ffmpeg-extracted"
        Expand-Archive -Path $ZipPath -DestinationPath $ExtractDir -Force
        
        $ExtractedBins = Get-ChildItem -Path $ExtractDir -Recurse -Filter "ffmpeg.exe"
        if ($ExtractedBins) {
            $SrcBinFolder = Split-Path -Parent $ExtractedBins[0].FullName
            Copy-Item "$SrcBinFolder\*.exe" $BinDir -Force
        }
        Remove-Item $ZipPath -Force -ErrorAction SilentlyContinue
        Remove-Item $ExtractDir -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "[OK] FFmpeg extraido e instalado em bin/." -ForegroundColor Green
    }
} else {
    Write-Host "[OK] FFmpeg e FFprobe ja presentes em bin/." -ForegroundColor Green
}

# 3. Checar Modelo do Whisper
$CacheDir = Join-Path $env:USERPROFILE ".cache\whisper-cpp"
$ModelFile = Join-Path $CacheDir "ggml-large-v3-turbo.bin"
if (-not (Test-Path $ModelFile)) {
    Write-Host "[*] Modelo Whisper (large-v3-turbo) nao encontrado em $CacheDir." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $CacheDir -Force | Out-Null
    Write-Host "[*] Baixando ggml-large-v3-turbo.bin do HuggingFace (~1.6GB)..." -ForegroundColor Yellow
    $ModelUrl = "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin"
    Invoke-WebRequest -Uri $ModelUrl -OutFile $ModelFile
    Write-Host "[OK] Modelo Whisper baixado com sucesso." -ForegroundColor Green
} else {
    Write-Host "[OK] Modelo Whisper large-v3-turbo ja disponivel em cache." -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   TODOS OS BINARIOS E MODELOS ESTAO PRONTOS!            " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
