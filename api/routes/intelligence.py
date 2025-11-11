"""
Intelligence API Endpoints
Provides access to intelligence layer data and insights
"""
from flask import Blueprint, jsonify, request
from modules.auto_intel import get_recent_anomalies, get_recent_actions
from modules.decision_engine import get_recent_recommendations
from modules.ai_advisor import generate_ai_insights
from modules.governance_ai import evaluate_risk, get_risk_history
from modules.autoscale import check_load, get_scaling_history
from datetime import datetime

bp = Blueprint('intelligence', __name__, url_prefix='/api/intelligence')

@bp.route('/status', methods=['GET'])
def get_intelligence_status():
    """
    Get comprehensive intelligence dashboard status
    
    Returns:
        JSON with all intelligence metrics
    """
    try:
        # Get recent anomalies
        anomalies = get_recent_anomalies(limit=5)
        
        # Get recent self-healing actions
        actions = get_recent_actions(limit=5)
        
        # Get recent recommendations
        recommendations = get_recent_recommendations(limit=1)
        current_recs = recommendations[0] if recommendations else None
        
        # Get current risk score
        risk = evaluate_risk()
        
        # Get AI insights
        insights = generate_ai_insights()
        
        # Get scaling status
        scaling = check_load()
        scaling_history = get_scaling_history(limit=5)
        
        return jsonify({
            "status": "operational",
            "timestamp": datetime.utcnow().isoformat(),
            "health": {
                "anomalies": anomalies,
                "recent_actions": actions
            },
            "decisions": current_recs.get('recommendations', []) if current_recs else [],
            "forecasts": {
                "revenue": insights.get('revenue_forecast'),
                "churn": insights.get('churn_analysis'),
                "partner_health": insights.get('partner_health')
            },
            "risk": {
                "score": risk.get('risk_score'),
                "level": risk.get('risk_level'),
                "factors": risk.get('risk_factors', [])
            },
            "scaling": {
                "current": scaling,
                "history": scaling_history
            }
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 500

@bp.route('/anomalies', methods=['GET'])
def get_anomalies():
    """Get recent anomaly events"""
    limit = request.args.get('limit', 20, type=int)
    anomalies = get_recent_anomalies(limit=limit)
    return jsonify({"anomalies": anomalies})

@bp.route('/recommendations', methods=['GET'])
def get_recommendations():
    """Get recent decision engine recommendations"""
    limit = request.args.get('limit', 5, type=int)
    recs = get_recent_recommendations(limit=limit)
    return jsonify({"recommendations": recs})

@bp.route('/risk', methods=['GET'])
def get_risk():
    """Get current governance risk score"""
    risk = evaluate_risk()
    return jsonify(risk)

@bp.route('/risk/history', methods=['GET'])
def get_risk_trend():
    """Get risk score history"""
    limit = request.args.get('limit', 30, type=int)
    history = get_risk_history(limit=limit)
    return jsonify({"history": history})

@bp.route('/insights', methods=['GET'])
def get_insights():
    """Get AI-generated insights"""
    insights = generate_ai_insights()
    return jsonify(insights)

@bp.route('/scaling', methods=['GET'])
def get_scaling():
    """Get current load and scaling status"""
    current = check_load()
    history = get_scaling_history(limit=10)
    return jsonify({
        "current": current,
        "history": history
    })
