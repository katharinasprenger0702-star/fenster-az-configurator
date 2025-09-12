
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { lineItems, successUrl, cancelUrl, metadata, customer_email, billing_address_collection } = await req.json();
    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY is missing (Test mode without payment).' }, { status: 500 });
    }
    const stripe = new Stripe(sk, { apiVersion: '2022-11-15' });
    
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'de',
      currency: 'eur',
      metadata
    };

    // Add customer email if provided
    if (customer_email) {
      sessionParams.customer_email = customer_email;
    }

    // Add billing address collection if requested
    if (billing_address_collection) {
      sessionParams.billing_address_collection = billing_address_collection;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ sessionId: session.id, id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Checkout-Fehler' }, { status: 500 });
  }
}
