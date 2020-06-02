import React, { useEffect, useState } from "react";
import "./Medias.css";
import axios from "axios";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";
import UploadFile from "../UploadFile/UploadFile";
import ManageMedia from "./ManageMedia/ManageMedia";

const Medias = () => {
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [imageFullSize, setImageFullSize] = useState(null);
  const [displayImageManagement, setDisplayImageManagement] = useState(false);
  const uploadsUrl = "http://localhost:8000/uploads";

  useEffect(() => {
    getUploadedImages();
  }, []);

  const deleteImage = (image, index) => {
    if (window.confirm("Do you really want do delete this image ?")) {
      axios({
        method: "delete",
        url: `${uploadsUrl}/${image}`,
      })
        .then(() => {
          alert("The image has been deleted");
          let stockFiles = uploadedFiles;
          stockFiles.splice(index, 1);
          setUploadedFiles([...stockFiles]);
          setDisplayImageManagement(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const getUploadedImages = () => {
    axios({
      method: "get",
      url: "http://localhost:8000/uploads",
    }).then((res) => {
      setUploadedFiles(res.data);
    });
  };
  return (
    <div className="productsAdmin adminMediasContainer">
      <NavBarAdmin />
      <UploadFile
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
      <h2 className="titleUploadedFilesMedias">Uploaded files</h2>
      {uploadedFiles ? (
        <div className="mediasUploadedContainer">
          {uploadedFiles.map((file, key) => {
            return (
              <div
                className="imageContainerMedias"
                key={key}
                onClick={() => {
                  setImageFullSize({
                    image: file,
                    index: key,
                  });
                  setDisplayImageManagement(true);
                }}
              >
                <img
                  className="imageUploadMedias"
                  src={`/uploads/images/${file}`}
                  alt={file}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No images uploaded</p>
      )}
      {displayImageManagement ? (
        <ManageMedia
          deleteImage={deleteImage}
          imageFullSize={imageFullSize}
          setDisplayImageManagement={setDisplayImageManagement}
        />
      ) : null}
    </div>
  );
};

export default Medias;
