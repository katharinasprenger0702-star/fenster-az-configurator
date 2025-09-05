
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { lineItems, successUrl, cancelUrl, metadata } = body;
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY fehlt' }, { status: 500 });
  }
  const stripe = new Stripe(sk, { apiVersion: '2022-11-15' });

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
}
