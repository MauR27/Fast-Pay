"use client";

import React from "react";
import { getSession, signOut } from "next-auth/react";

const SignOutComponent = () => {
  (async () => {
    const session = await getSession();
    console.log(session);
  })();
  return <button onClick={() => signOut()}>signOut</button>;
};

export default SignOutComponent;
