import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2025-10-29.clover" });

function getPriceId(plan: "starter"|"pro"|"business", term: "monthly"|"yearly") {
  const STARTER_M = process.env.STRIPE_PRICE_STARTER;
  const STARTER_Y = process.env.STRIPE_PRICE_STARTER_YEAR;
  const PRO_M     = process.env.STRIPE_PRICE_PRO;
  const PRO_Y     = process.env.STRIPE_PRICE_PRO_YEAR;
  const BUS_M     = process.env.STRIPE_PRICE_BUSINESS;
  const BUS_Y     = process.env.STRIPE_PRICE_BUSINESS_YEAR;

  const STARTER_M_ID = process.env.STRIPE_PRICE_ID_STARTER;
  const PRO_M_ID     = process.env.STRIPE_PRICE_ID_PRO;
  const BUS_M_ID     = process.env.STRIPE_PRICE_ID_BUSINESS;

<<<<<<< HEAD
  const map: Record<string, string | undefined> = {
    "starter-monthly": STARTER_M ?? STARTER_M_ID,
    "starter-yearly":  STARTER_Y,
    "pro-monthly":     PRO_M ?? PRO_M_ID,
    "pro-yearly":      PRO_Y,
    "business-monthly":BUS_M ?? BUS_M_ID,
    "business-yearly": BUS_Y,
  };
  return map[`${plan}-${term}`];
}

export async function POST(req: Request) {
  try {
    const { plan, term, addons } = await req.json();
    if (!["starter","pro","business"].includes(plan)) {
      return NextResponse.json({ ok:false, error:"bad_plan" }, { status:400 });
    }
    if (!["monthly","yearly"].includes(term)) {
      return NextResponse.json({ ok:false, error:"bad_term" }, { status:400 });
    }

    const priceId = getPriceId(plan, term);
    if (!priceId) {
      return NextResponse.json(
        { ok:false, error:`price_not_configured`, detail:{ plan, term, schemeHints:{
          STRIPE_PRICE_STARTER: !!process.env.STRIPE_PRICE_STARTER,
          STRIPE_PRICE_STARTER_YEAR: !!process.env.STRIPE_PRICE_STARTER_YEAR,
          STRIPE_PRICE_PRO: !!process.env.STRIPE_PRICE_PRO,
          STRIPE_PRICE_PRO_YEAR: !!process.env.STRIPE_PRICE_PRO_YEAR,
          STRIPE_PRICE_BUSINESS: !!process.env.STRIPE_PRICE_BUSINESS,
          STRIPE_PRICE_BUSINESS_YEAR: !!process.env.STRIPE_PRICE_BUSINESS_YEAR,
          STRIPE_PRICE_ID_STARTER: !!process.env.STRIPE_PRICE_ID_STARTER,
          STRIPE_PRICE_ID_PRO: !!process.env.STRIPE_PRICE_ID_PRO,
          STRIPE_PRICE_ID_BUSINESS: !!process.env.STRIPE_PRICE_ID_BUSINESS,
        }}},
        { status:400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      success_url: `${process.env.SITE_URL}/success`,
      cancel_url:  `${process.env.SITE_URL}/pricing`,
    });

    return NextResponse.json({ ok:true, url: session.url });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:"handler_failed", detail:e?.message }, { status:500 });
  }
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const plan = (u.searchParams.get("plan") ?? "").toLowerCase();
  const term = (u.searchParams.get("term") ?? "").toLowerCase();
  return POST(new Request(u.toString(), { method:"POST", body: JSON.stringify({ plan, term }) }));
=======
const ADDONS: Record<string, string | undefined> = {
  runs_25k: process.env.STRIPE_ADDON_RUNS_25K,
  ai_10k: process.env.STRIPE_ADDON_AI_10K,
  sla_pro: process.env.STRIPE_ADDON_SLA_PRO,
};

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
    success_url: `${process.env.SITE_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.SITE_URL}/pricing?checkout=cancelled`,
  };

  if (plan === 'pro' || plan === 'business') {
    sessionParams.subscription_data = {
      trial_period_days: 7,
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
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get('plan');
  const term = searchParams.get('term');
  const pick = pickPrice(plan, term);
  if ('error' in pick) return NextResponse.json({ ok: false, error: pick.error }, { status: 400 });
  const url = await createCheckout(pick.priceId, pick.plan);
  return NextResponse.json({ ok: true, url, plan: pick.plan, term: pick.term });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pick = pickPrice(body?.plan ?? null, body?.term ?? null);
  if ('error' in pick) return NextResponse.json({ ok: false, error: pick.error }, { status: 400 });
  
  const addons = Array.isArray(body?.addons) ? body.addons : undefined;
  const url = await createCheckout(pick.priceId, pick.plan, addons);
  
  return NextResponse.json({ ok: true, url, plan: pick.plan, term: pick.term });
>>>>>>> origin/replit-agent
}
