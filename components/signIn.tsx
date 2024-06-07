"use client";

import { signIn } from "next-auth/react";

export function SignIn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      onClick={() => {
        signIn();
      }}
    >
      {children}
    </button>
  );
}
