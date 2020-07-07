import React, { useEffect, useState } from "react";
import ms from "microseconds";
import { randomIDGenerator } from "../../utils/helper";
import "./slider.scss";

function Slider({ className, children }) {
  const [id] = useState(ms.now() + randomIDGenerator(10));
  useEffect(() => {
    const slider = document.getElementById(id);
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
    });
    slider.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }, []);
  return (
    <div
      id={id}
      className={className ? `slider-main ${className}` : "slider-main"}
    >
      {children}
    </div>
  );
}

export default Slider;
