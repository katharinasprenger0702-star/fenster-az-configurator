// app/api/checkout/route.ts
import type { NextRequest } from 'next/server'; import { NextResponse } from 'next/server'; import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { lineItems, successUrl, cancelUrl, metadata } = await req.json();

    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) {
      // Für Testbetrieb ohne gesetzte Keys: saubere Fehlermeldung zurückgeben
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY fehlt (Testbetrieb ohne Zahlung).' },
        { status: 500 }
      );
    }

    // Wichtig: 2. Argument mit API-Version angeben (kompatibel zu deiner Stripe-Lib)
    const stripe = new Stripe(sk, { apiVersion: '2022-11-15' });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Falls der Typ meckert, lassen wir TS hier großzügig sein:
      line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
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
