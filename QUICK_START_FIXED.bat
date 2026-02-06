@echo off
echo ========================================
echo    TK Fajar - Quick Start
echo ========================================
echo.

echo [Step 1] Checking prerequisites...

java -version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Java not found. Please install Java 21.
    pause
    exit /b 1
)
echo ✅ Java found

echo [Step 2] Starting MongoDB...
net start MongoDB >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ⚠️  MongoDB might not be running as service
    echo Trying to start MongoDB manually...
    mongod --dbpath ./data/db --fork --logpath ./data/log
    timeout /t 3 >nul
)

echo [Step 3] Compiling backend...
cd backend

echo Creating minimal Gradle wrapper...
echo @echo off > gradlew.bat
echo java -jar gradle\wrapper\gradle-wrapper.jar %* >> gradlew.bat

if not exist "gradle\wrapper" mkdir gradle\wrapper
if not exist "gradle\wrapper\gradle-wrapper.jar" (
    echo Downloading Gradle wrapper...
    curl -L -o gradle\wrapper\gradle-wrapper.jar https://github.com/gradle/gradle/raw/v8.5.0/gradle/wrapper/gradle-wrapper.jar
)

echo Building with simple Java compilation...
echo Using direct Java compilation...

dir /s /b src\main\java\*.java > sources.txt
javac -cp "lib\*" -d build\classes @sources.txt

if %ERRORLEVEL% equ 0 (
    echo ✅ Backend compiled successfully
) else (
    echo ❌ Backend compilation failed
    echo Using IDE alternative...
    echo.
    echo Please open BackendApplication.java in IntelliJ or Eclipse
    echo and run it as Spring Boot Application
)

echo [Step 4] Starting frontend...
cd ..\frontend
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    npm install
)

echo Starting React development server...
start cmd /k "npm start"

echo.
echo ========================================
echo 🚀 Starting Complete!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🌐 Registration: http://localhost:3000/registration
echo.
echo Press any key to exit...
pause >nul