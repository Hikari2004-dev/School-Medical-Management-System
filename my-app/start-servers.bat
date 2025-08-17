@echo off
echo Starting School Medical Management System...
echo.

echo [1/2] Starting News API Server...
start "News API Server" cmd /k "cd /d src\server && node ServerNew.js"

echo [2/2] Starting React Frontend...
timeout /t 3 /nobreak > nul
start "React Frontend" cmd /k "npm start"

echo.
echo ✅ Both servers are starting up...
echo 📰 News API: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
