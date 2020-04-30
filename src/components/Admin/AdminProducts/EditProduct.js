import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const EditProduct = ({ product, setDisplayEdit }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productAlcohol, setProductAlcohol] = useState(product.alcohol);
  const [productStock, setProductStock] = useState(product.quantity);
  const [productImage, setProductImage] = useState(product.image);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [displayImages, setDisplayImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getUploadedImages();
  }, []);

  const modifyProduct = product => {
    let url = `http://localhost:8000/api/products/${product.id}`;
    axios({
      method: "patch",
      url: url,
      data: {
        name: productName,
        price: productPrice,
        image: productImage,
        description: productDescription,
        alcohol: productAlcohol,
        quantity: productStock
      }
    })
      .then(response => {
        console.log(response);
        alert("Product has been updated");
        document.location.reload();
      })
      .catch(error => {
        alert("Error");
        console.log(error);
      });
  };

  const getUploadedImages = () => {
    axios({
      method: "get",
      url: "http://localhost:8000/uploads"
    }).then(res => {
      console.log(res.data);
      setUploadedFiles(res.data);
    });
  };

  return (
    <div className="editProductContainer">
      {/*       Close button        */}
      <div
        className="closeWindowEditContainer"
        onClick={() => {
          setDisplayEdit(false);
          document.body.style.overflow = "auto";
        }}
      >
        <p className="closeWindowTextEdit">Close</p>
        <FontAwesomeIcon
          icon={faWindowClose}
          className="closeWindowEditProduct fa-2x"
        />
      </div>

      {/*     Save button       */}

      <div onClick={() => modifyProduct(product)} className="saveContainerEdit">
        <p className="saveTextEdit">Save changes</p>
        <FontAwesomeIcon icon={faSave} className="saveProductEdit fa-2x" />
      </div>

      {/*     Edit form     */}

      <div className="formContainerEditProduct">
        <div className="imgContainerEdit">
          <h1>Edit: {product.name}</h1>
          <img
            className="productImageEdit"
            src={`/uploads/images/${product.image}`}
            alt="product"
          />

          {/*Change the image of the product*/}
          <button className="changeTheImageButton" onClick={() => {
            setDisplayImages(true);
          }}>
            Change the image
          </button>
          {displayImages ? (
            <div className="productEditChooseImage">
              <h3 className="selectTheImageTitle">Select the image for the product</h3>
              <div className="uploadedImagesContainerEditProduct">
                {uploadedFiles.map(file => {
                  return (
                    <div
                      onClick={() => {
                        setProductImage(file);
                        product.image = file;
                        setDisplayImages(false);
                        document.body.style.overflow = "auto";
                      }}
                      className="uploadedImagesCardEditProduct">
                      <img
                        className="uploadedImageEditProduct"
                        src={`/uploads/images/${file}`}
                        alt=""
                      />
                    </div>
                  );
                })}
                <button className="disableImageChoiceEditProduct" onClick={() => {
                  setDisplayImages(false);
                }}>Cancel</button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="nameAndDescriptionEdit">
          {/*     Name      */}
          <label htmlFor="productNameEdit">
            <p className="productTitleEditProduct">
              Name: <span className="valueEditProduct">{product.name}</span>
            </p>
            <input
              onChange={event => setProductName(event.target.value)}
              className="inputEditProduct"
              type="text"
              id="productNameEdit"
            />
          </label>

          {/*     Description       */}

          <label htmlFor="productNameEdit">
            <p className="productTitleEditProduct">
              Description:{" "}
              <span className="valueEditProduct">{product.description}</span>
            </p>
            <textarea
              onChange={event => setProductDescription(event.target.value)}
              placeholder="product description ..."
              className="inputEditProductDescription"
              id="productNameEdit"
            />
          </label>
        </div>

        <div className="priceAndAlcohol">
          {/*     Price     */}

          <label htmlFor="productNameEdit">
            <p className="productTitleEditProduct">
              Price: <span className="valueEditProduct">{product.price} €</span>
            </p>
            <input
              onChange={event => setProductPrice(event.target.value)}
              placeholder="2.50..."
              className="inputEditProduct"
              type="text"
              id="productNameEdit"
            />
          </label>

          {/*     Alcohol       */}

          <label htmlFor="productNameEdit">
            <p className="productTitleEditProduct">
              Alcohol:{" "}
              <span className="valueEditProduct">{product.alcohol}°</span>
            </p>
            <input
              onChange={event => setProductAlcohol(event.target.value)}
              className="inputEditProduct"
              placeholder="5.6"
              type="text"
              id="productNameEdit"
            />
          </label>

          {/*       Stock       */}
          <label htmlFor="productNameEdit">
            <p className="productTitleEditProduct">
              Stock:{" "}
              <span className="valueEditProduct">{product.quantity}</span>
            </p>
            <input
              placeholder="Modify the stock"
              onChange={event => setProductStock(event.target.value)}
              className="inputEditProduct"
              type="number"
              id="productNameEdit"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
