import React, { useEffect, useState } from "react";
import ms from "microseconds";
import "./fileUploadNew.scss";
import { Notification } from "../notification/Notification";
import { randomIDGenerator } from "../../utils/helper";
import axios from "axios";
import { FILE_UPLOAD_URL, tempToken } from "../../utils/urls";
import proptype from "prop-types";
import badFile from "../../assets/pngs/badFile.png";
import { axiosHandler } from "../../utils/axiosHandler";

function FileUploadNew(props) {
  const id = ms.now() + randomIDGenerator(5);
  const [ref, setRef] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setRef(document.getElementById(id));
  }, []);

  const onChangeFile = e => {
    let files = e.target.files;
    let validFile = [];
    for (let i = 0; i < files.length; i++) {
      if (props.maxUpload && i + 1 > props.maxUpload) {
        Notification.bubble({
          type: "warning",
          content: `Maximum image allow is ${props.maxUpload}`
        });
        break;
      }
      if (checkImageValidity(files[i]["type"])) {
        validFile.push(files[i]);
      } else {
        Notification.bubble({
          type: "error",
          content: `${files[i]["name"]} is not a valid image type`
        });
      }
    }
    setUpImageData(validFile);
  };

  const setUpImageData = validImages => {
    let newList = [];
    for (let i = 0; i < validImages.length; i++) {
      let idValue = ms.now() + randomIDGenerator(5);
      let tempData = {
        name: validImages[i]["name"],
        started: false,
        progress: 0,
        file: validImages[i],
        completed: false,
        hasError: false,
        id: idValue,
        src: URL.createObjectURL(validImages[i])
      };
      newList.push(tempData);
    }
    setActiveIndex(imageData.length);
    setImageData([...imageData, ...newList]);
  };

  const updateImageData = (id, progress, type = null) => {
    let newList = imageData.map(item => {
      if (!type) {
        if (item.id === id) {
          item.progress = progress;
        }
      } else if (type === "started") {
        if (item.id === id && !item.started) {
          item.started = true;
        }
      } else if (type === "completed") {
        if (item.id === id && !item.completed) {
          item.completed = true;
          item.src = progress.src;
          item.id = progress.id;
          let newIndex = activeIndex + 1;
          if (newIndex <= imageData.length - 1) {
            setActiveIndex(newIndex);
          }
        }
      } else if (type === "error") {
        if (item.id === id && !item.hasError) {
          item.hasError = true;
          item.src = badFile;
        }
      }

      return item;
    });
    setImageData(newList);
  };

  useEffect(() => {
    if (imageData[activeIndex] && !imageData[activeIndex].started) {
      new UploadClass({
        fileName: props.fileName,
        uploadUrl: props.uploadUrl,
        method: props.method,
        token: props.token,
        callBack: updateImageData,
        fileData: imageData[activeIndex]
      });
    }
    props.onChange(imageData);
  }, [imageData, activeIndex]);

  const checkImageValidity = imageType => {
    let tempType = imageType.split("/");
    let ext = tempType[tempType.length - 1];
    return props.validImageTypesSrc.includes(ext);
  };

  const removeFile = id => {
    let activeImage = {};
    let newImageData = imageData.filter(item => {
      if (item.id === id) activeImage = item;
      return item.id !== id;
    });
    setActiveIndex(newImageData.length - 1);
    setImageData(newImageData);
    if (activeImage.completed) {
      deleteImage(id);
    }
  };

  const deleteImage = id => {
    let url = props.deleteUrl + `/${id}`;
    axiosHandler("delete", url, props.token);
  };

  useEffect(() => {
    if (props.removeTrigger) {
      if (props.fileIdToRemove) {
        removeFile(props.fileIdToRemove);
      }
      props.updateTrigger();
    }
  }, [props.removeTrigger]);

  return (
    <div className={`file-constrain ${props.className ? props.className : ""}`}>
      <button
        className="file-upload-button"
        onClick={() => {
          if (props.disabled) return;
          ref.click();
        }}
        onDrop={e => {
          e.preventDefault();
          if (props.disabled) return;
          onChangeFile({
            target: {
              files: e.dataTransfer.files
            }
          });
        }}
        onDragOver={e => e.preventDefault()}
      >
        {props.children}
      </button>

      <input
        onChange={onChangeFile}
        id={id}
        type="file"
        multiple={props.multiple}
        style={{ display: "none" }}
      />
    </div>
  );
}

FileUploadNew.defaultProps = {
  multiple: true,
  validImageTypesSrc: ["gif", "jpeg", "png", "jpg"],
  fileName: "file",
  method: "post",
  uploadUrl: FILE_UPLOAD_URL,
  deleteUrl: FILE_UPLOAD_URL,
  token: tempToken,
  updateTrigger: () => null,
  onChange: () => null
};

FileUploadNew.propType = {
  disabled: proptype.bool,
  multiple: proptype.bool,
  validImageTypesSrc: proptype.array,
  fileName: proptype.string,
  method: proptype.string,
  uploadUrl: proptype.string,
  deleteUrl: proptype.string,
  token: proptype.string,
  onChange: proptype.func,
  fileIdToRemove: proptype.any,
  updateTrigger: proptype.func,
  removeTrigger: proptype.bool,
  maxUpload: proptype.number
};

class UploadClass {
  fileData;
  callBack;
  fileName;
  token;
  method;
  uploadUrl;
  constructor({ fileData, callBack, fileName, token, method, uploadUrl }) {
    this.fileData = fileData;
    this.callBack = callBack;
    this.fileName = fileName;
    this.token = token;
    this.method = method;
    this.uploadUrl = uploadUrl;
    this.handleUpload();
  }

  handleUpload() {
    let fileUpload = new FormData();
    fileUpload.append(this.fileName, this.fileData.file);
    this.callBack(this.fileData.id, 0, "started");
    axios({
      method: this.method,
      url: this.uploadUrl,
      data: fileUpload,
      headers: {
        authorization: `Bearer ${this.token}`
      },
      onUploadProgress: uploadEvt => {
        let percentCompleted = Math.round(
          (uploadEvt.loaded * 100) / uploadEvt.total
        );
        this.callBack(this.fileData.id, percentCompleted);
      }
    }).then(
      res => {
        this.callBack(
          this.fileData.id,
          { src: res.data.results.file, id: res.data.results.id },
          "completed"
        );
      },
      _ => {
        this.callBack(this.fileData.id, 0, "error");
      }
    );
  }
}

export default FileUploadNew;
