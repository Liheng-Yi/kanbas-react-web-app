import React, { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="btn btn-success text-white"
                onClick={addElement}>Add Element</button> <br /> <br />
            <ul className="list-group d-flex gap-2">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                        <span className="me-3">{item}</span> {/* Added margin end to create space */}
                        <button className="btn btn-danger text-white"
                            onClick={() => deleteElement(index)}
                            id="wd-delete-element-click">
                            Delete</button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}
