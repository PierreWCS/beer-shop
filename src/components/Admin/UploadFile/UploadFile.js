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
      <h3>Upload images</h3>
      <input
        accept=".jpeg,.jpg,.png"
        type="file"
        name="file"
        onChange={handleChange}
      />

      {filePreview ? (
        <div className="previewContainer">
          <img className="imagePreview" src={filePreview} alt="Preview" />
        </div>
      ) : null}
      <button className="sendButton" onClick={sendFile}>
        Send
      </button>
    </div>
  );
};

export default UploadFile;
