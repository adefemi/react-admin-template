import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../common/slider-wrapper/Slider.scss";

export function Carousel(props) {
  let slickSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false
  };

  const [settings, setSettings] = useState(slickSettings);

  useEffect(() => {
    const widthMain = window.screen.width;
    const defaultCount = props.children.length;

    if (widthMain <= 600) {
      setSettings({
        ...settings,
        slidesToShow: 1,
        arrows: true,
        infinite: true
      });
    } else if (widthMain <= 800) {
      setSettings({
        ...settings,
        slidesToShow: 2,
        arrows: true,
        infinite: defaultCount >= 2
      });
    } else if (widthMain <= 1300) {
      setSettings({
        ...settings,
        slidesToShow: 3,
        arrows: true,
        infinite: defaultCount >= 3
      });
    } else {
      setSettings({
        ...settings,
        slidesToShow: 4,
        arrows: true,
        infinite: defaultCount >= 4
      });
    }
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      {!props.infinite ? (
        <Slider {...settings} infinite={false}>
          {props.children}
        </Slider>
      ) : (
        <Slider {...settings}>{props.children}</Slider>
      )}
    </div>
  );
}
