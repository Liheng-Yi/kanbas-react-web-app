import React from "react";

const Positions = () => {
  return (
    <div id="wd-css-position-relative">
      <h2>Relative</h2>
      <div className="bg-light">
        <div className="bg-warning" style={{ width: '75px', height: '100px' }}>
          <div className="position-relative" style={{ top: '20px', left: '20px' }}>
            Portrait
          </div>
        </div>
        <div className="bg-primary text-white" style={{ width: '100px', height: '75px' }}>
          <div className="position-relative" style={{ bottom: '30px', left: '30px' }}>
            Landscape
          </div>
        </div>
        <div className="bg-danger" style={{ width: '75px', height: '75px' }}>
          Square
        </div>
      </div>
      <div id="wd-css-position-fixed">
        <h2>Fixed position</h2>
        Checkout the blue square that says "Fixed position" stuck all the way on the right and half way down the page. It doesn't scroll with the rest of the page. Its position is "Fixed".
        <div className="position-fixed text-white" style={{ right: '0px', top: '50%', transform: 'translateY(-50%)', width: '175px', height: '75px', backgroundColor: '#007bff' }}>
          Fixed position
        </div>
      </div>
    </div>
  );
};

export default Positions;
