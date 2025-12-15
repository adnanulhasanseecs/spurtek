# Spurtek Server Management Script
# Usage: .\manager-server-spurtek.ps1 [start|stop|restart|status|logs]

param(
    [Parameter(Position=0)]
    [ValidateSet("start", "stop", "restart", "status", "logs", "test")]
    [string]$Action = "start"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

$Port = 3010
$ProcessName = "node"
$LogFile = "server.log"
$PidFile = ".server.pid"

function Get-ServerProcess {
    $processes = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Where-Object {
        $_.CommandLine -like "*next dev*" -or $_.CommandLine -like "*next start*"
    }
    return $processes
}

function Start-Server {
    Write-Host "Starting Spurtek server on port $Port..." -ForegroundColor Green
    
    # Check if server is already running
    $existing = Get-ServerProcess
    if ($existing) {
        Write-Host "Server is already running (PID: $($existing.Id))" -ForegroundColor Yellow
        return
    }
    
    # Check if .env.local exists
    if (-not (Test-Path ".env.local")) {
        Write-Host "Warning: .env.local not found. Creating from .env.example..." -ForegroundColor Yellow
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env.local"
        }
    }
    
    # Start the server in background
    $job = Start-Job -ScriptBlock {
        param($dir, $port)
        Set-Location $dir
        $env:PORT = $port
        npm run dev 2>&1 | Tee-Object -FilePath "server.log" -Append
    } -ArgumentList $ScriptDir, $Port
    
    # Save PID
    Start-Sleep -Seconds 2
    $process = Get-ServerProcess
    if ($process) {
        $process.Id | Out-File $PidFile
        Write-Host "Server started successfully (PID: $($process.Id))" -ForegroundColor Green
        Write-Host "Server running at: http://localhost:$Port" -ForegroundColor Cyan
        Write-Host "Logs: $LogFile" -ForegroundColor Gray
    } else {
        Write-Host "Failed to start server. Check logs for details." -ForegroundColor Red
    }
}

function Stop-Server {
    Write-Host "Stopping Spurtek server..." -ForegroundColor Yellow
    
    $processes = Get-ServerProcess
    if ($processes) {
        foreach ($proc in $processes) {
            Write-Host "Stopping process (PID: $($proc.Id))..." -ForegroundColor Yellow
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
        }
        Write-Host "Server stopped." -ForegroundColor Green
    } else {
        Write-Host "No server process found." -ForegroundColor Yellow
    }
    
    # Remove PID file
    if (Test-Path $PidFile) {
        Remove-Item $PidFile -Force
    }
    
    # Stop any background jobs
    Get-Job | Where-Object { $_.State -eq "Running" } | Stop-Job
    Get-Job | Remove-Job
}

function Restart-Server {
    Write-Host "Restarting Spurtek server..." -ForegroundColor Cyan
    Stop-Server
    Start-Sleep -Seconds 2
    Start-Server
}

function Show-Status {
    Write-Host "`n=== Spurtek Server Status ===" -ForegroundColor Cyan
    Write-Host "Port: $Port" -ForegroundColor Gray
    Write-Host "Log File: $LogFile" -ForegroundColor Gray
    
    $processes = Get-ServerProcess
    if ($processes) {
        Write-Host "`nServer Status: RUNNING" -ForegroundColor Green
        foreach ($proc in $processes) {
            Write-Host "  PID: $($proc.Id)" -ForegroundColor Gray
            Write-Host "  Memory: $([math]::Round($proc.WorkingSet64 / 1MB, 2)) MB" -ForegroundColor Gray
            Write-Host "  URL: http://localhost:$Port" -ForegroundColor Cyan
        }
    } else {
        Write-Host "`nServer Status: STOPPED" -ForegroundColor Red
    }
    
    # Check if port is in use
    $portInUse = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Host "`nPort $Port is in use." -ForegroundColor Yellow
    }
    
    Write-Host ""
}

function Show-Logs {
    if (Test-Path $LogFile) {
        Write-Host "=== Server Logs (Last 50 lines) ===" -ForegroundColor Cyan
        Get-Content $LogFile -Tail 50
    } else {
        Write-Host "No log file found." -ForegroundColor Yellow
    }
}

function Run-Tests {
    Write-Host "Running tests..." -ForegroundColor Cyan
    Write-Host "`n=== Unit Tests ===" -ForegroundColor Yellow
    npm run test
    
    Write-Host "`n=== E2E Tests ===" -ForegroundColor Yellow
    npm run test:e2e
}

# Main execution
switch ($Action.ToLower()) {
    "start" {
        Start-Server
    }
    "stop" {
        Stop-Server
    }
    "restart" {
        Restart-Server
    }
    "status" {
        Show-Status
    }
    "logs" {
        Show-Logs
    }
    "test" {
        Run-Tests
    }
    default {
        Write-Host "Invalid action. Use: start, stop, restart, status, logs, or test" -ForegroundColor Red
        exit 1
    }
}

