import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Products from "@/models/products";

export async function POST(req: Request) {
  const { name, price, category, description } = await req.json();
  try {
    await connectDB();

    const newProduct = new Products({
      name,
      price,
      category,
      description,
    });
    const savedProduct = await newProduct.save();

    return NextResponse.json(
      { savedProduct },
      { status: 201, statusText: "product added" }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("error");

      return NextResponse.json({ mensaje: error.message });
    }
  }
}
