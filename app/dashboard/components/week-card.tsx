"use client"

import { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import DayCard from "./day-card";

export default function WeekCard() {
    const [weekIntake, setWeekIntake] = useState(Array(7).fill(0));
    function totalWeekIntake(): number {
        return weekIntake.reduce((a, b) => a + b, 0);
    }
    return (
        <div className="text-center p-4">
            <h1>Weeks</h1>
            <h2>Total week intake:</h2>
            <p className={`font-bold text-large ${totalWeekIntake() >= 7 * 2.6 ? "text-green-500" : "text-red-700"}`}
            color="">{totalWeekIntake()}</p>
            <div className="grid grid-cols-3 gap-4 bg-neutral-900 rounded-md p-4" >
                {weekIntake.map((dayIntake, index) => (
                    <div key={index} className="w-full max-w-xs">
                        <DayCard index={index} weekIntake={weekIntake} setWeekIntake={setWeekIntake} />
                    </div>
                ))}
            </div>
        </div>
    );
}
