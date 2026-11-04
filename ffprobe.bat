@echo off
set "SCRIPT_DIR=%~dp0"
"%SCRIPT_DIR%bin\ffprobe.exe" %*
