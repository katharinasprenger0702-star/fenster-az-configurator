import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const sk = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sk || !webhookSecret) {
    console.error('Missing Stripe configuration');
    return NextResponse.json({ error: 'Webhook configuration error' }, { status: 500 });
  }

  try {
    const stripe = new Stripe(sk, { apiVersion: '2022-11-15' });
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Log the successful payment
        console.log('Payment successful:', {
          sessionId: session.id,
          customerId: session.customer,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          currency: session.currency,
          metadata: session.metadata
        });

        // Here you would typically:
        // 1. Save the order to your database
        // 2. Send confirmation email to customer
        // 3. Trigger fulfillment process
        // 4. Update inventory

        // Example of processing the metadata
        if (session.metadata) {
          const { config, customerName, customerEmail, customerPhone, customerAddress } = session.metadata;
          
          console.log('Order details:', {
            customer: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone,
              address: customerAddress
            },
            configuration: config ? JSON.parse(config) : null,
            paymentAmount: session.amount_total,
            currency: session.currency
          });
        }

        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session expired:', expiredSession.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', {
          paymentIntentId: failedPayment.id,
          lastPaymentError: failedPayment.last_payment_error
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}