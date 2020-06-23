import React, { useState } from "react";
import "./NewProduct.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const NewProduct = ({ setDisplay }) => {
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productStock, setProductStock] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productAlcohol, setProductAlcohol] = useState(null);

  const addNewProduct = () => {
    let url = "http://localhost:8000/api/products";
    if (productName && productPrice && productDescription && productAlcohol) {
      const data = {
        name: productName,
        price: productPrice,
        description: productDescription,
        alcohol: productAlcohol,
        quantity: productStock,
      };
      console.log(data);
      Axios.post(url, data)
        .then((response) => {
          console.log(response);
          alert("The product has been added");
          setDisplay(false);
          document.body.style.overflow = "auto";
          document.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Something has failed during creation of the product");
        });
    } else {
      alert("You need to fill all the inputs");
    }
  };

  return (
    <div className="fakeShopFormContainer">
      <h1 className="addAProductTitle">Add a product to the shop</h1>
      {/*       Close button        */}
      <div
        className="closeWindowNewProduct"
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

      <div className="formFakeShop">
        <label className="labelNewProduct" htmlFor="addProductFakeShopName">
          Name of the product :
          <input
            onChange={(event) => setProductName(event.target.value)}
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
          <textarea
            onChange={(event) => setProductDescription(event.target.value)}
            required
            className="inputShopForm descriptionTextArea"
            placeholder="Very smooth beer"
            id="addProductFakeShopPrice"
          />
        </label>
        <label className="labelNewProduct" htmlFor="addProductFakeShopPrice">
          Price :
          <input
            onChange={(event) => setProductPrice(event.target.value)}
            required
            className="inputShopForm"
            placeholder="3.10"
            id="addProductFakeShopPrice"
          />
        </label>
        <label className="labelNewProduct" htmlFor="addProductFakeShopImage">
          Alcohol
          <input
            onChange={(event) => setProductAlcohol(event.target.value)}
            required
            size="30"
            className="inputShopForm"
            placeholder="5.3"
            type="text"
            id="addProductFakeShopPrice"
          />
        </label>
        <label className="labelNewProduct" htmlFor="addProductFakeShopImage">
          Stock
          <input
            onChange={(event) => setProductStock(event.target.value)}
            required
            className="inputShopForm"
            placeholder="50"
            type="number"
            id="addProductFakeShopPrice"
          />
        </label>
        <button onClick={addNewProduct} className="addNewProductButton">
          Add the product
        </button>
      </div>
    </div>
  );
};

export default NewProduct;
