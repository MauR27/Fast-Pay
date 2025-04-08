import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tables from "@/models/tables";

export async function GET() {
  try {
    await connectDB();
    const tables = await Tables.find();

    if (tables) {
      return NextResponse.json(tables, { status: 201 });
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
