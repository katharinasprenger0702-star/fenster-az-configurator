// app/api/checkout/route.ts
import type { NextRequest } from 'next/server'; import { NextResponse } from 'next/server'; import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    // Payload aus dem Client
    const { lineItems, successUrl, cancelUrl, metadata } = await req.json();

    // Hinweis: Für den Build/testweisen Betrieb sind Keys optional.
    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) {
      // Freundliche Fehlermeldung ohne Build-Abbruch
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY fehlt (Testbetrieb ohne Zahlung).' },
        { status: 500 }
      );
    }

    // Keine apiVersion hart vorgeben -> kompatibel mit installierter stripe-Version
    const stripe = new Stripe(sk);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'de',
      currency: 'eur',
      metadata
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Checkout-Fehler' },
      { status: 500 }
    );
  }
}
