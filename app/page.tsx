import { auth } from "@/auth";
import Form from "@/components/form";
import { SignIn } from "@/components/signIn";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import Dashboard from "./dashboard/page";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <section className="grid place-items-center mb-10">
        {session && 
          <div>
            <Image
              width={100}
              src={
                session?.user?.image
                  ? session.user.image
                  : "https://avatars.githubusercontent.com/u/66191662?v=4"
              }
              alt="Profile Picture"
              className="rounded-full mb-5"
            />
          </div>
        }
        <Card className="max-w-[400px]">
          <CardHeader className="flex justify-center gap-3">
            <span data-src="">💧</span>
            <div className="flex flex-col">
              <p className="text-md">Water Drop</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="text-center">
            <p>Let&apos;s keep your body hydrated!</p>
          </CardBody>
          <Divider />
        </Card>
      </section>

      <section>
        <div className="flex flex-col items-center">
          {session ? (
            <Link href="/dashboard">
              <Button>Lets get started!</Button>
            </Link>
          ) : (
            <Card className="max-w-[400px] text-center">
              <Divider />
              <CardBody>
                <SignIn>
                  Sign in to start tracking your water intake!
                </SignIn>
              </CardBody>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
