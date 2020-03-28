import React, { useState } from "react";
import "./NewProduct.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const NewProduct = ({ setDisplay }) => {
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  // const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productAlcohol, setProductAlcohol] = useState(null);

  const handleChangeName = event => {
    setProductName(event.target.value);
    console.log(event.target.value);
  };

  const handleChangePrice = event => {
    setProductPrice(event.target.value);
    console.log(event.target.value);
  };

  // const handleChangeImage = event => {
  //   setProductImage(event.target.value);
  //   console.log(event.target.value);
  // };

  const handleChangeDescription = event => {
    setProductDescription(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeAlcohol = event => {
    setProductAlcohol(event.target.value);
    console.log(event.target.value);
  };

  const addNewProduct = () => {
    let url = "http://localhost:8000/api/products";
    Axios({
      method: "post",
      url: url,
      data: {
        name: productName,
        price: productPrice,
        // image: productImage,
        description: productDescription,
        alcohol: productAlcohol,
        quantity: 1
      }
    })
      .then(response => {
        console.log(response);
        alert("The product has been added");
        document.location.reload();
      })
      .catch(error => {
        console.log(error);
        alert("Something has failed during creation of the product");
      });
  };

  return (
    <div className="fakeShopFormContainer">
      <h1 className="addAProductTitle">Add a product to the shop</h1>
      {/*       Close button        */}
      <div
        className="closeWindowEditContainer"
        onClick={() => {
          setDisplay(false);
          document.body.style.overflow = "auto";
        }}
      >
        <p className="closeWindowTextEdit">Close</p>
        <FontAwesomeIcon
          icon={faWindowClose}
          className="closeWindowEditProduct fa-2x"
        />
      </div>

      <form className="formFakeShop">
        <label className="labelNewProduct" htmlFor="addProductFakeShopName">
          Name of the product :
          <input
            onChange={handleChangeName}
            required
            pattern="[A-Z][A-Za-z' -]+"
            className="inputShopForm"
            placeholder="Not heineken"
            type="text"
            id="addProductFakeShopName"
          />
        </label>
        <label className="labelNewProduct" htmlFor="addProductFakeShopImage">
          Description
          <input
            onChange={handleChangeDescription}
            required
            size="90"
            className="inputShopForm"
            placeholder="Very smooth beer"
            type="text"
            id="addProductFakeShopPrice"
          />
        </label>
        <label className="labelNewProduct" htmlFor="addProductFakeShopPrice">
          Price :
          <input
            onChange={handleChangePrice}
            required
            className="inputShopForm"
            placeholder="3.10"
            id="addProductFakeShopPrice"
          />
        </label>
        <label className="labelNewProduct" htmlFor="addProductFakeShopImage">
          Alcohol
          <input
            onChange={handleChangeAlcohol}
            required
            size="30"
            className="inputShopForm"
            placeholder="5.3"
            type="text"
            id="addProductFakeShopPrice"
          />
          <p onClick={addNewProduct} className="addNewProductButton">
            Add
          </p>
        </label>
      </form>
    </div>
  );
};

export default NewProduct;
