import Product from "@/models/Product";
import { NextResponse } from "next/server";
import connect from "@/core/db";
import bcrypt from "bcrypt";
import { type ProductProps } from "@/types/ProductProps";

interface BodyPropsProduct extends Pick<ProductProps, "id" | "product" | "description" | "price"> {}

export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const { id, product, description, price }: BodyPropsProduct = body;

    const productExists = await Product.findOne({ product });

    if (productExists)
      return NextResponse.json({
        message: "This products already. Try another or change it.",
        error: true,
        status: 409
      });

    const newProduct: ProductProps = new Product({
      id,
      product,
      description,
      price
    });

    await newProduct.save();

    return NextResponse.json({
      message: "Product successfully registered!",
      status: 201,
      error: false
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error: ${error}`,
      status: 500,
      error: true
    });
  }
}
