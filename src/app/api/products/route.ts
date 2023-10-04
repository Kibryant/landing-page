import Product from "@/models/Product";
import { NextResponse } from "next/server";
import connect from "@/core/db";

export async function GET(req: Request) {
  await connect();

  const products = await Product.find();

  if (!products)
    return NextResponse.json({
      message: "No have products!",
      error: true,
      status: 401
    });

  return NextResponse.json({
    message: "Success",
    status: 201,
    error: false,
    data: products
  });
}
