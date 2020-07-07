import React from "react";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { arrows_remove as arrowsRemove } from "react-icons-kit/linea/arrows_remove";
import { exclamation } from "react-icons-kit/metrize/exclamation";
import { check } from "react-icons-kit/metrize/check";
import { cross } from "react-icons-kit/metrize/cross";
import { info } from "react-icons-kit/metrize/info";
import { question } from "react-icons-kit/metrize/question";
import ReactDOM from "react-dom";

import "./Notification.scss";
import { addClass, removeClass, randomIDGenerator } from "../../utils/helper";

export const getIconType = propType => {
  let icon;
  switch (propType) {
    case "info":
      icon = info;
      break;

    case "success":
      icon = check;
      break;

    case "warning":
      icon = exclamation;
      break;

    case "error":
      icon = cross;
      break;

    case "confirm":
      icon = question;
      break;

    default:
      icon = null;
  }

  return icon;
};

const onClose = setVisible => {
  let el = document.querySelector(".notification-main");
  addClass(el, "closer");
  setTimeout(() => {
    addClass(el, "remove");
    setVisible(false);
  }, 300);
};

const onOpen = () => {
  let el = document.querySelector(".notification-main");
  removeClass(el, "remove");
  removeClass(el, "closer");
};

export const Notification = props => {
  let icon = getIconType(props.type);

  if (!props.visible) {
    return null;
  } else {
    onOpen(props.setVisible);
  }

  return (
    <NotificationElement
      type={props.type}
      closable={props.closable}
      onClick={() => onClose(props.setVisible)}
      icon={icon}
      title={props.title}
    >
      {props.children}
    </NotificationElement>
  );
};

const NotificationElement = ({
  type,
  onClick,
  closable,
  icon,
  title,
  children
}) => (
  <div className={`notification-main ${type}`}>
    <div className={closable ? "close-button-main" : "hide"} onClick={onClick}>
      <Icon size={30} icon={arrowsRemove} />
    </div>

    {icon && (
      <div className={"icon-contain"}>
        <Icon size={30} icon={icon} />
      </div>
    )}

    <div className="contents">
      <div className={title ? "title" : "hide"}>{title}</div>
      <div
        className={children ? "children" : "hide"}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  </div>
);

const removeFromDom = (parent, child) => {
  if (parent.contains(child)) {
    parent.removeChild(child);
  }

  if (!parent.hasChildNodes() && document.body.contains(parent)) {
    document.body.removeChild(parent);
  }
};

Notification.bubble = props => {
  let el = document.getElementById("notification-root");
  if (!el) {
    el = document.createElement("div");
    el.id = "notification-root";
    document.body.appendChild(el);
  }

  let node = document.createElement("div");
  let id = randomIDGenerator(6);
  node.id = "notification-node-" + id;
  el.prepend(node);

  ReactDOM.render(
    <div
      id={id}
      className="notification-bubble"
      style={{ marginTop: "-100px", marginBottom: "100px" }}
      onMouseEnter={() => clearTimeout(id)}
      onMouseLeave={() =>
        (id = setTimeout(() => removeFromDom(el, node), 4000))
      }
    >
      <NotificationElement
        closable={true}
        type={props.type}
        icon={getIconType(props.type)}
        onClick={() => removeFromDom(el, node)}
      >
        {props.content}
      </NotificationElement>
    </div>,
    node,
    () => {
      id = setTimeout(() => removeFromDom(el, node), 4000);
    }
  );
};

Notification.defaultProps = {
  type: "default",
  closable: true,
  visible: false,
  selfHide: false
};

Notification.propTypes = {
  type: PropTypes.oneOf(["success", "default", "info", "error", "warning"]),
  title: PropTypes.string,
  closable: PropTypes.bool,
  visible: PropTypes.bool,
  setVisible: PropTypes.func.isRequired
};
