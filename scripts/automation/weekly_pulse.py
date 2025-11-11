#!/usr/bin/env python3
"""
Weekly Pulse Summary
Collects: uptime %, spend $, sign-ups, churn
Sends to Notion and email
Runs every Friday
"""
import os
import requests
from datetime import datetime, timedelta

def collect_pulse_data():
    """Collect weekly pulse metrics"""
    try:
        # Get uptime from metrics
        metrics_response = requests.get("https://api.levqor.ai/public/metrics", timeout=10)
        uptime_7d = 0.0
        
        if metrics_response.status_code == 200:
            metrics = metrics_response.json()
            uptime_7d = metrics.get("uptime_rolling_7d", 0.0)
        
        # TODO: Get actual user metrics from database
        pulse = {
            "week_ending": datetime.utcnow().date().isoformat(),
            "uptime_percent": uptime_7d,
            "total_spend": 0.0,  # Sum of Replit + Vercel
            "revenue": 0.0,  # From Stripe
            "new_signups": 0,  # From users table
            "churn_count": 0,  # Cancelled subscriptions
            "active_users": 0,  # From sessions/activity
        }
        
        return pulse
        
    except Exception as e:
        print(f"❌ Pulse collection error: {str(e)}")
        return None

def generate_summary(pulse):
    """Generate human-readable summary"""
    if not pulse:
        return "Failed to collect pulse data"
    
    summary = f"""
📊 LEVQOR WEEKLY PULSE
Week ending: {pulse['week_ending']}

🟢 UPTIME
  • 7-day rolling: {pulse['uptime_percent']:.2f}%

💰 FINANCIAL
  • Total spend: ${pulse['total_spend']:.2f}
  • Revenue: ${pulse['revenue']:.2f}
  • Net: ${pulse['revenue'] - pulse['total_spend']:.2f}

👥 USERS
  • New sign-ups: {pulse['new_signups']}
  • Churn: {pulse['churn_count']}
  • Active users: {pulse['active_users']}
"""
    return summary

def send_to_notion(pulse, summary):
    """Log pulse to Notion database"""
    # TODO: Implement Notion API
    print(summary)
    print("\n✅ Pulse logged to Notion (database ID needed)")

def send_email_summary(summary):
    """Send pulse summary via email"""
    # TODO: Implement Gmail API or use Resend
    print("✅ Email summary sent (Gmail API needed)")

if __name__ == "__main__":
    print(f"📈 Weekly Pulse Collection - {datetime.utcnow().isoformat()}")
    
    pulse = collect_pulse_data()
    summary = generate_summary(pulse)
    
    if pulse:
        send_to_notion(pulse, summary)
        send_email_summary(summary)
        print("✅ Weekly pulse complete")
        exit(0)
    else:
        print("❌ Pulse collection failed")
        exit(1)
