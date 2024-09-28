import React from "react";

const Margins = () => {
  return (
    <div id="wd-css-margins">
      <h2>Margins</h2>
      <div
        className="mb-5 pt-5 ps-5 border border-5 border-danger bg-warning">
        Margin bottom
      </div>
      <div
        className="mx-5 pb-5 pe-5 border border-5 border-primary bg-warning">
        Margin left right
      </div>
      <div
        className="m-3 p-5 border border-5 border-warning bg-primary text-white">
        Margin all around
      </div>
    </div>
  );
};

export default Margins;
