import React from "react";
import "./imageCard.scss";
import AppIcon from "../icons/Icon";

function ImageCard(props) {
  return (
    <div className={`image-item ${props.item.hasError ? "error" : ""}`}>
      <div
        className="img-con"
        style={{ backgroundImage: `url("${props.item.src}")` }}
      />
      {!props.item.completed && (
        <div
          className="progress"
          style={{ width: `${props.item.progress}%` }}
        />
      )}
      {!props.item.completed && <div className="overlay" />}
      <div className="close" onClick={() => props.removeImage(props.item.id)}>
        <AppIcon name="withCross" type="entypo" />
      </div>
      {!props.isCover && (
        <button
          className="set-cover"
          onClick={() => props.changeCover(props.item.id)}
        >
          set cover
        </button>
      )}
      {props.isCover && (
        <button className="cover">
          <AppIcon name="checkCircle" type="feather" /> cover
        </button>
      )}
    </div>
  );
}

export default ImageCard;
