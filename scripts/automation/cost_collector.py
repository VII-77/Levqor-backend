#!/usr/bin/env python3
"""
Cost Dashboard Data Collector
Pulls daily spend from Replit, Stripe, Vercel
Logs to Notion Cost Dashboard
Alerts if Replit spend > $10
"""
import os
import requests
from datetime import datetime, timedelta

def get_replit_usage():
    """Get Replit usage and costs (mock for now)"""
    # TODO: Implement actual Replit API when available
    return {
        "ai_spend": 0.0,
        "compute_spend": 0.0,
        "total": 0.0,
        "date": datetime.utcnow().date().isoformat(),
    }

def get_stripe_revenue():
    """Get Stripe revenue and failed payments"""
    stripe_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe_key:
        print("⚠️  Stripe key not configured")
        return {"revenue": 0.0, "failed_payments": 0}
    
    try:
        # Get charges from last 24 hours
        yesterday = int((datetime.utcnow() - timedelta(days=1)).timestamp())
        
        headers = {"Authorization": f"Bearer {stripe_key}"}
        params = {"created[gte]": yesterday, "limit": 100}
        
        response = requests.get(
            "https://api.stripe.com/v1/charges",
            headers=headers,
            params=params,
        )
        
        if response.status_code == 200:
            data = response.json()
            charges = data.get("data", [])
            
            successful = sum(c["amount"] for c in charges if c["paid"]) / 100
            failed = sum(1 for c in charges if not c["paid"])
            
            return {
                "revenue": successful,
                "failed_payments": failed,
                "total_transactions": len(charges),
            }
        else:
            print(f"⚠️  Stripe API error: {response.status_code}")
            return {"revenue": 0.0, "failed_payments": 0}
            
    except Exception as e:
        print(f"❌ Stripe error: {str(e)}")
        return {"revenue": 0.0, "failed_payments": 0}

def get_vercel_usage():
    """Get Vercel build minutes and bandwidth"""
    vercel_token = os.getenv("VERCEL_TOKEN")
    if not vercel_token:
        print("⚠️  Vercel token not configured")
        return {"build_minutes": 0, "bandwidth_gb": 0.0}
    
    # TODO: Implement Vercel usage API when needed
    return {
        "build_minutes": 0,
        "bandwidth_gb": 0.0,
    }

def check_cost_alerts(data):
    """Check if any cost thresholds exceeded"""
    alerts = []
    
    replit_total = data["replit"]["total"]
    if replit_total > 10.0:
        alerts.append(f"🚨 Replit spend (${replit_total:.2f}) exceeds $10 threshold")
    
    failed_payments = data["stripe"]["failed_payments"]
    if failed_payments > 0:
        alerts.append(f"⚠️  {failed_payments} failed Stripe payment(s)")
    
    return alerts

def log_to_notion(data, alerts):
    """Log cost data to Notion dashboard"""
    # TODO: Implement Notion API logging
    print("\n📊 Cost Dashboard Summary:")
    print(f"  Replit: ${data['replit']['total']:.2f}")
    print(f"  Stripe Revenue: ${data['stripe']['revenue']:.2f}")
    print(f"  Stripe Failed: {data['stripe']['failed_payments']}")
    print(f"  Vercel Build Min: {data['vercel']['build_minutes']}")
    
    if alerts:
        print("\n🚨 ALERTS:")
        for alert in alerts:
            print(f"  {alert}")

if __name__ == "__main__":
    print(f"💰 Cost Collection - {datetime.utcnow().isoformat()}")
    
    data = {
        "replit": get_replit_usage(),
        "stripe": get_stripe_revenue(),
        "vercel": get_vercel_usage(),
        "timestamp": datetime.utcnow().isoformat(),
    }
    
    alerts = check_cost_alerts(data)
    log_to_notion(data, alerts)
    
    exit_code = 1 if alerts else 0
    exit(exit_code)
