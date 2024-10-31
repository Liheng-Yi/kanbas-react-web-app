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
    <div className="container mt-4" id="wd-array-state-variables">
      <h2 className="mb-4">Array State Variable</h2>
      
      <button 
        onClick={addElement}
        className="btn btn-success mb-3"
      >
        Add Element
      </button>

      <div className="list-group">
        {array.map((item, index) => (
          <div 
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2"
          >
            <span className="h5 mb-0">{item}</span>
            <button
              onClick={() => deleteElement(index)}
              className="btn btn-danger"
              id="wd-delete-element-click"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <hr className="mt-4"/>
    </div>
  );
}
