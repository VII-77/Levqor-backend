#!/usr/bin/env python3
"""
Health & Uptime Monitoring Script
Runs every 6 hours via APScheduler
Pings levqor.ai and api.levqor.ai/health
Logs to Notion if non-200 response
"""
import os
import time
import requests
from datetime import datetime

ENDPOINTS = [
    {"name": "Frontend", "url": "https://levqor.ai"},
    {"name": "Backend Health", "url": "https://api.levqor.ai/health"},
    {"name": "Public Metrics", "url": "https://api.levqor.ai/public/metrics"},
]

def check_health():
    """Check health of all endpoints and return results"""
    results = []
    
    for endpoint in ENDPOINTS:
        start_time = time.time()
        try:
            response = requests.get(endpoint["url"], timeout=10)
            latency_ms = int((time.time() - start_time) * 1000)
            
            result = {
                "name": endpoint["name"],
                "url": endpoint["url"],
                "status_code": response.status_code,
                "latency_ms": latency_ms,
                "healthy": response.status_code == 200,
                "timestamp": datetime.utcnow().isoformat(),
            }
            results.append(result)
            
            # Log issues
            if response.status_code != 200:
                print(f"⚠️ {endpoint['name']} returned {response.status_code}")
            else:
                print(f"✅ {endpoint['name']} OK ({latency_ms}ms)")
                
        except Exception as e:
            print(f"❌ {endpoint['name']} FAILED: {str(e)}")
            results.append({
                "name": endpoint["name"],
                "url": endpoint["url"],
                "status_code": 0,
                "latency_ms": 0,
                "healthy": False,
                "error": str(e),
                "timestamp": datetime.utcnow().isoformat(),
            })
    
    return results

def log_to_notion(results):
    """Log health check results to Notion (if configured)"""
    # TODO: Implement Notion API logging when database ID is provided
    # For now, just log unhealthy endpoints
    unhealthy = [r for r in results if not r["healthy"]]
    
    if unhealthy:
        print(f"\n🚨 ALERT: {len(unhealthy)} endpoint(s) unhealthy")
        for result in unhealthy:
            print(f"  - {result['name']}: {result.get('status_code', 'ERROR')}")
    else:
        print(f"\n✅ All {len(results)} endpoints healthy")
    
    return unhealthy

if __name__ == "__main__":
    print(f"🔍 Health Check - {datetime.utcnow().isoformat()}")
    results = check_health()
    alerts = log_to_notion(results)
    
    # Return exit code based on health
    exit_code = 1 if alerts else 0
    exit(exit_code)
