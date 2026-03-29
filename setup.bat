@echo off
REM 🚀 Study Helper AI - Quick Setup Script for Windows
REM Run this file to get started: setup.bat

echo.
echo 📚 Welcome to Study Helper AI Setup!
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo 📥 Please download from: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js is installed
for /f "tokens=*" %%i in ('node -v') do echo    Version: %%i
for /f "tokens=*" %%i in ('npm -v') do echo    npm Version: %%i
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo (This may take 2-3 minutes...)
call npm install

if errorlevel 1 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed!
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    copy .env.example .env.local >nul
    echo ✅ .env.local created (using demo keys)
) else (
    echo ✅ .env.local already exists
)

echo.
echo ====================================
echo 🎉 Setup Complete!
echo ====================================
echo.

echo Next steps:
echo.
echo 1. Start the development server:
echo    npm run dev
echo.
echo 2. Open your browser and go to:
echo    http://localhost:3000
echo.
echo 3. Try signing in with demo account:
echo    Email: demo@example.com
echo    Password: demo123
echo.
echo Or create a new account to get started!
echo.
echo 📚 Read more:
echo    - QUICKSTART.md (quick guide)
echo    - README.md (full documentation)
echo    - INTEGRATION_GUIDE.md (API setup)
echo.
echo Happy studying! 🎓
echo.
pause
