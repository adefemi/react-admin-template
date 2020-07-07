import Axios from "axios";

export const axiosHandler = (method = "", url = "", token = "", data = {}) => {
  let methodType = method.toUpperCase();
  if (
    ["GET", "POST", "PATCH", "DELETE"].includes(methodType) ||
    {}.toString(data) !== "[object Object]"
  ) {
    let axiosProps = { method: methodType, url, data };

    if (token) {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
    }
    return Axios(axiosProps);
  } else {
    alert(`method ${methodType} is not accepted or data is not an object`);
  }
};

export const testToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg1MzkxNjUzLCJqdGkiOiI1YTU1Y2QyODQ4MmU0Nzk3YjYzYzQ0NDdlMjE0Mjg4NiIsInVzZXJfaWQiOjE0fQ.lGwJduA36I5zJCknQ2DveGDvfSEioHOSuf6FXBhxZyw";
