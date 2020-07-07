import React from "react";
import "./divider.scss";

function Divider(props) {
  return <div className={`adx-divider ${props.dashed ? "dashed" : ""}`} />;
}

export default Divider;
