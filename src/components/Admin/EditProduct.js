import React from "react";
import "./EditProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";

const EditProduct = ({ product, setDisplayEdit }) => {
  console.log(product);
  return (
    <div className="editProductContainer">
      {/*       Close button        */}
      <div
        className="closeWindowEditContainer"
        onClick={() => setDisplayEdit(false)}
      >
        <p className="closeWindowTextEdit">Close</p>
        <FontAwesomeIcon
          icon={faWindowClose}
          className="closeWindowEditProduct fa-2x"
        />
      </div>

      {/*     Save button       */}

      <div className="saveContainerEdit">
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
