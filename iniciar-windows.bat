@echo off
cd /d "%~dp0"
if not exist .env copy .env.example .env
call npm ci
if errorlevel 1 goto erro
call npm run setup
if errorlevel 1 goto erro
call npm start
exit /b
:erro
echo Verifique o Node.js, a conexao com MySQL e o arquivo .env. Consulte README.md.
pause
