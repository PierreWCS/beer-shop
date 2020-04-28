import React, { useState } from "react";
import "./UploadFile.css";

const UploadFile = ({ setProductImage }) => {
  const [filePreview, setFilePreview] = useState(null);

  let handleChange;
  handleChange = event => {
    const reader = new FileReader();
    // Wait for the file to be loaded
    reader.addEventListener("load", function() {
      console.log(this.result);
      setProductImage(reader.result);
      setFilePreview(reader.result);
    });
    // Then display the preview
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className="uploadImageContainer">
      <h3>Product image</h3>
      <input
        accept=".jpeg,.jpg,.png"
        type="file"
        name="file"
        onChange={handleChange}
      />
      <div className="previewContainer">
        {filePreview ? (
          <img className="imagePreview" src={filePreview} alt="Preview" />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
