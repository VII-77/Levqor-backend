import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

type Body = {
  plan: "starter" | "pro" | "business";
  term: "monthly" | "yearly";
  addons?: string[];
};

function priceEnvFor(plan: string, term: string) {
  const key =
    term === "yearly"
      ? `STRIPE_PRICE_${plan.toUpperCase()}_YEAR`
      : `STRIPE_PRICE_${plan.toUpperCase()}`;
  return process.env[key];
}

function addonEnvFor(code: string) {
  return process.env[`STRIPE_PRICE_ADDON_${code.toUpperCase()}`];
}

export async function POST(req: Request) {
  try {
    const { plan, term, addons = [] } = (await req.json()) as Body;

    const base = priceEnvFor(plan, term);
    if (!base) throw new Error(`Missing price for ${plan}/${term}`);

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      { price: base, quantity: 1 },
    ];
    for (const code of addons) {
      const p = addonEnvFor(code);
      if (!p) throw new Error(`Missing add-on price: ${code}`);
      line_items.push({ price: p, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items,
      allow_promotion_codes: true,
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/pricing`,
    });

    if (!session.url) throw new Error("No session URL returned");
    return NextResponse.json({ ok: true, url: session.url });
  } catch (e: any) {
    console.error("Checkout error:", e?.message || e);
    return NextResponse.json(
      { ok: false, error: e?.message || "internal_error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const keys = [
    "STRIPE_SECRET_KEY",
    "SITE_URL",
    "STRIPE_PRICE_STARTER",
    "STRIPE_PRICE_STARTER_YEAR",
    "STRIPE_PRICE_PRO",
    "STRIPE_PRICE_PRO_YEAR",
    "STRIPE_PRICE_BUSINESS",
    "STRIPE_PRICE_BUSINESS_YEAR",
    "STRIPE_PRICE_ADDON_PRIORITY_SUPPORT",
    "STRIPE_PRICE_ADDON_SLA_99_9",
    "STRIPE_PRICE_ADDON_WHITE_LABEL",
  ];
  const missing = keys.filter((k) => !process.env[k]);
  return NextResponse.json({ ok: true, missing });
}
