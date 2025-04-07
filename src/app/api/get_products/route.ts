import { NextResponse } from "next/server";
import Products from "@/models/products";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const products = await Products.find();

    const productsSort = products.reverse();

    if (products) {
      return NextResponse.json(productsSort, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Products not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
