$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$env:Path = "$ScriptDir\bin;$ScriptDir\.venv\Scripts;$ScriptDir\node_modules\.bin;" + $env:Path
Write-Host "[OK] Ambiente configurado no PowerShell: FFmpeg, Whisper, yt-dlp, Remotion e HyperFrames prontos." -ForegroundColor Green
