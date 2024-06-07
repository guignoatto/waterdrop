"use client"

import { useState } from "react";
import DayCard from "./day-card";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function WeekCard() {
    const [weekIntake, setWeekIntake] = useState(Array<number>(7).fill(0));

    function totalWeekIntake(): number {
        let totalWeekIntake = 0;
        weekIntake.map((dayIntake) => {
            totalWeekIntake += dayIntake;
        });
        return totalWeekIntake;
    }

    function checkColor() : string {
        if (totalWeekIntake() === 0) {
            return "text-red-950";
        } 
        let percentage = totalWeekIntake() / (7 * 3)

        if (percentage >= 1) {
            return "text-green-900";
        } else if (percentage >= 0.75) {
            return "text-yellow-600";
        } else if (percentage >= 0.5) {
            return "text-orange-700";
        }
        return "text-red-800";
    }


    return (
        <div >
            <Card 
                className={`bg-neutral-950 border-1 border-red ${totalWeekIntake() >= 7 * 3 ? "border-green-500" : "border-red-700"}`}
            >
                <CardHeader className=" flex-col text-center">
                    <h1>Weeks</h1>
                    <h2>Total week intake:</h2>
                    <p className={`font-bold text-large ${checkColor()}`}
                    color="">{totalWeekIntake().toFixed(2)}L</p>
                </CardHeader>
                <Divider className={`${totalWeekIntake() >= 7 * 3 ? "bg-green-500" : "bg-red-700"}`} />
                <CardBody className="text-center">
                    <div className="grid grid-cols-3 gap-4 rounded-md" >
                        {weekIntake.map((dayIntake, index) => (
                            <DayCard 
                                key={index}
                                index={index}
                                weekIntake={weekIntake}
                                setWeekIntake={setWeekIntake}
                            />
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
