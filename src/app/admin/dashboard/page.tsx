// import ProductsComponent from "@/components/ProductsComponent";
import AddTableComponent from "@/components/AddTableComponent";
import TablesComponent from "@/components/TablesComponent";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex gap-4 p-4 h-screen">
      <TablesComponent />
      <AddTableComponent />
      {/* <ProductsComponent /> */}
    </div>
  );
};

export default DashboardPage;
