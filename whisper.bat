@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
set PYTHONIOENCODING=utf-8
if exist "%SCRIPT_DIR%.venv\Scripts\whisper.exe" (
    "%SCRIPT_DIR%.venv\Scripts\whisper.exe" %*
) else (
    "C:\Users\cobain\AppData\Local\Programs\Python\Python311\Scripts\whisper.exe" %*
)
