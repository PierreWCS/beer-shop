import React from "react";
import "./ManageMedia.css";

const ManageMedia = ({
  deleteImage,
  imageFullSize,
  setDisplayImageManagement,
}) => {
  return (
    <div className="imageFullSizeContainer">
      <div className="imageContainerMediaManagement">
        <img
          className="imageFullSizeManageMedia"
          src={`/uploads/images/${imageFullSize.image}`}
          alt=""
        />
      </div>

      <div className="manageImageOptionsContainer">
        <p>{imageFullSize.image}</p>
        <button
          onClick={() => deleteImage(imageFullSize.image, imageFullSize.index)}
          className="deleteImageMediaFullSize"
        >
          Delete this image
        </button>
      </div>
      <button
        className="closeWindowManageMedia"
        onClick={() => setDisplayImageManagement(false)}
      >
        Close
      </button>
    </div>
  );
};

export default ManageMedia;
