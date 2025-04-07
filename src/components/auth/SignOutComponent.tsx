"use client";

import React from "react";
import { getSession, signOut } from "next-auth/react";

const SignOutComponent = () => {
  (async () => {
    const session = await getSession();
    console.log(session);
  })();
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutComponent;
