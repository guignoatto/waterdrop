"use client";

import { useState } from "react";
import DayCard from "./day-card";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { GET } from "@/app/api/add-pet/route";

export default function WeekCard() {
  const [weekIntake, setWeekIntake] = useState(Array<number>(7).fill(0));

  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');

  function totalWeekIntake(): number {
    let totalWeekIntake = 0;
    weekIntake.map((dayIntake) => {
      totalWeekIntake += dayIntake;
    });
    return totalWeekIntake;
  }

  function checkColor(): string {
    if (totalWeekIntake() === 0) {
      return "text-red-950";
    }
    let percentage = totalWeekIntake() / (7 * 3);

    if (percentage >= 1) {
      return "text-green-900";
    } else if (percentage >= 0.75) {
      return "text-yellow-600";
    } else if (percentage >= 0.5) {
      return "text-orange-700";
    }
    return "text-red-800";
  }
  
  async function handleSubmit() {
    try {
      const response = await fetch(`/api/add-pet?petName=${name}&ownerName=${name}`, {
        method: "GET", // ou "POST" caso prefira enviar dados no corpo da requisição
      });
      
      if (response.ok) {
        // Lógica de sucesso, como uma mensagem ou reset do input
        console.log("Dados enviados com sucesso!");
      } else {
        console.error("Erro ao enviar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <div>
      <Card
        className={`bg-neutral-950 border-1 border-red ${totalWeekIntake() >= 7 * 3 ? "border-green-500" : "border-red-700"}`}
      >
        <CardHeader className=" flex-col text-center">
          <h1>Weeks</h1>
          <h2>Total week intake:</h2>
          <p className={`font-bold text-large ${checkColor()}`} color="">
            {totalWeekIntake().toFixed(2)}L
          </p>
        </CardHeader>
        <Divider
          className={`${totalWeekIntake() >= 7 * 3 ? "bg-green-500" : "bg-red-700"}`}
        />
        <CardBody className="text-center">
          <Input
            key={'InputPetName'}
            label="Pet Name"
            value={name}
            type="string"
            step={0.1}
            onChange={(e) => {
              setName(e.target.value)
            }}
            className={`p-2 w-full`}
            min={0}
            isInvalid={false}
          />
          <Input
            key={'InputOwnerName'}
            label="Owner Name"
            value={owner}
            type="string"
            step={0.1}
            onChange={(e) => {
              setOwner(e.target.value)
            }}
            className={`p-2 w-full`}
            min={0}
            isInvalid={false}
          />
          <Button onClick={handleSubmit}>Submit</Button>
          {/* <div className="grid grid-cols-3 gap-4 rounded-md">
            {weekIntake.map((dayIntake, index) => (
              <DayCard
                key={index}
                index={index}
                weekIntake={weekIntake}
                setWeekIntake={setWeekIntake}
              />
            ))}
          </div> */}
        </CardBody>
      </Card>
    </div>
  );
}
