
import { loadStripe } from '@stripe/stripe-js';
let stripePromise: Promise<any> | null = null;
export default function getStripe() {
  if (!stripePromise) {
    const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!pk) throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY fehlt');
    stripePromise = loadStripe(pk);
  }
  return stripePromise;
}
