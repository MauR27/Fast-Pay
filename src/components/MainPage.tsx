import SignOutComponent from "@/components/auth/SignOutComponent";
import React from "react";
import SignInComponent from "./auth/SignInComponent";

const MainPageCS = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome to Fast Pay</h1>
      <p>Your one-stop solution for fast payments.</p>
      <SignOutComponent />
      <SignInComponent />
    </div>
  );
};

export default MainPageCS;
