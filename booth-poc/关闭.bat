@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\local-server.ps1" -Action Stop
set "result=%ERRORLEVEL%"
if not "%result%"=="0" pause
exit /b %result%
