import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-10-29.clover' });

type Plan = 'starter' | 'pro' | 'business';
type Term = 'monthly' | 'yearly';

const MAP: Record<Plan, Record<Term, string | undefined>> = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER,
    yearly: process.env.STRIPE_PRICE_STARTER_YEAR,
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO,
    yearly: process.env.STRIPE_PRICE_PRO_YEAR,
  },
  business: {
    monthly: process.env.STRIPE_PRICE_BUSINESS,
    yearly: process.env.STRIPE_PRICE_BUSINESS_YEAR,
  },
};

const ADDONS: Record<string, string | undefined> = {
  PRIORITY_SUPPORT: process.env.STRIPE_PRICE_ADDON_PRIORITY_SUPPORT,
  SLA_99_9: process.env.STRIPE_PRICE_ADDON_SLA_99_9,
  WHITE_LABEL: process.env.STRIPE_PRICE_ADDON_WHITE_LABEL,
};

const FREE_TRIAL_DAYS = parseInt(process.env.FREE_TRIAL_DAYS || '7', 10);
const SITE_URL = process.env.SITE_URL || process.env.NEXTAUTH_URL || 'https://levqor.ai';

async function createCheckout(priceId: string, plan: Plan, addons?: string[]) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: priceId, quantity: 1 }
  ];

  if (addons && addons.length > 0) {
    for (const addon of addons) {
      const addonPriceId = ADDONS[addon];
      if (addonPriceId) {
        lineItems.push({ price: addonPriceId, quantity: 1 });
      }
    }
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    line_items: lineItems,
    success_url: `${SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&checkout=success`,
    cancel_url: `${SITE_URL}/pricing?checkout=cancelled`,
    automatic_tax: { enabled: true },
  };

  if ((plan === 'pro' || plan === 'business') && FREE_TRIAL_DAYS > 0) {
    sessionParams.subscription_data = {
      trial_period_days: FREE_TRIAL_DAYS,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session.url;
}

function pickPrice(planRaw: string | null, termRaw: string | null) {
  const plan = (planRaw || 'starter').toLowerCase() as Plan;
  const term = (termRaw || 'monthly').toLowerCase() as Term;
  if (!['starter', 'pro', 'business'].includes(plan)) return { error: 'invalid_plan' };
  if (!['monthly', 'yearly'].includes(term)) return { error: 'invalid_term' };
  const priceId = MAP[plan][term];
  if (!priceId) return { error: 'price_not_configured' };
  return { plan, term, priceId };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const plan = searchParams.get('plan');
    const term = searchParams.get('term');
    const pick = pickPrice(plan, term);
    if ('error' in pick) return NextResponse.json({ ok: false, error: pick.error }, { status: 400 });
    const url = await createCheckout(pick.priceId, pick.plan);
    return NextResponse.json({ ok: true, url, plan: pick.plan, term: pick.term });
  } catch (error) {
    console.error('Checkout GET error:', error);
    return NextResponse.json(
      { ok: false, error: 'checkout_failed' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const pick = pickPrice(body?.plan ?? null, body?.term ?? null);
    if ('error' in pick) return NextResponse.json({ ok: false, error: pick.error }, { status: 400 });
    
    const addons = Array.isArray(body?.addons) ? body.addons : undefined;
    const url = await createCheckout(pick.priceId, pick.plan, addons);
    
    return NextResponse.json({ ok: true, url, plan: pick.plan, term: pick.term });
  } catch (error) {
    console.error('Checkout POST error:', error);
    return NextResponse.json(
      { ok: false, error: 'checkout_failed' },
      { status: 500 }
    );
  }
}
