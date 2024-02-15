import React from "react";
import "./components-style.css";
import Slot from "./slot";
import { useAtom } from "jotai";
import { activeSlotsListAtom } from "../store/store";

const ParkingSlots = (rowId, getAvailableSlotList) => {
    const [availableSlots, setAvailableSlots] = useAtom(activeSlotsListAtom);

    const getActiveSlots = (slotStatus, id) => {
        console.log(rowId);
        if (slotStatus === "active" && !availableSlots.includes(id + rowId.rowId)) {
            // availableSlots.push(id + rowId.rowId);
            setAvailableSlots((prev) => [...prev, id + rowId.rowId]);
        } else if (slotStatus !== "active" && availableSlots.includes(id + rowId.rowId)) {
            availableSlots.filter((slots) => slots !== id + rowId.rowId);
        }

        console.log(availableSlots);
    };

    return (
        <div className="d-flex mt-3">
            <Slot isActive={getActiveSlots} slotId={1} />
            <Slot isActive={getActiveSlots} slotId={2} />
            <Slot isActive={getActiveSlots} slotId={3} />
            <Slot isActive={getActiveSlots} slotId={4} />
            <Slot isActive={getActiveSlots} slotId={5} />
            <Slot isActive={getActiveSlots} slotId={6} />
        </div>
    );
};

export default ParkingSlots;
