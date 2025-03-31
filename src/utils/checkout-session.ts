import Stripe from "stripe";
import { env } from "~/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export type SessionCreate = Stripe.Checkout.SessionCreateParams;

export async function createCheckoutSession(sessionCreate: SessionCreate) {
  const origin = env.NEXT_PUBLIC_STORE_DOMAIN;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const session = await stripe.checkout.sessions.create({
    ...sessionCreate,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { sessionId: session.id, checkoutError: null };
}

export async function getStripeCheckoutSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });
}

export async function createStripeRefund({
  paymentIntentId,
}: {
  paymentIntentId: string;
}) {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
}
