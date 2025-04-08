import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tables from "@/models/tables";

export async function POST(req: Request) {
  const { name, id, qr_code } = await req.json();
  try {
    await connectDB();

    const newProduct = new Tables({
      name,
      id,
      qr_code,
    });
    const savedProduct = await newProduct.save();

    return NextResponse.json(
      { savedProduct },
      { status: 201, statusText: "Table added" }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("error");

      return NextResponse.json({ mensaje: error.message });
    }
  }
}
