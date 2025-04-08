import mongoose from "mongoose";

type ProductsOrderedType = {
  product_id: number;
  quantity: number;
};

type TablesSchemaType = {
  name: string;
  id: string;
  qr_code: string;
  orders?: ProductsOrderedType[];
  total: number;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const tableSchema = new mongoose.Schema<TablesSchemaType>(
  {
    name: { type: String, required: true, trim: true, uppercase: true },
    id: { type: String, required: true },
    qr_code: { type: String, required: true },
    orders: [
      {
        product_id: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Tables =
  mongoose.models.Tables ||
  mongoose.model<TablesSchemaType>("Tables", tableSchema);

export default Tables;
