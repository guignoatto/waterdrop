import WeekCard from "./components/week-card";

export default function Dashboard() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-1/4 p-4 min-w-96">
                <WeekCard />                
            </div>
        </div>
    );
}
