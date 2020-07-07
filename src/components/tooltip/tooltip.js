import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import "./tooltip.scss";

export function Tooltip({ tipText, children }) {
  const [id] = useState(Date.now());
  return (
    <>
      <div data-tip={tipText} data-for={id.toString()} className={"tooltip"}>
        {children}
      </div>
      <ReactTooltip
        className="tooltip-inner"
        effect="float"
        multiline
        id={id.toString()}
      />
    </>
  );
}
