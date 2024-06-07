import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";

interface Props {
  index: number;
  weekIntake: number[];
  setWeekIntake: React.Dispatch<React.SetStateAction<number[]>>;
}

const DayCard: React.FC<Props> = ({ index, weekIntake, setWeekIntake }) => {
  const [inputValue, setInputValue] = useState(weekIntake[index].toString());
  const [dayIntake, setDayIntake] = useState<number[]>([0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function checkCardColor(): string {
    if (weekIntake[index] === 0) {
      return "bg-red-950";
    }
    let percentage = weekIntake[index] / 3;

    if (percentage >= 1) {
      return "bg-green-900";
    } else if (percentage >= 0.75) {
      return "bg-yellow-600";
    } else if (percentage >= 0.5) {
      return "bg-orange-700";
    }
    return "bg-red-800";
  }

  function getInputColor() {
    if (weekIntake[index] === 0 || weekIntake[index] < 0) {
      return "danger";
    }

    let percentage = weekIntake[index] / 3;

    if (percentage >= 1) {
      return "success";
    } else if (percentage >= 0.75) {
      return "warning";
    } else if (percentage >= 0.5) {
      return "warning";
    }
    return "danger";
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Button
                  onClick={() => {
                    setDayIntake((prev) => {
                      const newDayIntake = [...prev, ...[0]];
                      return newDayIntake;
                    });
                  }}
                >
                  +
                </Button>
                {dayIntake.map((intake, ix) => (
                  <div className="flex items-center">
                    <Input
                      key={ix}
                      label="Liters"
                      value={intake.toString()}
                      type="number"
                      step={0.1}
                      onChange={(e) => {
                        setDayIntake((prev) => {
                          const newDayIntake = [...prev];
                          newDayIntake[ix] =
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value);
                          return newDayIntake;
                        });
                      }}
                      // color={getInputColor()}
                      className={`p-2 w-full`}
                      min={0}
                      isInvalid={false}
                      onFocusChange={() => {
                        if (dayIntake[ix] <= 0) {
                          setDayIntake((prev) => {
                            const newDayIntake = [...prev];
                            newDayIntake[ix] = 0;
                            return newDayIntake;
                          });
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        setDayIntake((prev) => {
                          const newDayIntake = [...prev];
                          newDayIntake.splice(ix, 1);
                          return newDayIntake;
                        });
                      }}
                    >
                      -
                    </Button>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    setWeekIntake((prev) => {
                      const newWeekIntake = [...prev];
                      newWeekIntake[index] = dayIntake.reduce(
                        (a, b) => a + b,
                        0,
                      );
                      return newWeekIntake;
                    });
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div
        className={`p-1 rounded-2xl ${checkCardColor()} cursor-pointer hover:bg-gray-800`}
        onClick={onOpen}
      >
        <label className="cursor-pointer">Day {index + 1}</label>
        <Divider className="mt-1 mb-1" />
        <div>
          <label className="cursor-pointer">
            {weekIntake[index].toFixed(2)}
          </label>
          <p className="text-sm">Liters</p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
