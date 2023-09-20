import getStripe from "@/core/get-stripejs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-08-16",
    typescript: true
  });
  const body = await req.json();
  console.log(body);
  const products: any[] = body.products;
  const quantity: number[] = body.quantity;
  const quantityTotal: number = quantity.reduce((acumullator, atual) => {
    return acumullator + atual;
  }, 0);
  // const prices = await stripe.prices.list({
  //   limit: 4
  // });

  const session = await stripe.checkout.sessions.create({
    line_items: products.map((product) => ({
      price_data: {
        currency: "BRL",
        product_data: {
          name: product.product
        },
        unit_amount: product.price * 100
      },
      quantity: quantityTotal
    })),
    mode: "payment",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/"
  });

  return NextResponse.json({
    message: "Success",
    error: false,
    status: 200,
    data: session.id
  });
}
