@echo off
echo 🧪 Testing School Medical Management System
echo ==========================================
echo.

echo 📊 Step 1: Checking Node.js and npm
node --version
npm --version
echo.

echo 📦 Step 2: Checking dependencies
if exist node_modules (
    echo ✅ node_modules exists
) else (
    echo ❌ node_modules not found, installing...
    npm install
)
echo.

echo 🔍 Step 3: Checking file structure
if exist src\server\ServerNew.js (
    echo ✅ Server file exists
) else (
    echo ❌ Server file not found
)

if exist src\pages\News\News.jsx (
    echo ✅ News page exists
) else (
    echo ❌ News page not found
)

if exist src\pages\NewsDetail\NewsDetail.jsx (
    echo ✅ NewsDetail page exists
) else (
    echo ❌ NewsDetail page not found
)

if exist src\data\newsData.js (
    echo ✅ News data exists
) else (
    echo ❌ News data not found
)
echo.

echo 🚀 Step 4: Starting backend server
start "Backend Server" cmd /k "node src/server/ServerNew.js"
echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo 🧪 Step 5: Testing API endpoints
if exist test-fallback.js (
    echo Running API tests...
    node test-fallback.js
) else (
    echo ❌ Test file not found
)
echo.

echo 🌐 Step 6: Starting frontend
echo Opening React app in browser...
start "Frontend" cmd /k "npm start"
echo.

echo 📋 Step 7: Quick health check
timeout /t 3 /nobreak >nul
curl -s http://localhost:5000/api/health && echo ✅ Backend healthy || echo ❌ Backend not responding
echo.

echo 🎉 Test completed!
echo.
echo 📖 Next steps:
echo - Check browser at http://localhost:3000
echo - Check API at http://localhost:5000/api/health
echo - Navigate to News page and test fallback functionality
echo - Try clicking on news articles to test detail page
echo.
echo 📚 Documentation:
echo - README.md - Main documentation
echo - ERROR_HANDLING_GUIDE.md - Error handling
echo - NEWS_GUIDE.md - News system guide
echo - TESTING_GUIDE.md - Testing guide
echo.
pause
