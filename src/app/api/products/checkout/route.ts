import getStripe from "@/core/get-stripejs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
    apiVersion: "2023-08-16",
    typescript: true
  });
  const body = await req.json();
  const { priceId, quantity } = body;
  // const prices = await stripe.prices.list({
  //   limit: 4
  // });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity
      }
    ],
    mode: "payment",
    success_url: "",
    cancel_url: ""
  });

  return NextResponse.json({
    message: "Success",
    error: false,
    status: 200
    // data: session.url
  });
}
