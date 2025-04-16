import mongoose from "mongoose";

export type ProductsOrderedType = {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  disponibility: string;
  category: string;
  _id: string;
};

export type TablesSchemaType = {
  name: string;
  id: string;
  qr_code: string;
  orders: ProductsOrderedType[];

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
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number },
        name: { type: String },
        price: { type: Number },
        category: { type: String },
        disponibility: { type: String },
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
