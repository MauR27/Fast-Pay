import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tables from "@/models/tables";
import { ProductsType } from "@/components/SingleTableComponent";

type ProductsOrderedType = {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  disponibility: string;
  category: string;
};

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { _id, products } = await req.json();

    if (!products) {
      return NextResponse.json(
        { message: "You have to select a product before save it" },
        { status: 400 }
      );
    }

    const table = await Tables.findOne({ _id });

    if (!table) {
      return NextResponse.json({ message: "Table not found" }, { status: 404 });
    }

    if (!table.orders) {
      table.orders = [];
    }

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products selected" },
        { status: 400 }
      );
    }

    const existingProductIds = table.orders.map((order: ProductsOrderedType) =>
      order.product_id.toString()
    );
    const newProducts = products.filter(
      (product: ProductsType) => !existingProductIds.includes(product._id)
    );

    for (const product of newProducts) {
      const existingOrder = table.orders.find(
        (order: ProductsOrderedType) =>
          order.product_id.toString() === product.product_id
      );

      if (existingOrder) {
        existingOrder.quantity += product.quantity;
      } else {
        table.orders.push(product);
      }
    }

    const updatedOrders = await table.save();

    return NextResponse.json(updatedOrders, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating table orders:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
