'use client';

import { useState } from 'react';
import TrustSection from '@/components/TrustSection';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 29,
      annualPrice: 290,
      features: ['100 workflow runs/month', 'Basic integrations', 'Email support', '1 team member'],
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      monthlyPrice: 99,
      annualPrice: 990,
      features: ['1,000 workflow runs/month', 'All integrations', 'Priority support', '5 team members', 'Advanced analytics'],
      cta: 'Start Free Trial',
      featured: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      features: ['Unlimited workflow runs', 'Custom integrations', '24/7 dedicated support', 'Unlimited team members', 'SLA & compliance'],
      cta: 'Contact Sales'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) return 'Custom';
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return `$${price}`;
  };

  const getPeriod = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) return '';
    return billingPeriod === 'monthly' ? '/month' : '/year';
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null || billingPeriod === 'monthly') return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    return savings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your automation needs
          </p>

          <div className="inline-flex items-center bg-white rounded-lg shadow-md p-1 mb-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                billingPeriod === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.featured
                  ? 'bg-blue-600 text-white shadow-2xl scale-105 border-4 border-blue-400'
                  : 'bg-white text-gray-900 shadow-lg border border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{getPrice(plan)}</span>
                  <span className={`ml-1 ${plan.featured ? 'text-blue-100' : 'text-gray-500'}`}>
                    {getPeriod(plan)}
                  </span>
                </div>
                {getSavings(plan) && (
                  <p className="text-sm text-blue-100 mt-2">
                    Save ${getSavings(plan)}/year
                  </p>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-blue-200' : 'text-blue-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.name === 'Enterprise' ? '/contact' : '/signin'}
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Plans Include</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">99.9% Uptime SLA</h4>
                <p className="text-gray-600 text-sm">Enterprise-grade reliability</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">SOC 2 Type II Compliant</h4>
                <p className="text-gray-600 text-sm">Bank-level security</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">API Access</h4>
                <p className="text-gray-600 text-sm">Full REST API & webhooks</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">Free 14-Day Trial</h4>
                <p className="text-gray-600 text-sm">No credit card required</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Have questions about pricing?</p>
          <a href="/contact" className="text-blue-600 hover:underline font-semibold">
            Contact our sales team
          </a>
        </div>
      </div>
      
      <TrustSection />
    </div>
  );
}
