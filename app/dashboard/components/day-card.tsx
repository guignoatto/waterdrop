import { Input } from '@nextui-org/input';
import React, { useState } from 'react';

interface Props {
    index: number;
    weekIntake: number[];
    setWeekIntake: React.Dispatch<React.SetStateAction<number[]>>;
}

const DayCard: React.FC<Props> = ({ index, weekIntake, setWeekIntake }) => {
    const [inputValue, setInputValue] = useState(weekIntake[index].toString());

    return (
        <div className={`p-1 rounded-2xl ${weekIntake[index] >= 3 ? "bg-green-700" : 'bg-red-950'} `}>
            <label>Day {index + 1}</label>
            <div>
                <Input
                    label='Liters'
                    value={inputValue}
                    type="number"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setWeekIntake((prev) => {
                            const newWeekIntake = [...prev];
                            newWeekIntake[index] = e.target.value === '' ? 0 : parseInt(e.target.value);
                            return newWeekIntake;
                        });
                    }}
                    color={weekIntake[index] >= 3 ? 'success' : 'danger'}
                    className="p-2 w-full"
                    onFocusChange={(focused) => {
                        if (!focused) {
                            setInputValue(weekIntake[index].toString());
                        }
                    }
                    }
                />
            </div>
        </div>
    );
};

export default DayCard;
