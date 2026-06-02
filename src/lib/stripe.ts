import Stripe from "stripe";

export const stripe = new Stripe((process.env.STRIPE_SECRET_KEY || "sk_test_dummy") as string, {
  apiVersion: "2026-05-27.dahlia",
  appInfo: {
    name: "RootsSky Store",
    version: "0.1.0",
  },
});
