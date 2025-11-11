#!/usr/bin/env python3
"""
Complete Integrity Pack Runner
Runs integrity tests, finalizer validation, and generates PDF evidence report
"""
import os
import sys
import json
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from modules.integrity_pack.integrity_test import IntegrityTester
from modules.integrity_pack.finalizer import Finalizer
from modules.integrity_pack.evidence_export import generate_evidence_report


def run_full_integrity_pack(output_dir: str = ".") -> dict:
    """
    Run complete Integrity Pack suite
    
    Args:
        output_dir: Directory to save reports
    
    Returns:
        Dict with paths to generated files and summary
    """
    print("="*70)
    print("🔒 LEVQOR INTEGRITY + FINALIZER PACK")
    print("="*70)
    print(f"Started: {datetime.utcnow().isoformat()}")
    print()
    
    # Step 1: Run Integrity Tests
    print("STEP 1: Running Integrity Tests...")
    print("-"*70)
    tester = IntegrityTester()
    integrity_results = tester.run_all_tests()
    
    # Save integrity results
    timestamp = int(datetime.utcnow().timestamp())
    integrity_json = os.path.join(output_dir, f"integrity_report_{timestamp}.json")
    with open(integrity_json, 'w') as f:
        json.dump(integrity_results, f, indent=2)
    print(f"✅ Integrity report saved: {integrity_json}")
    print()
    
    # Step 2: Run Finalizer Validation
    print("STEP 2: Running Finalizer Validation...")
    print("-"*70)
    finalizer = Finalizer()
    finalizer_results = finalizer.validate_all()
    
    # Save finalizer results
    finalizer_json = os.path.join(output_dir, f"finalizer_report_{timestamp}.json")
    with open(finalizer_json, 'w') as f:
        json.dump(finalizer_results, f, indent=2)
    print(f"✅ Finalizer report saved: {finalizer_json}")
    print()
    
    # Step 3: Generate PDF Evidence Report
    print("STEP 3: Generating PDF Evidence Report...")
    print("-"*70)
    pdf_path = generate_evidence_report(integrity_results, finalizer_results, output_dir)
    print()
    
    # Final Summary
    print("="*70)
    print("📊 INTEGRITY PACK COMPLETE")
    print("="*70)
    
    overall_passed = (
        integrity_results["summary"]["failed"] == 0 and
        finalizer_results["summary"]["deployment_ready"]
    )
    
    print(f"Overall Status: {'✅ PASSED' if overall_passed else '⚠️ NEEDS ATTENTION'}")
    print(f"\nIntegrity Tests: {integrity_results['summary']['passed']}/{integrity_results['summary']['total']} passed")
    print(f"Finalizer Checks: {finalizer_results['summary']['passed']}/{finalizer_results['summary']['total']} passed")
    print(f"Deployment Ready: {'YES' if finalizer_results['summary']['deployment_ready'] else 'NO'}")
    
    print(f"\n📁 Generated Files:")
    print(f"  • Integrity JSON: {integrity_json}")
    print(f"  • Finalizer JSON: {finalizer_json}")
    print(f"  • Evidence PDF:   {pdf_path}")
    print("="*70)
    
    return {
        "overall_passed": overall_passed,
        "integrity_json": integrity_json,
        "finalizer_json": finalizer_json,
        "evidence_pdf": pdf_path,
        "summary": {
            "integrity": integrity_results["summary"],
            "finalizer": finalizer_results["summary"],
        }
    }


if __name__ == "__main__":
    # Create reports directory if it doesn't exist
    reports_dir = "integrity_reports"
    os.makedirs(reports_dir, exist_ok=True)
    
    # Run the full pack
    results = run_full_integrity_pack(reports_dir)
    
    # Exit with appropriate code
    exit_code = 0 if results["overall_passed"] else 1
    exit(exit_code)
