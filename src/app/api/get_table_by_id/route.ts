import { NextResponse } from "next/server";
import Tables from "@/models/tables";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    console.log(searchParams);

    const id = searchParams.get("q");

    const _id = id ? id : null;

    const table = await Tables.findOne({ _id });
    if (!table) {
      return NextResponse.json({ message: "Table not found" }, { status: 404 });
    }

    if (table) {
      return NextResponse.json(table, { status: 201 });
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
