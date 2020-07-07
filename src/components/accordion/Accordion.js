import React from "react";
import AnimateHeight from "react-animate-height";
import proptype from "prop-types";

export function Accordion({ active, children, speed }) {
  return (
    <div className="Accordion">
      <AnimateHeight duration={speed} height={active ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
}

Accordion.defaultProps = {
  active: true,
  speed: 500
};

Accordion.propTypes = {
  active: proptype.bool,
  speed: proptype.number
};
