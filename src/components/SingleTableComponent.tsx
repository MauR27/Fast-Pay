"use client";

import React, { FC, useEffect, useState } from "react";

import { getAllProducts } from "@/utils/getAllProducts";
// import TablesComponent from "./TablesComponent";

export type ProductsType = {
  _id: number | string;
  name: string;
  price: number;
  category: string;
  disponibility: boolean;
};
type ParamsType = {
  param: string;
};

type ProductsOrderedType = {
  product_id: number | string;
  quantity: number;
};

const SingleTableComponent: FC<ParamsType> = ({ param }) => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductsOrderedType[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching products:", error.message);
        }
      }
    })();
  }, [param]);

  // console.log(selectedProduct);

  const handleProductClick = (product: ProductsType) => {
    setSelectedProduct((prevSelected) => {
      const existingProduct = prevSelected.find(
        (item) => item.product_id === product._id
      );

      if (existingProduct) {
        return prevSelected.map((item) =>
          item.product_id === product._id
            ? {
                ...item,
                name: product.name,
                price: product.price,
                diponibiltiy: product.disponibility,
                category: product.category,
                product_id: item.product_id,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        return [
          ...prevSelected,
          {
            name: product.name,
            price: product.price,
            diponibiltiy: product.disponibility,
            category: product.category,
            product_id: product._id,
            quantity: 1,
          },
        ];
      }
    });
  };
  console.log(selectedProduct);

  const updateTableOrders = async (tableId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/add_orders_to_table`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: tableId,
            products: selectedProduct,
          }),
        }
      );
      const data = await response.json();
      console.log("Updated table orders:", data);
    } catch (error) {
      console.error("Error updating table orders:", error);
    }
  };

  return (
    <div className="bg-amber-950">
      {/* <TablesComponent products_selected={selectedProduct} /> */}
      <div>
        {products.map((product) => {
          return (
            <button
              key={product._id}
              value={product.name}
              className="m-2 p-2 bg-white rounded shadow-md text-black cursor-pointer"
              onClick={() => {
                // return updateTableOrders(param, product._id);\
                return handleProductClick(product);
              }}
            >
              {product.name}
            </button>
          );
        })}
        <button onClick={() => updateTableOrders(param)}>save order</button>
      </div>
    </div>
  );
};

export default SingleTableComponent;
