@echo off
echo Building TK Fajar Backend...
echo.

echo [1/3] Checking Java...
java -version
if %ERRORLEVEL% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 21 and try again
    pause
    exit /b 1
)

echo [2/3] Building with Gradle...
cd backend
if exist "gradlew.bat" (
    echo Using Gradle wrapper...
    gradlew.bat build
) else (
    echo Gradle wrapper not found, please install Gradle manually or fix the wrapper
    echo Alternative: Use IDE to run the Spring Boot application directly
    pause
)

echo [3/3] Build completed
pause