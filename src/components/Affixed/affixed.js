import React, { useEffect, useState } from "react";
import ms from "microseconds";
import { randomIDGenerator } from "../../utils/helper";

function Affixed(props) {
  const [fixedUp, setFixedUp] = useState(false);
  const [id] = useState(`${ms.now()}${randomIDGenerator(5)}`);
  useEffect(() => {
    window.addEventListener("resize", () => calculateAffix(id));
    document
      .getElementById("mainBar")
      .addEventListener("scroll", () => calculateAffix(id));
  }, []);

  const calculateAffix = newId => {
    const affixEl = document.getElementById(`adx-affix-${newId}`);
    const affixMarker = document.getElementById(`affix-marker-${newId}`);
    let affixRect;
    try {
      affixRect = affixMarker.getBoundingClientRect();
    } catch (e) {
      return;
    }
    let pageOffset = props.offset || 0;

    if (affixRect.top <= pageOffset) {
      if (fixedUp) return;
      affixEl.style.position = "fixed";
      affixEl.style.top = `${pageOffset}px`;
      affixEl.style.left = `${affixRect.left}px`;
      affixEl.style.width = `${affixRect.width}px`;
      setFixedUp(true);
    } else {
      affixEl.style.position = "unset";
      setFixedUp(false);
    }
  };
  return (
    <div>
      <div id={`affix-marker-${id}`} />
      <div id={`adx-affix-${id}`}>{props.children}</div>
    </div>
  );
}

export default Affixed;
