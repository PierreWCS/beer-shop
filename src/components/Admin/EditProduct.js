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
            <img
              className="productImageEdit"
              src={require(`../images/beers_products/${product.image}`)}
              alt="product"
            />
          </div>
          <div>
            {/*     Name      */}
            <label htmlFor="productNameEdit">
              <p className="productTitleEditProduct">
                Product name:{" "}
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
                Product description:{" "}
                <span className="valueEditProduct">{product.description}</span>
              </p>
              <textarea
                placeholder="product description ..."
                className="inputEditProductDescription"
                id="productNameEdit"
              />
            </label>
          </div>


          <div>
            {/*     Price     */}

            <label htmlFor="productNameEdit">
              <p className="productTitleEditProduct">
                Product price:{" "}
                <span className="valueEditProduct">{product.price} €</span>
              </p>
              <input
                className="inputEditProduct"
                type="text"
                id="productNameEdit"
              />
            </label>

            {/*     Alcohol       */}

            <label htmlFor="productNameEdit">
              <p className="productTitleEditProduct">
                Product alcohol:{" "}
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
