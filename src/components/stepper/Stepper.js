import React from "react";

import "./Stepper.scss";

export function Stepper({
  active,
  children,
  className = "",
  vertical = false
}) {
  let stepsArray = React.Children.toArray(children),
    activeStatus;

  const steps = () => {
    return stepsArray.map((step, index) => {
      activeStatus = step.props.active ? " active " : "";
      return index < stepsArray.length - 1 ? (
        <React.Fragment key={index}>
          {step}
          <div className={"step-line" + activeStatus} />
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>{step}</React.Fragment>
      );
    });
  };
  return (
    <div className={"Stepper " + className}>
      <div
        className={
          "dflex justify-around " +
          (vertical ? "columns vertical-orientation" : "")
        }
      >
        {steps()}
      </div>
    </div>
  );
}
