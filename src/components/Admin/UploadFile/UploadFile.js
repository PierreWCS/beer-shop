import React, { useState } from "react";
import axios from "axios";
import "./UploadFile.css";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  let handleChange;
  handleChange = event => {
    const reader = new FileReader();
    // Wait for the file to be loaded
    reader.addEventListener("load", function() {
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
          "Access-Control-Allow-Origin": "http://localhost:3000" | "*"
        }
      })
        .then(() => {
          alert("Your image has been uploaded");
        })
        .catch(err => {
          console.log(err);
        });
    } else alert("You must select an image");
  };

  return (
    <div className="uploadImageContainer">
      <h2>Add a new media</h2>
      <input
        className="browseMediaUploadInput"
        accept=".jpeg,.jpg,.png"
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
      />
      <label className="labelInputMediaUpload" htmlFor="file">
        <svg className="uploadIconMedia">
          <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
        </svg>
        <p>Choose a file</p>
      </label>

      {filePreview ? (
        <div className="previewContainer">
          <img className="imagePreview" src={filePreview} alt="Preview" />
          <button className="sendButton" onClick={sendFile}>
            Send
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UploadFile;
