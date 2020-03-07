import React, { useEffect, useState } from "react";
import "./Admin.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import NewProduct from "./NewProduct";
import useWindowDimensions from "../services/useWindowDimensions";
import { Link } from "react-router-dom";

const Admin = () => {
  const { width } = useWindowDimensions();
  const [products, setProducts] = useState(null);
  const [messages, setMessages] = useState(null);
  const [displayChoice, setDisplayChoice] = useState("products");

  useEffect(() => {
    getProducts();
    getMessages();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:8000/api/products")
      .then(result => result.data)
      .then(data => {
        let stockProducts = data;
        setProducts(stockProducts);
      });
  };

  const modifyProduct = product => {
    let url = `http://localhost:8000/api/products${product.id}`;
    Axios({
      method: "put",
      url: url,
      data: product
    })
      .then(response => console.log(response))
      .catch(error => {
        console.log(error);
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
          console.log(res);
        })
        .then(response => {
          console.log(response);
        });
      document.location.reload();
    }
  };

  const deleteMessage = messageId => {
    if (window.confirm("Do you really wanna delete this message ?")) {
      Axios.delete(`http://localhost:8000/api/messages/:${messageId}`)
        .then(res => {
          if (res.status === 200) {
            alert(
              "Message has been deleted, please refresh the page to see the changes"
            );
          } else {
            alert("Error");
          }
          console.log(res);
        })
        .then(response => {
          console.log(response);
        });
      document.location.reload();
    }
  };

  const getMessages = () => {
    Axios.get("http://localhost:8000/api/messages")
      .then(result => result.data)
      .then(data => {
        let stockMessages = data;
        setMessages(stockMessages);
      });
  };

  return (
    <div className="adminMainContainer">
      <h1 className="titleAdminPage">Admin panel</h1>
      <div className="adminNavBar">
        <h2
          onClick={() => setDisplayChoice("products")}
          className={`itemNavBarAdmin ${
            displayChoice === "products" ? "activeItemAdmin" : null
          }`}
        >
          Products
        </h2>
        <h2
          onClick={() => setDisplayChoice("messages")}
          className={`itemNavBarAdmin ${
            displayChoice === "messages" ? "activeItemAdmin" : null
          }`}
        >
          Messages
        </h2>
      </div>
      <Link className="backtoHomeAdminContainer" to="/">
        <img
          src={require("../images/logoBeer.png")}
          className="logoBackToHome"
          alt=""
        />
        Back to the site
      </Link>

      <div className="productsAdmin">
        {/*     I am displaying products by default and on click on messages i'm changing the content     */}
        {products && messages ? (
          displayChoice === "products" ? (
            <div>
              <NewProduct />
              {displayChoice === "products" ? (
                <h1 className="manageAdmin">Manage your products</h1>
              ) : (
                <h1 className="manageAdmin">New messages</h1>
              )}
              <div className="productsContainerAdmin">
                {products.map(product => {
                  return (
                    <div className="productCardAdmin">
                      <h3 className="itemMessageCardAdmin">
                        Name:{" "}
                        <span className="contentMessageAdmin">
                          {product.name}
                        </span>
                      </h3>
                      <p className="itemMessageCardAdmin">
                        Price:{" "}
                        <span className="contentMessageAdmin">
                          {product.price} €
                        </span>
                      </p>
                      <p className="itemMessageCardAdmin">Description:</p>
                      <p>{product.description}</p>
                      <img
                        className="imageProductAdmin"
                        src={require(`../images/beers_products/${product.image}`)}
                        alt="product"
                      />
                      <div className="buttonsAdminContainer">
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
                        <div
                          onClick={() => deleteProduct(product.id)}
                          className="editProductAdmin"
                        >
                          <p>Edit</p>
                          <FontAwesomeIcon
                            icon={faEdit}
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
            <div className="messagesMainContainerAdmin">
              {displayChoice === "products" ? (
                <h1 className="manageAdmin">Manage your products</h1>
              ) : (
                <h1 className="manageAdmin">New messages</h1>
              )}
              <div className="messagesContainerAdmin">
                {messages.map(message => {
                  return (
                    <div className="messageCardAdmin">
                      <div
                        onClick={() => deleteMessage(message.id)}
                        className="deleteMessageAdmin"
                      >
                        <FontAwesomeIcon
                          icon={faWindowClose}
                          className="closeIconAdmin fa-2x"
                        />
                        <p>Delete this message</p>
                      </div>
                      <h2>
                        Title:{" "}
                        <span className="contentMessageAdmin">
                          {message.title}
                        </span>
                      </h2>
                      <p className="itemMessageCardAdmin">
                        Mail:{" "}
                        <span className="contentMessageAdmin">
                          {message.mail}
                        </span>
                      </p>
                      <p className="itemMessageCardAdmin">
                        Name:{" "}
                        <span className="contentMessageAdmin">
                          {message.name}
                        </span>
                      </p>
                      <p className="itemMessageCardAdmin">
                        Firstname :{" "}
                        <span className="contentMessageAdmin">
                          {message.firstname}
                        </span>
                      </p>
                      <p className="itemMessageCardAdmin">Message :</p>
                      <p className="contentMessageAdmin">{message.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
