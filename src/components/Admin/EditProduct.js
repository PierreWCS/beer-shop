import React, {useState} from "react";
import "./EditProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const EditProduct = ({ product, setDisplayEdit }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productAlcohol, setProductAlcohol] = useState(product.alcohol);

  const handleChangeName = event => {
    setProductName(event.target.value);
    console.log(event.target.value);
  };

  const handleChangePrice = event => {
    setProductPrice(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeDescription = event => {
    setProductDescription(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeAlcohol = event => {
    setProductAlcohol(event.target.value);
    console.log(event.target.value);
  };

  const modifyProduct = product => {
    let url = `http://localhost:8000/api/products/${product.id}`;
    Axios({
      method: "patch",
      url: url,
      data: {
        name: productName,
        price: productPrice,
        image: product.image,
        description: productDescription,
        alcohol: productAlcohol
      }
    })
      .then(response =>  {
          console.log(response);
          alert('Product has been updated');
          document.location.reload();
        }
      )
      .catch(error => {
        alert('Error');
        console.log(error);
      });
  };

  console.log(product);

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
            <h1>Edit {product.name}</h1>
            <img
              className="productImageEdit"
              src={require(`../images/beers_products/${product.image}`)}
              alt="product"
            />
          </div>
          <div className="nameAndDescriptionEdit">
            {/*     Name      */}
            <label htmlFor="productNameEdit">
              <p className="productTitleEditProduct">
                Name:{" "}
                <span className="valueEditProduct">{product.name}</span>
              </p>
              <input
                onChange={handleChangeName}
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
                onChange={handleChangeDescription}
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
                Price:{" "}
                <span className="valueEditProduct">{product.price} €</span>
              </p>
              <input
                onChange={handleChangePrice}
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
                onChange={handleChangeAlcohol}
                className="inputEditProduct"
                type="text"
                id="productNameEdit"
              />
            </label>
          </div>

      </div>
    </div>
  );
};

export default EditProduct;
