#!/bin/bash

# Kill Development Processes Script
# This script kills all Node.js, npm, and development server processes

echo "🔍 Finding development processes..."

# Kill all Node.js processes (except system ones)
echo "📦 Killing Node.js processes..."
pkill -f "node.*tsx.*watch" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true
pkill -f "node.*express" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true

# Kill specific development servers
echo "🌐 Killing development servers..."
pkill -f "vite" 2>/dev/null || true
pkill -f "esbuild" 2>/dev/null || true

# Kill processes on common development ports
echo "🚪 Freeing up development ports..."
for port in 3000 5173 8080 4000 5000; do
    pid=$(lsof -ti :$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "   Killing process $pid on port $port"
        kill -9 $pid 2>/dev/null || true
    fi
done

# Wait a moment for processes to terminate
sleep 1

# Check if any processes are still running
echo "🔍 Checking for remaining processes..."
remaining=$(ps aux | grep -E "(node|npm|vite|tsx)" | grep -v grep | grep -v "chrome-devtools-mcp\|mcp-modus" | wc -l)

if [ "$remaining" -gt 0 ]; then
    echo "⚠️  Some processes may still be running:"
    ps aux | grep -E "(node|npm|vite|tsx)" | grep -v grep | grep -v "chrome-devtools-mcp\|mcp-modus"
    echo ""
    echo "💡 You can manually kill them with: pkill -f 'process-name'"
else
    echo "✅ All development processes killed successfully!"
fi

# Show available ports
echo ""
echo "🚪 Checking port availability..."
for port in 3000 5173 8080; do
    if lsof -i :$port >/dev/null 2>&1; then
        echo "   Port $port: ❌ Still in use"
    else
        echo "   Port $port: ✅ Available"
    fi
done

echo ""
echo "🎉 Development cleanup complete!"
