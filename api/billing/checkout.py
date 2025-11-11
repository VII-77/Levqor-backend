"""
Stripe Checkout Session Creation
Creates checkout sessions for Developer Portal tier upgrades
"""
import os
from flask import Blueprint, request, jsonify
import stripe

bp = Blueprint("billing_checkout", __name__, url_prefix="/api/billing")

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "").strip()

PRICE_MAP = {
    "pro": os.environ.get("STRIPE_PRICE_DEV_PRO", "").strip(),
    "enterprise": os.environ.get("STRIPE_PRICE_DEV_ENTERPRISE", "").strip(),
}

@bp.post("/checkout")
def create_checkout_session():
    """
    Create a Stripe Checkout session for tier upgrades
    
    Request body:
    {
      "tier": "pro" | "enterprise"
    }
    
    Response:
    {
      "url": "https://checkout.stripe.com/..."
    }
    """
    try:
        data = request.get_json() or {}
        tier = data.get("tier")
        
        if tier not in PRICE_MAP:
            return jsonify({"error": "invalid_tier"}), 400
        
        price_id = PRICE_MAP.get(tier, "")
        if not price_id:
            return jsonify({"error": "price_not_configured"}), 500
        
        # Get success/cancel URLs from env or use defaults
        site_url = os.environ.get("SITE_URL", "https://levqor.ai").strip()
        success_url = os.environ.get(
            "CHECKOUT_SUCCESS_URL",
            f"{site_url}/developer/keys?success=1"
        )
        cancel_url = os.environ.get(
            "CHECKOUT_CANCEL_URL",
            f"{site_url}/developer?canceled=1"
        )
        
        # Create Stripe Checkout Session
        session = stripe.checkout.Session.create(
            mode="subscription",
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            success_url=success_url,
            cancel_url=cancel_url,
            allow_promotion_codes=True,
            billing_address_collection="auto",
            metadata={
                "tier": tier,
                "source": "developer_portal"
            }
        )
        
        return jsonify({
            "ok": True,
            "url": session.url,
            "session_id": session.id
        }), 200
        
    except Exception as e:
        if "stripe" in str(type(e)).lower():
            return jsonify({"error": "stripe_error", "message": str(e)}), 500
        return jsonify({"error": "internal_error", "message": str(e)}), 500
