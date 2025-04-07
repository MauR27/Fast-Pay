import SignOutComponent from "@/utils/SignOutComponent";
import React from "react";

const MainPageCS = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome to Fast Pay</h1>
      <p>Your one-stop solution for fast payments.</p>
      <SignOutComponent />
    </div>
  );
};

export default MainPageCS;
