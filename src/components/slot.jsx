import React, { useState } from "react";
import "./components-style.css";

const Slot = (props) => {
    const { isActive, slotId } = props;

    const [active, setIsActive] = useState(false);
    const [size, setSize] = useState("");

    const handleSize = () => {
        if (size === "") {
            setSize("SM");
        } else if (size === "SM") {
            setSize("MD");
        } else if (size === "MD") {
            setSize("LG");
        } else if (size === "LG") {
            setSize("");
        }
    };
    const setSlotState = () => {
        if (active === true && size === "LG") {
            setIsActive(false);
            handleSize();
        } else {
            isActive("active", slotId);
            setIsActive(true);
            handleSize();
        }
    };

    return (
        <div
            className={`${active === true ? "slot active" : "slot"} d-flex tex-center align-items-center justify-content-center`}
            onClick={() => setSlotState()}
        >
            {size}
        </div>
    );
};

export default Slot;
