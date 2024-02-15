import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./card-style.css";
import { useAtomValue, useSetAtom } from "jotai";
import { activeSlotsListAtom, selectedCarSizeAtom } from "../store/store";

const ParkingSystemCard = (props) => {
    const { rowCount } = props;
    const availableSlotList = useAtomValue(activeSlotsListAtom);
    const [selectedEntrace, setSelectedEntrace] = useState();
    const [nearestSpot, setNearestSpot] = useState("");
    const [parkingMethod, setParkingMethod] = useState("park");
    const [parkingTime, setParkingTime] = useState(1);
    const carSize = useAtomValue(selectedCarSizeAtom);

    const handleGetValue = (value) => {
        return String.fromCharCode(65 + value);
    };

    const renderOption = () => {
        const options = [];
        for (let i = 0; i < rowCount; i++) {
            options.push(<option value={handleGetValue(i)}>{handleGetValue(i)}</option>);
        }

        return options;
    };

    const handleEntranceChange = (value) => {
        setSelectedEntrace(value);
    };

    const calculateDistance = (spot1, spot2) => {
        return Math.abs(spot1.charCodeAt(spot1.length - 1) - spot2.charCodeAt(spot2.length - 1));
    };

    const findNearestSpot = (availableSpots, currentPosition) => {
        let nearestSpot = null;
        let minDistance = Infinity;

        availableSpots.forEach((spot) => {
            const distance = calculateDistance(currentPosition, spot);
            if (distance < minDistance) {
                minDistance = distance;
                nearestSpot = spot;
            }
        });
        setNearestSpot(nearestSpot);
        return nearestSpot;
    };

    const calculateNearest = () => {
        console.log("values:", availableSlotList, selectedEntrace);
        const nearestSpot = findNearestSpot(availableSlotList, selectedEntrace);
        console.log("Nearest parking spot:", nearestSpot);
    };

    const handleAmountDue = () => {
        const price = parseInt(handleChargePerHour());

        const finalPrice = price * parkingTime;
        return finalPrice;
    };

    const handleChargePerHour = () => {
        if (carSize === "sm") {
            return "20 Php";
        } else if (carSize === "md") {
            return "60 Php";
        } else if (carSize === "lg") {
            return "100 Php";
        }
    };

    const handleTimeIncrease = () => {
        let time = 1;
        setParkingTime(time + 1);
    };
    return (
        <Card className="main-cards">
            <Card.Title>Parking System</Card.Title>
            <Card.Body>
                <Form className="d-flex gap-5">
                    <div className="d-flex mr-20 align-items-center gap-2">
                        <Form.Label>Entrance</Form.Label>
                        <Form.Select style={{ width: "80px" }} onChange={(e) => handleEntranceChange(e.target.value)}>
                            {renderOption()}
                        </Form.Select>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <Form.Check type="radio" label="Park" name="car-size-group" onChange={() => setParkingMethod("park")} />
                        <Form.Check type="radio" label="Unpark" name="car-size-group" onChange={() => setParkingMethod("unpark")} />
                    </div>
                    <Button onClick={() => calculateNearest()}>Confirm</Button>
                </Form>
                {parkingMethod === "park" ? (
                    <div className="available-slot">
                        <h4>Nearest Slot Available:</h4>
                        <h1 className="slot-coordinate">{nearestSpot}</h1>
                    </div>
                ) : (
                    <div className="available-slot">
                        <h4>Thank you for parking!</h4>
                        <div className="receipt">
                            <span className="d-flex justify-content-between">
                                Total Hours Spent
                                <span className="d-flex ml-auto">
                                    <b>{parkingTime}</b>
                                    <Button className="add-time-btn" onClick={() => handleTimeIncrease()}>
                                        +
                                    </Button>
                                </span>
                            </span>
                            <span className="d-flex justify-content-between">
                                Amount Charge per Hour
                                <span className="d-flex ml-auto">
                                    <b>{handleChargePerHour()}</b>
                                </span>
                            </span>
                            <span className="d-flex justify-content-between">
                                Overtime
                                <span className="d-flex ml-auto">
                                    <b>0</b>
                                </span>
                            </span>
                            <span className="d-flex justify-content-between">
                                Amount Due:
                                <span className="d-flex ml-auto">
                                    <b>{handleAmountDue()}</b>
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ParkingSystemCard;
