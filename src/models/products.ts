import mongoose from "mongoose";

export enum FoodType {
  APPETIZER = "appetizer",
  MAIN_COURSE = "main_course",
  DESSERT = "dessert",
  DRINK = "drink",
  OTHER = "other",
}

type ProductSchemaType = {
  name: string;
  price: number;
  category: FoodType;
  description?: string;
  image?: string;
  disponibility?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new mongoose.Schema<ProductSchemaType>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: Object.values(FoodType), required: true },
    description: { type: String },
    image: { type: String },
    disponibility: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Products =
  mongoose.models.Products ||
  mongoose.model<ProductSchemaType>("Products", productSchema);
export default Products;
