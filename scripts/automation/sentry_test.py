#!/usr/bin/env python3
"""
Sentry Error Tracking Test
Verifies Sentry integration is working
Runs weekly via cron
"""
import os
import sys

def test_sentry():
    """Test Sentry error tracking"""
    sentry_dsn = os.getenv("SENTRY_DSN")
    
    if not sentry_dsn:
        print("❌ SENTRY_DSN not configured")
        return False
    
    try:
        import sentry_sdk
        
        # Initialize Sentry
        sentry_sdk.init(
            dsn=sentry_dsn,
            traces_sample_rate=0.1,
            environment="production",
        )
        
        print("✅ Sentry initialized successfully")
        
        # Send test event
        with sentry_sdk.configure_scope() as scope:
            scope.set_tag("test", "weekly_health_check")
            sentry_sdk.capture_message(
                "Weekly Sentry health check - system operational",
                level="info"
            )
        
        print("✅ Test event sent to Sentry")
        return True
        
    except ImportError:
        print("❌ sentry-sdk not installed. Run: pip install sentry-sdk")
        return False
    except Exception as e:
        print(f"❌ Sentry error: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔍 Sentry Health Check")
    success = test_sentry()
    exit(0 if success else 1)
