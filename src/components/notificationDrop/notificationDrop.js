import React, { useContext, useEffect, useState } from "react";
import "./notificationDrop.scss";
import AppIcon from "../icons/Icon";
import Badge from "../Badge/badge";
import { axiosHandler } from "../../utils/axiosHandler";
import { NOTIFICATIONS_URL } from "../../utils/urls";
import { getToken } from "../../utils/helper";
import moment from "moment";
import { Spinner } from "../spinner/Spinner";
import { secondaryColor } from "../../utils/data";
import { Link, withRouter } from "react-router-dom";
import { store } from "../../stateManagement/store";
import { reloadNotification } from "../../stateManagement/actions";

function NotificationDrop(props) {
  const [notifications, setNotifications] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const {
    state: { userDetails, reloadNotificationStatus },
    dispatch
  } = useContext(store);

  useEffect(() => {
    if (!userDetails.role) return;
    positionOptionDrop();
    document
      .getElementById("mainBar")
      .addEventListener("scroll", positionOptionDrop);
    window.addEventListener("resize", positionOptionDrop);
    const notContent = document.getElementById("notification-con");
    notContent.addEventListener("scroll", function() {
      if (
        notContent.scrollHeight - notContent.scrollTop ===
        notContent.clientHeight
      ) {
        if (!loading && notifications.next) {
          setLoading(true);
          let notArray = notifications.next.split("?");
          getNotifications(`?${notArray[notArray.length - 1]}`);
        }
      }
    });

    getNotifications();
    dispatch({ type: reloadNotification, payload: false });
  }, [userDetails, reloadNotificationStatus]);

  const defineCount = notArray => {
    let counter = 0;
    notArray.map(item => {
      if (!item.viewed) counter++;
      return null;
    });
    setCount(counter);
  };

  const getNotifications = (extras = "") => {
    axiosHandler("get", NOTIFICATIONS_URL + extras, getToken()).then(
      res => {
        setNotifications(res.data.results);
        defineCount(res.data.results.results);
        setFetching(false);
        setLoading(false);
      },
      err => {}
    );
  };

  const positionOptionDrop = () => {
    const bell = document.getElementById("navNotify");
    const notifyCon = document.getElementById("notification-con");
    if (!bell || !notifyCon) return;

    notifyCon.style.left = `${bell.getBoundingClientRect().left -
      notifyCon.getBoundingClientRect().width / 2}px`;

    notifyCon.style.top = `${bell.getBoundingClientRect().top +
      bell.getBoundingClientRect().height +
      10}px`;
  };

  const toggleNotification = () => {
    const notifyMain = document.getElementById("notification-main");
    if (notifyMain.classList.contains("closed")) {
      positionOptionDrop();
      notifyMain.classList.remove("closed");
    } else {
      notifyMain.classList.add("closed");
    }
  };

  const updateNotification = id => {
    axiosHandler("patch", NOTIFICATIONS_URL + `/${id}`, getToken(), {
      viewed: true
    }).then(res => getNotifications());
  };

  const gotoPath = (path, id) => {
    updateNotification(id);
    toggleNotification();
    props.history.push(path.split("https://frontend.rentright.co")[1]);
  };

  return (
    <div className="notification-drop">
      <div className="desktop">
        <span id="navNotify" onClick={toggleNotification}>
          <Badge count={count}>
            <AppIcon name="bell" type="entypo" />
          </Badge>{" "}
        </span>
      </div>
      <Link to="/notifications" className="mobile">
        <span id="navNotify">
          <Badge count={count}>
            <AppIcon name="bell" type="entypo" />
          </Badge>{" "}
        </span>
      </Link>
      <div className="notification-con closed" id="notification-main">
        <div className="overlay" onClick={toggleNotification} />
        <div id="notification-con" className="not-content">
          {fetching && <div>Fetching latest notifications...</div>}
          {!fetching &&
            notifications.results.map((item, key) => (
              <li
                onClick={() => gotoPath(item.rel_path, item.id)}
                className={`${!item.viewed ? "active" : ""}`}
                key={key}
              >
                <div
                  className="info"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <div className="time">
                  {moment(new Date(item.created_at)).fromNow()}
                </div>
              </li>
            ))}
          {loading && (
            <div>
              <p />
              <center>
                <Spinner size={13} color={secondaryColor} />
              </center>
              <p />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(NotificationDrop);
