import { useState } from "react";
import "./App.css";
import ParkingSystemCard from "./cards/parking-system";
import ScenarioBuilderCard from "./cards/scenario-builder";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function App() {
    const [rowCount, setRowCount] = useState(3);

    const getRowCount = (count) => {
        setRowCount(count);
    };

    console.log("rowcount", rowCount);
    return (
        <div className="App">
            <ScenarioBuilderCard getRowCount={getRowCount} />
            <ParkingSystemCard rowCount={rowCount} />
            <Card className="p-3" style={{ width: "500px" }}>
                <Card.Title>Instructions</Card.Title>
                <Card.Body className="d-flex flex-column">
                    <span>1. Select a car size</span>
                    <span>2. Define the number of entrances</span>
                    <span>3. Declare the available parking lot spots.</span>
                    <span>4. Select an entrance and a method</span>
                    <span>5. Confirm</span>
                    <div>Note: Thank you for this activity. Unfortunately, I did not manage to finish it. Still, it was a fun activity.</div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default App;
