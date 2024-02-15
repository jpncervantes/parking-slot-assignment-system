import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "./card-style.css";
import ParkingSlots from "../components/parking-slots";
import { selectedCarSizeAtom } from "../store/store";
import { useAtom } from "jotai";

const ScenarioBuilderCard = (props) => {
    const { getRowCount } = props;
    const [rowCount, setRowCount] = useState(3);
    const [selectedCarSize, setSelectedCarSize] = useAtom(selectedCarSizeAtom);

    const getAvailableSlotList = (list) => {
        return "hi";
    };

    const handleGetRowId = (value) => {
        return String.fromCharCode(65 + value);
    };
    const renderRow = () => {
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            rows.push(<ParkingSlots rowId={handleGetRowId(i)} getAvailableSlotList={getAvailableSlotList((list) => console.log(list))} />);
        }
        return rows;
    };

    const handleRowCount = (value) => {
        if (value) {
            setRowCount(value);
            getRowCount(value);
        } else {
            setRowCount(3);
            getRowCount(3);
        }
    };
    return (
        <Card style={{ width: "500px" }} className="main-cards">
            <Card.Title>Scenario Builder</Card.Title>
            <Card.Body>
                <div>
                    <span className="form-subtitle">Car Size</span>
                    <Form className="car-size-form">
                        <Form.Check type="radio" label="Small" name="car-size-group" onChange={() => setSelectedCarSize("sm")} />
                        <Form.Check type="radio" label="Medium" name="car-size-group" onChange={() => setSelectedCarSize("md")} />
                        <Form.Check type="radio" label="Large" name="car-size-group" onChange={() => setSelectedCarSize("lg")} />
                    </Form>
                </div>
                <div className="mt-3">
                    <span className="form-subtitle">No. of Entrances</span>
                    <Form className="car-size-form">
                        <Form.Control style={{ width: "50px" }} onChange={(e) => handleRowCount(e.target.value)} placeholder={3} />
                    </Form>
                </div>
                <div className="mt-3">
                    <span className="form-subtitle">Slot Availability</span>
                    {renderRow()}
                </div>
            </Card.Body>
        </Card>
    );
};

export default ScenarioBuilderCard;
