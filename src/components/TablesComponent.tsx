"use client";
import React, { useEffect, useState } from "react";
import ProductsComponent from "./ProductsComponent";

// type ProductSelected = {
//   products_selected: string;
// };

type ProductsOrderedType = {
  product_id: number;
  quantity: number;
};

type TablesType = {
  name: string;
  id: string;
  qr_code: string;
  orders?: ProductsOrderedType[];
  total: number;
  paid: boolean;
};
const TablesComponent = () => {
  // const [tableOrders, setTableOrders] = useState<{ [key: number]: string[] }>(
  //   {}
  // );
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [tables, setTables] = useState<TablesType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/get_tables`
        );
        const data = await res.json();
        setTables(data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    })();
  }, []);

  console.log("tables", tables);

  // const addProductToTable = (tableId: number, product: string) => {
  //   setTableOrders((prevOrders) => ({
  //     ...prevOrders,
  //     [tableId]: [...(prevOrders[tableId] || []), product],
  //   }));
  // };

  return (
    <div className="bg-amber-800 p-4">
      <h1 className="text-xl font-bold mb-4">Select a table</h1>
      <div className="flex flex-wrap">
        {tables.map((table) => (
          <div key={table.id} className="m-2">
            <button
              className="bg-amber-100 text-black rounded-md h-40 w-40 shadow-md hover:bg-amber-200 transition duration-300 ease-in-out cursor-pointer"
              onClick={() =>
                setSelectedTableId((prev) =>
                  prev === table.id ? null : table.id
                )
              }
            >
              {table.name}
            </button>
            {selectedTableId === table.id && (
              <ProductsComponent table_id={table.id} />
            )}

            {/* {tableOrders[table.id] && (
              <div className="mt-2 p-2 bg-white rounded shadow-md">
                <h2 className="font-bold text-sm">Orden:</h2>
                <ul className="text-xs">
                  {tableOrders[table.id].map((product, index) => (
                    <li key={index}>• {product}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesComponent;
