import React from "react";
import "./fileDragger.scss";
import fileDragImg from "../../assets/images/file-drag.svg";
import FileUploadNew from "../fileUploadNew/fileUploadNew";
import { FILE_UPLOAD_URL, tempToken } from "../../utils/urls";
import proptype from "prop-types";
import { getToken } from "../../utils/helper";

function FileDragger(props) {
  return (
    <div className="file-dragger">
      <div className="content-dragger">
        <img src={fileDragImg} alt="" />
        {props.children}
      </div>
      <FileUploadNew
        className="file-dragger-inner"
        dragger
        onChange={props.onChange}
        multiple={props.multiple}
        validImageTypesSrc={props.validImageTypesSrc}
        fileName={props.fileName}
        method={props.method}
        uploadUrl={props.uploadUrl}
        token={props.token}
        deleteUrl={props.deleteUrl}
        fileIdToRemove={props.fileIdToRemove}
        updateTrigger={props.updateTrigger}
        removeTrigger={props.removeTrigger}
        maxUpload={props.maxUpload}
      />
    </div>
  );
}

FileDragger.defaultProps = {
  multiple: true,
  validImageTypesSrc: ["gif", "jpeg", "png", "jpg"],
  fileName: "file",
  method: "post",
  uploadUrl: FILE_UPLOAD_URL,
  deleteUrl: FILE_UPLOAD_URL,
  token: getToken(),
  onChange: () => null,
  updateTrigger: () => null
};

FileDragger.propType = {
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
  removeTrigger: proptype.bool
};

export default FileDragger;
