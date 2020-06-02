import React, { useState } from "react";
import axios from "axios";
import "./UploadFile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const UploadFile = ({ uploadedFiles, setUploadedFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  let handleChange;
  handleChange = (event) => {
    const reader = new FileReader();
    // Wait for the file to be loaded
    reader.addEventListener("load", function () {
      setFilePreview(reader.result);
    });
    // Then display the preview
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[0].type.includes("image/")) {
      setSelectedFile(event.target.files[0]);
    } else alert("wrong file type");
  };

  const sendFile = () => {
    if (selectedFile) {
      const data = new FormData();
      data.append("file", selectedFile);
      const url = "http://localhost:8000/uploads";
      axios({
        method: "post",
        data,
        url,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000" | "*",
        },
      })
        .then(() => {
          alert("Your image has been uploaded");
          setFilePreview(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("You must select an image");
  };

  return (
    <div className="uploadImageContainer">
      <h2>Add a new media</h2>
      {filePreview ? (
        <div className="previewContainer">
          <img className="imagePreview" src={filePreview} alt="Preview" />
          <div className="buttonsContainerMedia">
            <button className="sendButton" onClick={sendFile}>
              Send this image
            </button>
            <button
              className="cancelUploadButtonMedia"
              onClick={() => {
                setFilePreview(false);
                setSelectedFile(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="inputMediaContainer">
          <input
            className="browseMediaUploadInput"
            accept=".jpeg,.jpg,.png"
            type="file"
            name="file"
            id="file"
            onChange={handleChange}
          />
          <label className="labelInputMediaUpload" htmlFor="file">
            <FontAwesomeIcon icon={faUpload} className="fa-2x" />
            <p>Choose a file</p>
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
