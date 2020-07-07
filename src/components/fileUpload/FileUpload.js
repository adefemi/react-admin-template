import React from "react";
import axios from "axios";
import propTypes from "prop-types";

import "./FileUpload.scss";
import emptyFile from "./assets/file-blank.png";
import brokenFile from "./assets/file-broken.png";
import { addClass, hasClass } from "../../utils/helper";
import { Icon } from "../icons";
import { isDescendant } from "../../utils/helper";

let proptypes = {
  files: propTypes.arrayOf(propTypes.object),
  validFileTypes: propTypes.array,
  validImageTypesSrc: propTypes.array,
  uploadUrl: propTypes.string.isRequired,
  deleteUrl: propTypes.string,
  previewFunc: propTypes.func,
  fileUploadName: propTypes.string,
  uploadMethod: propTypes.string,
  otherUploadData: propTypes.arrayOf(propTypes.object),
  className: propTypes.string,
  style: propTypes.object,
  single: propTypes.bool,
  onUploadComplete: propTypes.func,
  multiple: propTypes.bool
};

export class FileUpload extends React.Component {
  fileRef = {};
  id = 0;
  state = {
    fileArray: []
  };

  validImageTypes = this.props.validFileTypes;
  validImageTypesSrc = this.props.validImageTypesSrc;
  url = this.props.uploadUrl;
  removeUrl = this.props.deleteUrl;

  controlLoader = (el, file, id) => {
    let method = this.props.uploadMethod;

    let filename = this.props.fileUploadName;
    let otherInfoArray = this.props.otherUploadData;

    let fileUpload = new FormData();
    fileUpload.append(filename, file);

    if (otherInfoArray && otherInfoArray.length > 0) {
      for (let i = 0; i < otherInfoArray.length; i++) {
        fileUpload.append(
          otherInfoArray[parseInt(i, 10)].name,
          otherInfoArray[parseInt(i, 10)].value
        );
      }
    }

    axios({
      method,
      url: this.url,
      data: fileUpload,
      onUploadProgress: uploadEvt => {
        let percentCompleted = Math.round(
          (uploadEvt.loaded * 100) / uploadEvt.total
        );
        let progress = el.querySelector(".progress-circle");
        progress.dataset.progress = 0;
        progress.dataset.progress = percentCompleted;
      }
    }).then(
      res => {
        el.id = res.data.id;
        this.displayImageSrc(res.data[filename.toString()], res.data.id);
        setTimeout(() => {
          addClass(el.querySelector(".loading"), "close");
        }, 500);
        if (this.props.onUploadComplete) {
          this.props.onUploadComplete(res.data);
        }
      },
      _ => {
        this.displayImageSrc("", id, true);
        if (!hasClass(el.querySelector(".loading"), "close")) {
          setTimeout(() => {
            addClass(el.querySelector(".loading"), "close");
          }, 500);
        }
      }
    );
  };

  deleteFile = id => {
    console.log(this.props);
    if (!this.props.deleteUrl) {
      return;
    }
    axios({
      method: "delete",
      url: this.removeUrl + id
    })
      .then(res => this.props.onDelete(id))
      .catch(err => {});
  };

  displayImage = fileData => {
    let files = fileData;

    let controlLoader = this.controlLoader;

    fileData.map(item => {
      if (files[0]) {
        if (!this.validImageTypes.includes(item.file["type"])) {
          setTimeout(() => {
            let el = document.getElementById(item.contentID);
            controlLoader(el, item.file, item.contentID);
            let imgNode = el.getElementsByTagName("img")[0];
            imgNode.src = emptyFile;
            imgNode.alt = item.file["name"];
            return null;
          }, 200);
          return null;
        }
      }

      let reader = new FileReader();

      reader.onload = function(frEvent) {
        let el = document.getElementById(item.contentID);

        controlLoader(el, item.file, item.contentID);
        let imgNode = el.getElementsByTagName("img")[0];
        imgNode.src = frEvent.target.result;
        imgNode.alt = item.file["name"];
        return true;
      };
      reader.readAsDataURL(item.file);

      return null;
    });
  };

  displayImageSrc = (fileSrc, id, status = false) => {
    if (status) {
      setTimeout(() => {
        let el = document.getElementById(id);
        if (!hasClass(el, "error")) {
          addClass(el, "error");
        }
        let imgNode = el.getElementsByTagName("img")[0];
        imgNode.src = brokenFile;
        imgNode.alt = "File Corrupted";
        return null;
      }, 200);
      return;
    }

    let srcPath = fileSrc.split("/");
    let filePath = srcPath[srcPath.length - 1].split(".");
    let extension = filePath[filePath.length - 1];

    if (!this.validImageTypesSrc.includes(extension)) {
      setTimeout(() => {
        let el = document.getElementById(id);
        let imgNode = el.getElementsByTagName("img")[0];
        imgNode.src = emptyFile;
        imgNode.alt = srcPath[srcPath.length - 1];
        return;
      }, 200);
      return;
    }

    setTimeout(() => {
      let el = document.getElementById(id);
      if (el) {
        let imgNode = el.getElementsByTagName("img")[0];
        imgNode.src = fileSrc;
        imgNode.alt = srcPath[srcPath.length - 1];
      }
      return;
    }, 200);
  };

