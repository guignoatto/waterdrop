'use client'
import { auth } from "@/auth"
import { Button } from "@nextui-org/button"
import { NavbarItem } from "@nextui-org/navbar"
import { redirect } from "next/navigation"

interface LoginLogoutProps {
    session: any,
    redirectSignIn(): void,
    redirectSignOut(): void
}
export default function LoginLogout({ session, redirectSignIn, redirectSignOut }: LoginLogoutProps){

    return (
        <>
        {session?

              <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                variant="flat"
                onPress={() => {
                    redirectSignOut()
                  }}
              >
                Sign Out
              </Button>
          :
              <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                variant="flat"
                onPress={() => {
                    redirectSignIn()
                }}
              >
                Sign In
              </Button>
          }
          </>
    )
}