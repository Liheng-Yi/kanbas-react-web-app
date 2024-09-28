import React from "react";

const Padding = () => {
  return (
    <div id="wd-css-paddings">
      <h2>Padding</h2>
      <div className="pt-5 ps-5 border border-5 border-danger bg-warning">
        Padded top left
      </div>

      <div className="pb-5 pe-5 border border-5 border-primary bg-warning">
        Padded bottom right
      </div>

      <div className="p-5 border border-5 border-warning bg-primary text-white">
        Padded all around
      </div>
    </div>
  );
};

export default Padding;
