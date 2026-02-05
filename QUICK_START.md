# Quick Start Guide - TK Fajar

## Fixed: Gradle Wrapper Issue

The gradle wrapper files have been created. You can now use the commands below.

## Step-by-Step Start

### 1. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 2. Start Backend
```bash
cd backend
gradlew bootRun
```

### 3. Start Frontend  
```bash
cd frontend
npm install  # First time only
npm start
```

## Alternative: Using System Gradle

If gradlew still doesn't work, you can use system gradle:

### Install Gradle (Windows)
1. Download from: https://gradle.org/install/
2. Extract to: `C:\gradle`
3. Add to PATH: `C:\gradle\gradle-8.5\bin`

### Run with System Gradle
```bash
cd backend
gradle bootRun
```

## One-Click Start (Windows)

Create a `start.bat` file in the project root:

```batch
@echo off
echo Starting TK Fajar Application...
echo.

echo [1/3] Starting MongoDB...
net start MongoDB
timeout /t 2 >nul

echo [2/3] Starting Backend...
cd backend
start "Backend" cmd /c "gradlew bootRun"
timeout /t 5 >nul

echo [3/3] Starting Frontend...
cd ../frontend
start "Frontend" cmd /c "npm start"

echo.
echo Application is starting...
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080/api
echo.
pause
```

## One-Click Start (Linux/macOS)

Create a `start.sh` file in the project root:

```bash
#!/bin/bash
echo "Starting TK Fajar Application..."

echo "[1/3] Starting MongoDB..."
brew services start mongodb-community 2>/dev/null || sudo systemctl start mongod
sleep 2

echo "[2/3] Starting Backend..."
cd backend
./gradlew bootRun &
BACKEND_PID=$!
sleep 5

echo "[3/3] Starting Frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "Application is starting..."
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8080/api"
echo ""
echo "Press Ctrl+C to stop all services"
wait $BACKEND_PID $FRONTEND_PID
```

## Verify Everything Works

1. **MongoDB**: Check if running on port 27017
2. **Backend**: http://localhost:8080/api/registration/health
3. **Frontend**: http://localhost:3000

## Troubleshooting

### If gradlew still doesn't work:
```bash
# Try making it executable (Linux/macOS)
chmod +x backend/gradlew

# Or use system gradle
cd backend
gradle bootRun
```

### Check Java version:
```bash
java -version
# Should be Java 21
```

### Check Node version:
```bash
node --version
npm --version
```

### MongoDB connection issues:
- Make sure MongoDB is running
- Check firewall settings
- Verify connection string in application.properties

## Access Points

- **Main Website**: http://localhost:3000
- **Registration**: http://localhost:3000/registration
- **API Health**: http://localhost:8080/api/registration/health
- **MongoDB Compass**: mongodb://localhost:27017

Now you should be able to run the application successfully!