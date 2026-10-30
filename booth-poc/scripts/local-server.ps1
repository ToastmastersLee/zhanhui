param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('Start', 'Stop')]
    [string]$Action,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$vitePath = Join-Path $projectRoot 'node_modules\vite\bin\vite.js'
$runtimePath = Join-Path $projectRoot '.runtime'
$statePath = Join-Path $runtimePath 'server.json'
$url = 'http://127.0.0.1:5173/'

function Read-OwnedServer {
    if (-not (Test-Path -LiteralPath $statePath)) { return $null }
    $state = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
    $process = Get-Process -Id $state.processId -ErrorAction SilentlyContinue
    if ($null -eq $process) { return $null }
    # Check both process identity and its exact Vite entrypoint, protecting against PID reuse.
    if ($process.StartTime.ToUniversalTime().ToString('o') -ne $state.startedAt) {
        return $null
    }
    $info = Get-CimInstance Win32_Process -Filter "ProcessId = $($state.processId)"
    if ($null -eq $info -or -not $info.CommandLine.Contains(('"' + $vitePath + '"'))) {
        throw 'Saved process does not match this project. No process was stopped.'
    }
    return $process
}

function Wait-Ready($Server) {
    for ($attempt = 0; $attempt -lt 40; $attempt++) {
        $Server.Refresh()
        if ($Server.HasExited) { throw 'Server exited. See .runtime\stdout.log and stderr.log.' }
        $listener = Get-NetTCPConnection -State Listen -LocalPort 5173 -ErrorAction SilentlyContinue |
            Where-Object { $_.OwningProcess -eq $Server.Id }
        if ($listener) {
            try {
                $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
                if ($response.StatusCode -eq 200) { return }
            } catch { }
        }
        Start-Sleep -Milliseconds 250
    }
    throw 'Server did not become ready. See .runtime logs.'
}

$mutex = $null
$locked = $false
$launched = $null
try {
    # Serialize double clicks and simultaneous Start/Stop requests for this checkout.
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $hash = [BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($projectRoot.ToLowerInvariant()))).Replace('-', '')
    } finally { $sha.Dispose() }
    $mutex = New-Object System.Threading.Mutex($false, ('Local\BoothPoc-' + $hash))
    try { $locked = $mutex.WaitOne(30000) } catch [System.Threading.AbandonedMutexException] { $locked = $true }
    if (-not $locked) { throw 'Another launch or stop is in progress. Try again shortly.' }

    $server = Read-OwnedServer
    if ($Action -eq 'Stop') {
        if ($null -ne $server) {
            Stop-Process -Id $server.Id -ErrorAction Stop
            $server.WaitForExit(5000) | Out-Null
            Write-Host 'Booth POC stopped.'
        } else { Write-Host 'Booth POC is already stopped. Other services were left running.' }
        if (Test-Path -LiteralPath $statePath) { Remove-Item -LiteralPath $statePath }
    } else {
        if ($null -eq $server) {
            $node = (Get-Command node.exe -ErrorAction SilentlyContinue).Source
            if (-not $node) { throw 'Node.js was not found. Install Node.js 20.19+ or 22.12+ first.' }
            if (-not (Test-Path -LiteralPath $vitePath)) {
                throw 'Dependencies are missing. Run npm install in this project folder first.'
            }
            if (Get-NetTCPConnection -State Listen -LocalPort 5173 -ErrorAction SilentlyContinue) {
                throw 'Port 5173 is used by another server. Stop it from its original terminal first; nothing was killed.'
            }
            New-Item -ItemType Directory -Path $runtimePath -Force | Out-Null
            $server = Start-Process -FilePath $node -ArgumentList @(('"' + $vitePath + '"'), '--host', '127.0.0.1', '--port', '5173', '--strictPort') -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $runtimePath 'stdout.log') -RedirectStandardError (Join-Path $runtimePath 'stderr.log')
            $launched = $server
            $server.Refresh()
            @{ processId = $server.Id; startedAt = $server.StartTime.ToUniversalTime().ToString('o') } |
                ConvertTo-Json | Set-Content -LiteralPath $statePath -Encoding UTF8
            Wait-Ready $server
            $launched = $null
            Write-Host "Booth POC started: $url"
        } else {
            Wait-Ready $server
            Write-Host "Booth POC is already running: $url"
        }
        if (-not $NoBrowser) { Start-Process $url }
    }
} catch {
    if ($null -ne $launched) {
        # This process was just created in this invocation; clean up only that process.
        $launched.Refresh()
        if (-not $launched.HasExited) { Stop-Process -Id $launched.Id -ErrorAction SilentlyContinue }
        if (Test-Path -LiteralPath $statePath) { Remove-Item -LiteralPath $statePath }
    }
    Write-Host ('ERROR: ' + $_.Exception.Message) -ForegroundColor Red
    exit 1
} finally {
    if ($locked) { $mutex.ReleaseMutex() }
    if ($null -ne $mutex) { $mutex.Dispose() }
}
