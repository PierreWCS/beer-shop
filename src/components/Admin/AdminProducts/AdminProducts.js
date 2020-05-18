import React, {useEffect, useState} from "react";
import NewProduct from "./NewProduct";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import EditProduct from "./EditProduct";
import "./AdminProducts.css";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";

const AdminProducts = () => {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [displayNewProduct, setDisplayNewProduct] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:8000/api/products")
      .then(result => result.data)
      .then(data => {
        setProducts([...(data)]);
      });
  };

  const deleteProduct = productId => {
    if (window.confirm("Do you really wanna delete this product ?")) {
      Axios.delete(`http://localhost:8000/api/products/:${productId}`)
        .then(res => {
          if (res.status === 200) {
            alert("Product has been deleted");
          } else {
            alert("Error");
          }
        });
      document.location.reload();
    }
  };

  return (
    <div className="productsAdmin">
      <NavBarAdmin />
      {products ? (
        <div className="productsAdminContainer">
          <h1 className="manageAdminProducts">Manage your products</h1>
          <button
            className="addNewProductButtonAdmin"
            onClick={() => {
              setDisplayNewProduct(true);
              document.body.style.overflow = "hidden";
            }}
          >
            + Add new product
          </button>
          <div className="productsContainerAdmin">
            {products.map((product, key) => {
              return (
                <div className="productCardAdmin" key={key}>
                  <h3 className="itemMessageCardAdmin">
                    Name:{" "}
                    <span className="contentMessageAdmin">{product.name}</span>
                  </h3>
                  <p className="itemMessageCardAdmin">
                    Price:{" "}
                    <span className="contentMessageAdmin">
                      {product.price} €
                    </span>
                  </p>
                  <p className="itemMessageCardAdmin">
                    Alcohol:{" "}
                    <span className="contentMessageAdmin">
                      {product.alcohol}°
                    </span>
                  </p>
                  <p className="itemMessageCardAdmin">
                    Stock:{" "}
                    <span className="contentMessageAdmin">
                      {product.quantity}
                    </span>
                  </p>
                  <p className="itemMessageCardAdmin">Description:</p>
                  <p className="descriptionProductAdmin">
                    {product.description}
                  </p>
                  {product.image ? (
                    <img
                      className="imageProductAdmin"
                      src={`/uploads/images/${product.image}`}
                      alt="product"
                    />
                  ) : (
                    <p>No image</p>
                  )}
                  <div className="buttonsAdminContainer">
                    <div
                      onClick={() => {
                        setSelectedProduct(products[key]);
                        setDisplayEdit(true);
                        document.body.style.overflow = "hidden";
                      }}
                      className="editProductAdmin"
                    >
                      <p>Edit</p>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="closeIconAdmin"
                      />
                    </div>
                    <div
                      onClick={() => deleteProduct(product.id)}
                      className="deleteProductAdmin"
                    >
                      <p>Delete</p>
                      <FontAwesomeIcon
                        icon={faWindowClose}
                        className="closeIconAdmin"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>Hello</h1>
      )}
      {displayEdit ? (
        <EditProduct
          setDisplayEdit={setDisplayEdit}
          product={selectedProduct}
        />
      ) : null}
      {displayNewProduct ? (
        <NewProduct setDisplay={setDisplayNewProduct} />
      ) : null}
    </div>
  );
};

export default AdminProducts;
