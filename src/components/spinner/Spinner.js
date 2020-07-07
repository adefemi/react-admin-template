import React from "react";
import "./Spinner.scss";

export const Spinner = ({
  color = "#ffffff",
  size = 15,
  type = "default",
  style
}) => {
  return (
    <div
      style={{
        ...style,
        borderRightColor: color,
        width: `${size}px`,
        height: `${size}px`
      }}
      className={`lds-dual-ring ${type}`}
    />
  );
};
