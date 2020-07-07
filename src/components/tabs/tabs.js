import React, { useEffect, useState } from "react";
import "./tabs.scss";
import proptype from "prop-types";

export const Tabs = props => {
  const [body, setBody] = useState([]);
  const [heading, setHeading] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (props.body !== body) setBody(props.body);
    if (props.heading !== heading) setHeading(props.heading);
    if (props.activeIndex !== activeIndex) setActiveIndex(props.activeIndex);
  }, [props]);

  return (
    <div className="tabs-container">
      <div className="heading">
        {heading.map((item, id) => (
          <div
            onClick={() => setActiveIndex(id)}
            className={`tab-item ${activeIndex === id ? "active" : ""}`}
            key={id}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="tab-body">{body[activeIndex]}</div>
    </div>
  );
};

Tabs.propTypes = {
  body: proptype.arrayOf(proptype.elementType).isRequired,
  heading: proptype.arrayOf(proptype.elementType).isRequired,
  className: proptype.string,
  activeIndex: proptype.number,
  onSwitch: proptype.func
};

Tabs.defaultProps = {
  body: [],
  heading: [],
  onSwitch: () => null,
  activeIndex: 0,
  className: ""
};
