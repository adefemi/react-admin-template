import AppIcon from "../icons/Icon";
import React, { useEffect, useState } from "react";
import "./contentModal.scss";

function ContentModal(props) {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(props.visible);
  }, [props.visible]);

  return (
    <div className={`order-summary-con ${visibility ? "show" : ""}`}>
      <div className="overlay" />
      <div className="summary-con">
        <div
          className="close"
          onClick={() => {
            setVisibility(false);
            props.setVisible(false);
          }}
        >
          <AppIcon name="x" type="feather" />
        </div>
        {visibility && <div className="inner">{props.children}</div>}
      </div>
    </div>
  );
}

export default ContentModal;
