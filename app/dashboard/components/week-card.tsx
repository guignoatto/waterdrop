"use client"

import { useState } from "react";
import DayCard from "./day-card";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function WeekCard() {
    const [weekIntake, setWeekIntake] = useState(Array(7).fill(0));
    function totalWeekIntake(): number {
        return weekIntake.reduce((a, b) => a + b, 0);
    }
    return (
        <div >
            <Card className={`bg-neutral-950 border-1 border-red ${totalWeekIntake() >= 7 * 2.6 ? "border-green-500" : "border-red-700"}`}>
                <CardHeader className=" flex-col text-center">
                    <h1>Weeks</h1>
                    <h2>Total week intake:</h2>
                    <p className={`font-bold text-large ${totalWeekIntake() >= 7 * 2.6 ? "text-green-500" : "text-red-700"}`}
                    color="">{totalWeekIntake()}L</p>
                </CardHeader>
                <Divider className={`${totalWeekIntake() >= 7 * 2.6 ? "bg-green-500" : "bg-red-700"}`} />
                <CardBody className="text-center">
                    <div className="grid grid-cols-3 gap-4 rounded-md" >
                        {weekIntake.map((dayIntake, index) => (
                            <div key={index} className="w-full max-w-xs">
                                <DayCard index={index} weekIntake={weekIntake} setWeekIntake={setWeekIntake} />
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
