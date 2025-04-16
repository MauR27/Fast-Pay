"use client";
import { ProductsOrderedType } from "@/models/tables";
import React, { FC, useEffect, useState } from "react";

type ParamsType = {
  param: string;
};

const TableOrders: FC<ParamsType> = ({ param }) => {
  const [tables, setTables] = useState({
    name: "",
    id: "",
    qr_code: "",
    orders: [],
    total: 0,
    paid: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/get_table_by_id?q=${param}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setTables(data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    })();
  }, [param]);

  console.log(tables);

  return (
    <div>
      <div className="bg-amber-800 p-4">
        <h1 className="text-xl font-bold mb-4">Table Orders</h1>
        <div className="flex flex-wrap">
          {tables.orders.map((table: ProductsOrderedType) => (
            <div key={table._id} className="flex bg-amber-900 w-full m-2">
              <li>{table.name}</li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOrders;
