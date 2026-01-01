#!/bin/bash

# SaveADay Home Page Startup Script
echo "🚀 Starting SaveADay Home Page"

# Function to display usage
show_usage() {
    echo "Usage: ./start.sh [--dev|--prod]"
    echo ""
    echo "Options:"
    echo "  --dev     Start in development mode (with hot reload)"
    echo "  --prod    Start in production mode (optimized build)"
    echo ""
    echo "The application will always run on port 3010"
    exit 1
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo "🔍 Checking for processes on port $port..."
    
    # Find process using the port
    local pid=$(lsof -ti:$port 2>/dev/null)
    
    if [ ! -z "$pid" ]; then
        echo "⚠️  Process $pid is using port $port. Killing it..."
        kill -9 $pid 2>/dev/null
        sleep 2
        
        # Check if process is still running
        if lsof -ti:$port >/dev/null 2>&1; then
            echo "❌ Failed to kill process on port $port"
            exit 1
        else
            echo "✅ Successfully freed port $port"
        fi
    else
        echo "✅ Port $port is available"
    fi
}

# Parse command line arguments
MODE=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --dev)
            MODE="dev"
            shift
            ;;
        --prod)
            MODE="prod"
            shift
            ;;
        --help)
            show_usage
            ;;
        *)
            echo "❌ Unknown option: $1"
            show_usage
            ;;
    esac
done

# Validate arguments
if [ -z "$MODE" ]; then
    echo "❌ Please specify --dev or --prod"
    show_usage
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm detected"

# Kill any existing process on port 3010
kill_port 3010

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Continuing without it..."
    echo "   If environment variables are required, please create a .env file manually."
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the application
if [ "$MODE" = "dev" ]; then
    echo "🔧 Starting in development mode..."
    echo "🌐 Application will be available at http://localhost:3010"
    echo "🔄 Hot reload enabled"
    echo ""
    npm run dev
else
    echo "🏭 Starting in production mode..."
    echo "🔨 Building application..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful"
        echo "🌐 Application will be available at http://localhost:3010"
        echo ""
        PORT=3010 npm run start
    else
        echo "❌ Build failed. Please check the errors above."
        exit 1
    fi
fi