  removeFile = e => {
    let parents = document.getElementsByClassName("file-upload-items");
    let child = e.target;

    let activeParent = parents[0];

    for (let i = 0; i < parents.length; i++) {
      if (isDescendant(parents[parseInt(i, 10)], child)) {
        activeParent = parents[parseInt(i, 10)];
        break;
      }
    }

    let el = document.getElementById(activeParent.id);
    let parentEl = document.getElementById(this.id);

    addClass(el, "close");
    if (!hasClass(el, "error")) {
      this.deleteFile(activeParent.id);
    }
    setTimeout(() => parentEl.removeChild(el), 400);
  };

  previewFile = e => {
    let parents = document.getElementsByClassName("file-upload-items");
    let child = e.target;

    let activeParent = parents[0];

    for (let i = 0; i < parents.length; i++) {
      if (isDescendant(parents[parseInt(i, 10)], child)) {
        activeParent = parents[parseInt(i, 10)];
        break;
      }
    }

    let el = document.getElementById(activeParent.id);

    let imgFile = el.getElementsByTagName("img")[0];
    this.props.previewFunc(imgFile.src);
  };

  onChangeFile = e => {
    let files = e.target.files;
    const { fileArray } = this.state;
    const filesData = [];

    for (let i = 0; i < files.length; i++) {
      let contentID = 0;

      let content = (
        <div key={contentID} id={contentID} className="file-upload-items">
          <div className="loading">
            <div className="progress-circle" data-progress="0" />
            <p className="progress-info" variant="p" data-info="Uploading..." />
          </div>
          <div className="file-upload-controls">
            {this.props.previewFunc && (
              <button
                className="preview-button"
                type="button"
                onClick={this.previewFile}
              >
                <Icon type="metrize" name="eye" size={30} />
              </button>
            )}

            {!this.props.single && (
              <button type="button" onClick={this.removeFile}>
                <Icon type="metrize" name="cross" size={30} />
              </button>
            )}
          </div>
          <img src="" alt="" />
        </div>
      );
      fileArray.push(content);
      filesData.push({
        file: files[i],
        contentID
      });
    }

    this.setState({ fileArray }, this.displayImage(filesData));
  };

  loadExistingFiles = fileArray => {
    fileArray.map(file => {
      let content = (
        <div key={file.id} id={file.id} className="file-upload-items">
          <div className="file-upload-controls">
            {this.props.previewFunc && (
              <button
                className="preview-button"
                type="button"
                onClick={this.previewFile}
              >
                <Icon type="metrize" name="eye" size={30} />
              </button>
            )}
            {!this.props.single && (
              <button type="button" onClick={this.removeFile}>
                <Icon type="metrize" name="cross" size={30} />
              </button>
            )}
          </div>
          <img src="" alt="" />
        </div>
      );

      const { fileArray } = this.state;
      fileArray.push(content);
      this.setState({ fileArray }, this.displayImageSrc(file.image, file.id));
      return null;
    });
  };

  componentDidMount() {
    if (this.props.files && this.props.files.length > 0) {
      this.loadExistingFiles(this.props.files);
    }
  }

  render() {
    const { fileArray } = this.state;
    return (
      <div
        className={`file-upload-main ${this.props.className}`}
        id={this.id}
        style={this.props.style}
      >
        {!this.props.dragger && fileArray.map(file => file)}

        {this.props.single && fileArray.length > 0 ? null : (
          <button
            className="file-upload-button"
            type="button"
            onClick={() => this.fileRef.click()}
            onDrop={e => {
              e.preventDefault();
              this.onChangeFile({
                target: {
                  files: e.dataTransfer.files
                }
              });
            }}
            onDragOver={e => e.preventDefault()}
          >
            {!this.props.dragger && (
              <div>
                <Icon name={"share"} type={"feather"} size={30} />
              </div>
            )}
          </button>
        )}

        <input
          onChange={this.onChangeFile}
          ref={ref => (this.fileRef = ref)}
          type="file"
          multiple={this.props.multiple}
          style={{ display: "none" }}
        />

        <div />
      </div>
    );
  }
}

FileUpload.propTypes = proptypes;

FileUpload.defaultProps = {
  validFileTypes: ["image/gif", "image/jpeg", "image/png"],
  validImageTypesSrc: ["gif", "jpeg", "png", "jpg"],
  fileUploadName: "image",
  uploadMethod: "post",
  single: false,
  multiple: true
};
