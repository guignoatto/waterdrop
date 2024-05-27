"use client";
import { Input } from "@nextui-org/input";
import { Session } from "next-auth";
import { useState } from "react";

interface FormProps {
  session: Session;
}

export default function Form({ session }: FormProps) {
  const [waterPerDay, setWaterPerDay] = useState("");
  const [userName, setUserName] = useState(
    session.user?.name ? session.user?.name : "",
  );
  return (
    <>
      <div className="flex gap-5">
        <Input
          value={userName}
          type="string"
          label="Your name"
          defaultValue={session.user?.name || ""}
          onClear={() => setUserName("")}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          isClearable
        />
        <Input
          value={waterPerDay}
          type="number"
          label="Liters/day"
          onClear={() => setWaterPerDay("")}
          onChange={(e) => {
            if (parseInt(e.target.value) < 0) {
              console.log(e.target.value);
              setWaterPerDay("0");
              return;
            }
            setWaterPerDay(e.target.value);
          }}
          isClearable
        />
      </div>
    </>
  );
}
