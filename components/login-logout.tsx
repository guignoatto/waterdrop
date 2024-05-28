"use client";
import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginLogout() {
  const data = useSession();

  return (
    <>
      {data ? (
        <Button
          className="text-sm font-normal text-default-600 bg-default-100"
          variant="flat"
          onPress={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          className="text-sm font-normal text-default-600 bg-default-100"
          variant="flat"
          onPress={() => {
            signIn();
          }}
        >
          Sign In
        </Button>
      )}
    </>
  );
}
